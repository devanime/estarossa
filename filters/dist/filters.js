(function($, Estarossa, filterableGroupData, _) {
    var doAction = Estarossa.doAction;
    var addAction = Estarossa.addAction;
    var applyFilters = Estarossa.applyFilters;
    var LAYOUT = Estarossa.LAYOUT;
    var UPDATE_FILTER_SELECTION = "filters/update/";
    var UPDATE_PARENT_SELECTION = "filters/parent/update/";
    var PUBLISH_FILTER_CHANGE = "filters/change/";
    var PUBLISH_FILTER_GROUP_VALUES = "filters/values/";
    var CLEAR_FILTERS = "filters/clear/";
    var REGISTER_FILTER = "filters/register/";
    var MATCH_FUNC = "filters/match/";
    Estarossa.Filters = {};

    function getFilterTypes(filters) {
        var filterTypes = {};
        $.each(filters, function(index, filter) {
            filterTypes[filter.name] = filter.type
        });
        return filterTypes
    }

    function splitKeywordString(keyword, minChars) {
        if ($.isArray(keyword)) {
            keyword = keyword.join(" ")
        }
        var split = keyword.replace(/'/g, '"').match(/(".*?"|[^",\s]+)(?=\s*,|\s*)/g);
        return $.map(split, function(str) {
            str = str.replace(/[\W_]+/g, " ").trim().toLowerCase();
            return str.length >= minChars ? str : undefined
        })
    }

    function normalizeResults(results, filterDefinitions) {
        var normalized = {};
        var types = getFilterTypes(filterDefinitions);
        var keywordDefinition = $.map(filterDefinitions, function(def) {
            return def.type === "keyword" ? def.config : undefined
        }).shift();
        $.each(results, function(key, value) {
            if (value && value.length) {
                if (types[key] === "keyword") {
                    normalized[key] = splitKeywordString(value, keywordDefinition["min_characters"] || 3)
                } else {
                    normalized[key] = $.isArray(value) ? value : [value]
                }
            }
        });
        return normalized
    }

    function normalizeMatches(matches, types) {
        var normalized = {};
        $.each(matches, function(key, value) {
            if (value && value.length) {
                normalized[key] = $.isArray(value) ? value : [value];
                if (types[key] === "keyword") {
                    normalized[key] = normalized[key].join(" ").toLowerCase()
                }
            }
        });
        return normalized
    }

    function expandChildFilters(definition) {
        var modifiedData = [];
        $.each(definition.filters, function(index, data) {
            if (data.input === "split") {
                var parent = $.extend({}, data, {
                    input: "select"
                });
                var child = $.extend({}, data, {
                    input: "checkbox",
                    name: "sub_" + data.name,
                    parent: data.name
                });
                modifiedData.push(parent);
                modifiedData.push(child);
                $.each(definition.data, function(index, data) {
                    data.matches[child.name] = data.matches[parent.name]
                })
            } else {
                modifiedData.push(data)
            }
        });
        definition.filters = modifiedData;
        return definition
    }

    function Address(groupID) {
        var self = this;
        self.id = groupID;
        self.publish();
        addAction(PUBLISH_FILTER_GROUP_VALUES + self.id, self.update, 20, self);
        $.address.externalChange(self.publish.bind(self))
    }
    Address.prototype = {
        update: function(values) {
            var self = this;
            var lastPos = $(window).scrollTop();
            $.each(values, function(id, val) {
                $.address.parameter(self.id + "_" + id, val || null)
            });
            $(window).scrollTop(lastPos)
        },
        publish: _.debounce(function() {
            var self = this;
            $.each($.address.parameterNames() || [], function(index, name) {
                var value = decodeURI($.address.parameter(name).split(","));
                name = name.split("_");
                var group = name.shift();
                if (group === self.id) {
                    var action = UPDATE_FILTER_SELECTION + [group, name.join("_")].join("/");
                    doAction(action, value)
                }
            })
        }, 20)
    };

    function FilterGroup(id, $container, filterGroupData) {
        var self = this;
        self.id = id;
        self.filters = [];
        self.currentVal = {};
        $.each(filterGroupData, function(index, filterData) {
            self.initFilter($container.find('[name="' + filterData.name + '"], [data-filter-name="' + filterData.name + '"]'), filterData)
        });
        self.filters.filter(Boolean);
        addAction(PUBLISH_FILTER_CHANGE + self.id, self.onUpdate, 10, self)
    }
    FilterGroup.prototype = {
        initFilter: function($el, filterData) {
            var self = this;
            switch (filterData.input) {
                case "select":
                    self.filters.push(new Select($el, filterData));
                    break;
                case "checkbox":
                    self.filters.push(new Checkbox($el, filterData));
                    break;
                case "radio":
                    self.filters.push(new Radio($el, filterData));
                    break;
                case "text":
                    self.filters.push(new TextInput($el, filterData));
                    break;
                default:
                    self.filters.push(applyFilters(REGISTER_FILTER + self.id + "/" + filterData.input, false, $el, filterData))
            }
        },
        values: function() {
            var self = this;
            var values = {};
            $.each(self.filters, function(index, filter) {
                values[filter.name] = filter.value
            });
            return values
        },
        onUpdate: _.debounce(function() {
            var self = this;
            var values = self.values();
            if (!_.isEqual(values, self.currentVal)) {
                doAction(PUBLISH_FILTER_GROUP_VALUES + self.id, values);
                Estarossa.updateLayout();
                self.currentVal = values
            }
        }, 250)
    };
    var filterBase = Estarossa.Filters.filterBase = {
        init: function($el, filterData) {
            var self = this;
            self.$el = $el;
            self.config = {};
            self.group = "";
            self.label = "";
            self.name = "";
            self.type = "";
            self.value = "";
            self.parent = false;
            Estarossa.whitelistAssign(self, filterData);
            var action = UPDATE_FILTER_SELECTION + [self.group, self.name].join("/");
            addAction(action, self.set, 10, self);
            if (self.parent) {
                var parentAction = UPDATE_PARENT_SELECTION + [self.group, self.parent].join("/");
                addAction(parentAction, _.debounce(self.onParent, 50), 10, self)
            }
            addAction(CLEAR_FILTERS + self.group, self.clear, 10, self)
        },
        set: function(value) {
            console.error('Filter must implement "set" method')
        },
        onParent: function(value) {},
        publish: function() {
            var self = this;
            doAction(UPDATE_PARENT_SELECTION + [self.group, self.name].join("/"), self.value);
            doAction(PUBLISH_FILTER_CHANGE + self.group)
        },
        clear: function() {
            this.set("")
        }
    };

    function Checkbox($el, filterData) {
        var self = this;
        self.init($el, filterData);
        self.$el.on("change", self.onChange.bind(self))
    }
    $.extend(Checkbox.prototype, filterBase, {
        onChange: function() {
            var self = this;
            self.value = self.$el.filter(":checked").map(function() {
                return this.value
            }).get() || [];
            self.publish()
        },
        set: function(values) {
            var self = this;
            self.$el.each(function() {
                this.checked = values.split(",").indexOf(this.value) >= 0
            });
            self.onChange()
        },
        onParent: function(value) {
            var self = this;
            self.$el.each(function() {
                var $this = $(this);
                var $container = $this.parents("[data-parent]");
                var found = value.indexOf($container.data("parent").toString()) > -1;
                $container.toggleClass("filters--hide", !found);
                if (!found) {
                    $this.prop("checked", false)
                }
            });
            self.onChange()
        }
    });

    function Select($el, filterData) {
        this.init($el, filterData);
        this.$el.change(this.onChange.bind(this))
    }
    $.extend(Select.prototype, filterBase, {
        onChange: function() {
            var self = this;
            self.value = self.$el.val();
            self.publish()
        },
        set: function(value) {
            this.$el.val(value);
            this.onChange()
        }
    });

    function Radio($el, filterData) {
        var self = this;
        self.init($el, filterData);
        self.$el.on("change", self.onChange.bind(self))
    }
    $.extend(Radio.prototype, filterBase, {
        onChange: function() {
            var self = this;
            self.value = self.$el.filter(":checked").val();
            self.publish()
        },
        set: function(value) {
            var self = this;
            self.$el.each(function() {
                this.checked = value === this.value
            });
            self.onChange()
        }
    });

    function TextInput($el, filterData) {
        this.init($el, filterData);
        this.$el.on("input propertychange", this.onChange.bind(this))
    }
    $.extend(TextInput.prototype, filterBase, {
        onChange: function() {
            var self = this;
            var value = self.$el.val();
            self.value = value.length >= self.config["min_characters"] ? value : "";
            self.publish()
        },
        set: function(value) {
            var self = this;
            self.$el.val(value);
            self.onChange()
        }
    });

    function FilterableItem($el, data, types) {
        var self = this;
        self.$el = $el;
        self.types = types;
        self.id = "";
        self.matches = {};
        Estarossa.whitelistAssign(self, data);
        self.matches = normalizeMatches(self.matches, self.types);
        self.matchMethods = {};
        $.each(self.types, function(key, value) {
            var method = applyFilters(MATCH_FUNC + key, false);
            if (method) {
                self.matchMethods[key] = method
            }
        })
    }
    FilterableItem.prototype = {
        matchAll: function(needle, haystack) {
            for (var i = 0; i < needle.length; i++) {
                if (haystack.indexOf(needle[i]) === -1) return false
            }
            return true
        },
        matchAny: function(needle, haystack) {
            for (var i = 0; i < needle.length; i++) {
                if (haystack.indexOf(needle[i]) >= 0) return true
            }
            return false
        },
        isMatch: function(results) {
            var self = this;
            var allMatch = true;
            $.each(results, function(key, value) {
                if (value && value.length) {
                    if (!self.matches.hasOwnProperty(key)) {
                        allMatch = false;
                        return allMatch
                    }
                    var method = self.types[key] === "keyword" ? self.matchAll : self.matchAny;
                    method = self.matchMethods.hasOwnProperty(key) ? self.matchMethods[key] : method;
                    if (!method.call(self, value, self.matches[key])) {
                        allMatch = false;
                        return allMatch
                    }
                }
            });
            return allMatch
        }
    };

    function FilterableCollection(id, $container, data, filters) {
        var self = this;
        self.id = id;
        self.filters = filters;
        self.items = self.getItems($container, data);
        self.$container = $container;
        addAction(PUBLISH_FILTER_GROUP_VALUES + self.id, self.onUpdate, 10, self);
        self.$na = $container.find(".no-results");
        if (!self.$na.length) {
            self.$na = $('<div class="no-results">' + applyFilters("filters/no-results", "Sorry, no results found") + "</div>");
            $container.append(self.$na)
        }
    }
    FilterableCollection.prototype = {
        onUpdate: function(results) {
            var self = this;
            var $matches = $();
            var $nonMatches = $();
            results = normalizeResults(results, self.filters);
            $.each(self.items, function(index, filterableItem) {
                if (filterableItem.isMatch(results)) {
                    $matches = $matches.add(filterableItem.$el)
                } else {
                    $nonMatches = $nonMatches.add(filterableItem.$el)
                }
            });
            $matches.removeClass("filters--hide").addClass("filters--show");
            $nonMatches.removeClass("filters--show").addClass("filters--hide");
            self.$na.toggleClass("no-results--show", !$matches.length);
            self.$container.toggleClass("filters--no-results", !$matches.length)
        },
        getItems: function($container, data) {
            var self = this;
            var items = [];
            var types = getFilterTypes(self.filters);
            $.each(data, function(index, config) {
                var $el = $container.find('[data-filter-id="' + config.id + '"]');
                items.push(new FilterableItem($el, config, types))
            });
            return items
        }
    };
    Estarossa(function($) {
        $.each(filterableGroupData, function(groupID, definition) {
            definition = expandChildFilters(definition);
            var $filterContainer = $('[data-filter-group="' + groupID + '"]');
            var $filterableElementsContainer = $('[data-filter-control="' + groupID + '"]');
            new FilterGroup(groupID, $filterContainer, definition.filters);
            new FilterableCollection(groupID, $filterableElementsContainer, definition.data, definition.filters);
            new Address(groupID)
        })
    })
})(jQuery, Estarossa, window.filterableGroupData || {}, lodash);