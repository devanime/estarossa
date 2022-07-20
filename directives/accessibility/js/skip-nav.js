Estarossa(function($) {
    var BUTTON_TEXT = 'Skip to Content';
    var BUTTON_CLASS = 'sd-skip-nav';
    var DATA_ATTR = 'skipNav';
    var TARGET_ATTR = 'skipNavTarget';
    var $nav = $('[data-skip-nav]');
    if (!$nav.length) {
        return;
    }
    $nav.each(function() {
        var $this = $(this);
        var $button = $('<a href="#" class="' + BUTTON_CLASS + '" />').html($this.data(DATA_ATTR) || BUTTON_TEXT);

        if ($this.data(TARGET_ATTR)) {
            $button.data(TARGET_ATTR, $this.data(TARGET_ATTR));
        }
        $this.prepend($button);
    });
    var getNext = function($el) {
        var $next = $el.next();
        if (!$next.length) {
            return getNext($el.parent());
        }
        return $next;
    };
    var onClick = function(e) {
        e.preventDefault();
        var $button = $(this);
        var $target = (function() {
            if ($button.data(TARGET_ATTR)) {
                var $el = $($button.data(TARGET_ATTR));
                return $el.length ? $el : false;
            }
        })() || getNext($button.parent());
        if ($target.length) {
            $target.attr('tabindex', '-1');
            $target.get(0).focus();
            $('html, body').animate({
                scrollTop: $target.offset().top
            }, 400);
        }
    };
    $('.' + BUTTON_CLASS).click(onClick);
});
