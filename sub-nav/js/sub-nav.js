Estarossa(function ($, _, window, document) {

    var addAction = Estarossa.addAction;
    var doAction = Estarossa.doAction;
    var TRANSITION_END = Estarossa.TRANSITION_END_EVENT;
    var ACTIVE_CLASS = 'sub-nav__item--active';
    var OPEN_CLASS = 'sub-nav--open';
    var SUBNAV_SELECTOR = '.sub-nav';
    var LIST_SELECTOR = '.sub-nav__list';
    var ITEM_SELECTOR = '.sub-nav__item';
    var LINK_SELECTOR = '.sub-nav__link';
    var $subNavs = $(SUBNAV_SELECTOR);
    var $subNavLinks = $(LINK_SELECTOR);

    if (!$subNavs.length && $subNavLinks.length) {
        return;
    }

    /* Convenience functions */

    var getSubNav = function(el) {
        return $(el).parents(SUBNAV_SELECTOR);
    };

    var isClosedDropdown = function($subNav) {
        return !$subNav.hasClass(OPEN_CLASS);
    };

    var getLinkToggleId = function(link) {
        return link.hasAttribute('href') ? $(link).attr('href').replace(/^#/, '').split('/').pop() : '';
    };

    var toggleSubNav = function(el) {
        var $subNav = getSubNav(el);
        $subNav.toggleClass(OPEN_CLASS, isClosedDropdown($subNav));
    };

    /* Event callbacks */

    var setActiveSubNavLinks = function(activeToggleIds) {
        var $activeLinks = $subNavLinks.filter(function() {
            if ($(this).attr('href')) {
                var lastAnchorPart = getLinkToggleId(this);
                return activeToggleIds.indexOf(lastAnchorPart) > -1;
            }
        });
        if (!$activeLinks.length) {
            return;
        }
        var activeGroups = $activeLinks.map(function() { return $(this).data('group'); }).get();
        var $validSubNavLinks = $subNavLinks.filter(function() {
            return !(activeGroups.length && activeGroups.indexOf($(this).data('group')) === -1);
        });
        $validSubNavLinks.attr({'aria-selected': 'false', 'tabindex': -1});
        $validSubNavLinks.parent().removeClass(ACTIVE_CLASS).removeAttr('aria-level').attr('role', 'presentation');
        $activeLinks.attr({'aria-selected': 'true', 'tabindex': 0});
        $activeLinks.parent().addClass(ACTIVE_CLASS).attr({'role': 'heading', 'aria-level': '2'});

    };

    var setLinkToggleTargetLabels = function(toggleTargets) {
        $subNavLinks.each(function() {
            var toggleId = getLinkToggleId(this);
            var id = toggleId + '-sub-nav';
            if (toggleId) {
                $(this).attr('id', id);
            }
            if (toggleTargets[toggleId]) {
                var $target = toggleTargets[toggleId];
                $target.attr({
                    'role': 'tabpanel',
                    'aria-labelledby': id,
                    //'id': toggleId //removing id until we can update address bar without triggering anchor
                });
                $(this).data('hasToggleTarget', true);
                var group = $(this).data('group') || $target.data('toggleGroup');
                if (group) {
                    $(this).data('group', group)
                    $target.data('toggleGroup', group)
                }
            }
        });
    };

    var maybeFocusAdjacentLink = function(e){
        var code = e.which || e.keyCode;
        var $items = $(this).find(ITEM_SELECTOR);
        var currentIndex = $items.index($(e.target).parents(ITEM_SELECTOR));
        var $nextItem = $items.eq((currentIndex + 1) % $items.length); // Rolls over to first item
        var $prevItem = $items.eq((currentIndex + ($items.length - 1)) % $items.length); // Rolls over to last item
        if(code === 39) { // Right arrow
            $nextItem.find(LINK_SELECTOR).focus();
        }
        if(code === 37) { // Left arrow
            $prevItem.find(LINK_SELECTOR).focus();
        }
    };

    var maybeFollowAnchor = function(e) {
        var link = e.target;
        var hash = link.getAttribute('href');
        if (!(hash && hash.indexOf('#') === 0)) {
            return;
        }
        var $target = $(hash);
        if (!$target.length) {
            return;
        }
        e.preventDefault();
        var $subNav = getSubNav(link);
        if (
            isClosedDropdown($subNav) || // let the closed dropdown open before following anchor
            (link.getAttribute('aria-selected') === 'true' && $subNav.hasClass(OPEN_CLASS)) // let the active link close the dropdown
        ) {
            return;
        }

        var transitionDuration = parseInt($subNav.css('transition-duration')) * 1000;
        setTimeout(function() {
            doAction('focusStateInit', $target);
            doAction('focusStateActivate');
            Estarossa.hashState.set($target.attr('id'));
        }, transitionDuration);

    };

    /* Event handlers */

    $subNavLinks.on('click', function(e) {
        maybeFollowAnchor(e);
        toggleSubNav(this);
    });

    $subNavs.on('keydown', maybeFocusAdjacentLink);

    addAction('toggleInit', setLinkToggleTargetLabels);

    addAction('toggleActive', setActiveSubNavLinks);

    addAction(Estarossa.HASH_STATE_CHANGE, function(state) {
        setActiveSubNavLinks(state.currentList);
    });
});
