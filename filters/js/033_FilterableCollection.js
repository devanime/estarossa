function FilterableCollection(id, $container, data, filters) {
    var self = this;
    self.id = id;
    self.filters = filters;
    self.items = self.getItems($container, data);
    self.$container = $container;
    addAction(PUBLISH_FILTER_GROUP_VALUES + self.id, self.onUpdate, 10, self);
    self.$na = $container.find('.no-results');
    if (!self.$na.length) {
        self.$na = $('<div class="no-results">' +
            applyFilters('filters/no-results', 'Sorry, no results found') +
            '</div>');
        $container.append(self.$na);
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
                $matches = $matches.add(filterableItem.$el);
            } else {
                $nonMatches = $nonMatches.add(filterableItem.$el);
            }
        });
        $matches.removeClass('filters--hide').addClass('filters--show');
        $nonMatches.removeClass('filters--show').addClass('filters--hide');
        self.$na.toggleClass('no-results--show', !$matches.length);
        self.$container.toggleClass('filters--no-results', !$matches.length);
    },
    getItems: function($container, data) {
        var self = this;
        var items = [];
        var types = getFilterTypes(self.filters);
        $.each(data, function(index, config) {
            var $el = $container.find('[data-filter-id="' + config.id + '"]');
            items.push(new FilterableItem($el, config, types));
        });
        return items;
    }
};