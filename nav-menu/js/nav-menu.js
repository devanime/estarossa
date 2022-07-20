Estarossa(function($, _, window, document) {
    var $body = $('body');
    var addAction = Estarossa.addAction;
    var doAction = Estarossa.doAction;
    var removeAction = Estarossa.removeAction;
    var addFilter = Estarossa.addFilter;
    var applyFilters = Estarossa.applyFilters;
    var SHOW_NAV_MENU_OVERLAY = 'showNavMenuOverlay';
    var HIDE_NAV_MENU_OVERLAY = 'hideNavMenuOverlay';
    var LOCK_SCROLL = applyFilters('nav-menu/lock-scroll', true);
    if (!$('.nav-menu__toggle-bar').length) {
        return;
    }
    var escHandler = function(e) {
        if (e instanceof jQuery) {
            setTimeout(function() {
                doAction(HIDE_NAV_MENU_OVERLAY, $('.nav-menu--opened'));
            }, 1000);
        } else {
            doAction(HIDE_NAV_MENU_OVERLAY, $('.nav-menu--opened'));
        }
    };
    $('.nav-menu__overlay').find('a').on('click', function() {
        var $this = $(this);
        var id = $this.attr('href').split('/').pop();
        if (id && $(id).length) {
            doAction(HIDE_NAV_MENU_OVERLAY, $('.nav-menu--opened'));
        }
    });
    $('.nav-menu__toggle').on('click', function(e) {
        var $navMenu = $(this).parents('.nav-menu');
        var event = $navMenu.hasClass('nav-menu--open') ? HIDE_NAV_MENU_OVERLAY : SHOW_NAV_MENU_OVERLAY;
        doAction(event, $navMenu);
    });
    addAction(SHOW_NAV_MENU_OVERLAY, function($navMenu) {
        doAction('css-vars/refresh');
        var $overlay = $navMenu.find('.nav-menu__overlay');
        doAction('focusStateInit', $overlay);
        $navMenu.addClass('nav-menu--open');
        if (LOCK_SCROLL) {
            setTimeout(function () {
                $body.addClass('lock-scroll');
            }, 300);
        }
        setTimeout(function() {
            $navMenu.addClass('nav-menu--opened');
            doAction('focusStateActivate', 'a');
        }, 20);
        addAction('key.esc', escHandler);
        addAction('showModal', escHandler);
    });
    addAction(HIDE_NAV_MENU_OVERLAY, function($navMenu) {
        removeAction('key.esc', escHandler);
        removeAction('showModal', escHandler);
        $body.removeClass('lock-scroll');
        $navMenu.removeClass('nav-menu--opened');
        $navMenu.find('.nav-menu__item').removeClass('nav-menu__item--open');
        doAction('focusStateReset');
        setTimeout(function() {
            $navMenu.removeClass('nav-menu--open');
        }, 300);
    });

    var openSubMenu = function($item, unhook) {
        if (!$item.hasClass('nav-menu__item--open')) {
            closeSubMenus($item);
        }
        $item.addClass('nav-menu__item--open');
        $body.on('focusin', maybeCloseSubMenusOnFocus);
    };
    var closeSubMenus = function($item) {
        $item.siblings().removeClass('nav-menu__item--open');
        $item.removeClass('nav-menu__item--open');
    };
    var toggleSubMenu = function($item) {
        return isSubMenuOpen($item) ? closeSubMenus($item) : openSubMenu($item);
    };
    var isSubMenuOpen = function($item) {
        return $item.hasClass('nav-menu__item--open');
    };
    var isOverlayClosed = function($item) {
        return $item.parents('.nav-menu__overlay').length && !$item.parents('.nav-menu--open').length;
    };
    var maybeCloseSubMenusOnFocus = function(e) {
        var $item = $(e.target).parents('.nav-menu__item');
        if ($item.hasClass('nav-menu__item--has-sub')) {
            return;
        }
        if ($item.length) {
            closeSubMenus($item);
        } else {
            $('.nav-menu__item--open').removeClass('nav-menu__item--open');
        }
        $body.off('focusin', maybeCloseSubMenusOnFocus);
    };
    var $navMenuItems = $('.nav-menu--responsive .nav-menu__item--has-sub');

    $navMenuItems.on('mouseenter', function() {
        var $item = $(this);
        if (isOverlayClosed($item)) {
            openSubMenu($item);
        }
    });
    $navMenuItems.on('mouseleave', function() {
        var $item = $(this);
        if (isOverlayClosed($item)) {
            closeSubMenus($item);
        }
    });

    $('.nav-menu .nav-menu__item--has-sub > a').on('click', function(e) {
        e.preventDefault();
        var $item = $(this).parent();
        if (!($item.is(':hover') && isOverlayClosed($item))) {
            toggleSubMenu($item);
        }
    });
    addFilter('css-vars/register', function(styles) {
        var $toggleBar = $('.nav-menu__toggle-bar');
        var $navMenu = $toggleBar.parents('.nav-menu');
        var pos = {};
        $.each(['top', 'left'], function(index, direction) {
            styles['navburger-' + direction] = function() {
                if (!$navMenu.hasClass('nav-menu--open')) {
                    pos[direction] = Math.floor($toggleBar[0].getBoundingClientRect()[direction]);
                }
                return pos[direction] + 'px';
            };
        });
        return styles;
    });
});
