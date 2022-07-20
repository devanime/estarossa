Estarossa(function($) {
    var STICKY_SELECTOR = 'sticky-header';
    var STICKY_MODIFIER = STICKY_SELECTOR + '--sticky';
    var STICKY_MODIFIER_ABS = STICKY_SELECTOR + '--absolute';
    var STICKY_MODIFIER_TOP = STICKY_SELECTOR + '--top';
    var STICKY_HEADER_SHOW = 'stickyHeaderShow';
    var STICKY_HEADER_HIDE = 'stickyHeaderHide';
    var $header = $('.' + STICKY_SELECTOR).addClass(STICKY_MODIFIER_TOP);
    var $body = $('body');
    if (!$header.length) {
        return false;
    }
    var addAction = Estarossa.addAction;
    var doAction = Estarossa.doAction;
    var applyFilters = Estarossa.applyFilters;
    var isVisible = false;
    var _triggerHeight = 0;
    var triggerHeight = function() {
        if (!_triggerHeight) {
            _triggerHeight = applyFilters('stickyHeader/triggerHeight', $header.data('stickyHeaderOffset') || applyFilters('header-height'));
        }
        return _triggerHeight;
    };
    var publishHeaderToggle = function(shouldShow) {
        if (isVisible && !shouldShow) {
            return doAction(STICKY_HEADER_HIDE);
        }
        if (!isVisible && shouldShow) {
            return doAction(STICKY_HEADER_SHOW);
        }
    };
    addAction(Estarossa.SCROLL, function(e, position) {
        publishHeaderToggle(position.top >= triggerHeight());
    });
    addAction(Estarossa.LAYOUTEND, function() {
        var position = Estarossa.viewport.scrollPosition();
        publishHeaderToggle(position.top >= triggerHeight());
    });
    addAction(STICKY_HEADER_SHOW, function() {
        $header.addClass(STICKY_MODIFIER).removeClass(STICKY_MODIFIER_TOP);
        isVisible = true;
        if(!$header.hasClass(STICKY_MODIFIER_ABS)) {
            $body.addClass('header-offset');
        }


    });
    addAction(STICKY_HEADER_HIDE, function() {
        $header.removeClass(STICKY_MODIFIER).addClass(STICKY_MODIFIER_TOP);
        isVisible = false;
        if(!$header.hasClass(STICKY_MODIFIER_ABS)) {
            $body.removeClass('header-offset');
        }
    });
});
