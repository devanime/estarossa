Estarossa(function($) {
    $.each(filterableGroupData, function(groupID, definition) {
        definition = expandChildFilters(definition);
        var $filterContainer = $('[data-filter-group="' + groupID + '"]');
        var $filterableElementsContainer = $('[data-filter-control="' + groupID + '"]');
        new FilterGroup(groupID, $filterContainer, definition.filters);
        new FilterableCollection(groupID, $filterableElementsContainer, definition.data, definition.filters);
        new Address(groupID);
    });
});
