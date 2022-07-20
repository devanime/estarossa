function FilterGroup(id, $container, filterGroupData) {
    var self = this;
    self.id = id;
    self.filters = [];
    self.currentVal = {};
    $.each(filterGroupData, function(index, filterData) {
        self.initFilter($container.find('[name="' + filterData.name + '"], [data-filter-name="' + filterData.name + '"]'), filterData);
    });
    self.filters.filter(Boolean);
    addAction(PUBLISH_FILTER_CHANGE + self.id, self.onUpdate, 10, self);
}

FilterGroup.prototype = {
    initFilter: function($el, filterData) {
        var self = this;
        switch (filterData.input) {
            case 'select' :
                self.filters.push(new Select($el, filterData));
                break;
            case 'checkbox' :
                self.filters.push(new Checkbox($el, filterData));
                break;
            case 'radio' :
                self.filters.push(new Radio($el, filterData));
                break;
            case 'text' :
                self.filters.push(new TextInput($el, filterData));
                break;
            default :
                self.filters.push(applyFilters(REGISTER_FILTER + self.id + '/' + filterData.input, false, $el, filterData));
        }
    },
    values: function() {
        var self = this;
        var values = {};
        $.each(self.filters, function(index, filter) {
            values[filter.name] = filter.value;
        });
        return values;
    },
    onUpdate: _.debounce(function() {
        var self = this;
        var values = self.values();
        if (!_.isEqual(values, self.currentVal)) {
            doAction(PUBLISH_FILTER_GROUP_VALUES + self.id, values);
            Estarossa.updateLayout();
            self.currentVal = values;
        }
    }, 250),
};
