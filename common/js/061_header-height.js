(function(addAction, addFilter, applyFilters) {
    var $header = $('header').first();
    var headerHeight = $header.outerHeight();
    addFilter('header-height', function () {
        return $header.outerHeight(true) || 0;
    }, 5);
    addFilter('header-offset', function () {
        if (!window.pageYOffset) {
            headerHeight = $header.outerHeight();
        }
        return headerHeight || 0;
    }, 5);

    addFilter('css-vars/register', function(styles) {
        styles['header-height'] = function() {
            return applyFilters('header-height') + 'px';
        };
        styles['header-offset'] = function() {
            return applyFilters('header-offset') + 'px';
        };
        return styles;
    });

    var scrollTargetFallback = _.debounce(function adjustScroll(e) {
        var $browserTarget = $(':target');
        // Only continue if target exists, and padding-top > 0 or has .anchor class
        if(!($browserTarget.length && (parseInt($browserTarget.css('padding-top'), 10) || $browserTarget.hasClass('anchor')))) {
            return;
        }

        // Ensure current target is the same as the requested target to exclude clicks with "preventDefault"
        var selector;
        try {
            selector = e.currentTarget.getAttribute('href');
        } catch (error) {
            selector = e.hasOwnProperty('current') ? '#' + e.current : '';
        }
        if (selector.charAt(0) !== '#') {
            return;
        }
        var $actionTarget = $(selector);

        if (!$actionTarget.length || !$actionTarget.is($browserTarget)) {
            return;
        }

        $(window).scrollTop($actionTarget.offset().top - applyFilters('header-height'));
    }, 0);
    addAction(Estarossa.HASH_STATE_CHANGE, scrollTargetFallback);
    $(document).on('click', 'a', scrollTargetFallback);

})(Estarossa.addAction, Estarossa.addFilter, Estarossa.applyFilters);
