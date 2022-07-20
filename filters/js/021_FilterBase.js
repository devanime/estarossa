var filterBase = Estarossa.Filters.filterBase = {
    init: function($el, filterData) {
        var self = this;
        self.$el = $el;
        self.config = {};
        self.group = '';
        self.label = '';
        self.name = '';
        self.type = '';
        self.value = '';
        self.parent = false;
        Estarossa.whitelistAssign(self, filterData);
        var action = UPDATE_FILTER_SELECTION + [self.group, self.name].join('/');
        addAction(action, self.set, 10, self);
        if (self.parent) {
            var parentAction = UPDATE_PARENT_SELECTION + [self.group, self.parent].join('/');
            addAction(parentAction, _.debounce(self.onParent, 50), 10, self);
        }
        addAction(CLEAR_FILTERS + self.group, self.clear, 10, self);
    },
    set: function(value) {
        console.error('Filter must implement "set" method');
    },
    onParent: function(value) {},
    publish: function() {
        var self = this;
        doAction(UPDATE_PARENT_SELECTION + [self.group, self.name].join('/'), self.value);
        doAction(PUBLISH_FILTER_CHANGE + self.group);
    },
    clear: function () {
        this.set('');
    },
};
