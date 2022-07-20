Estarossa(function($) {
    $("[data-button]").each(function() {
        var $this = $(this);
        if (!$this.attr("role")) {
            $this.attr("role", "button")
        }
        if (!$this.attr("tabindex")) {
            $this.attr("tabindex", "0")
        }
        if (!$this.attr("aria-label") && $this.data("button")) {
            $this.attr("aria-label", $this.data("button"))
        }
        $this.keypress(function(e) {
            if (e.which === 13 || e.which === 32) {
                e.preventDefault();
                $(this).click()
            }
        })
    })
});
var focusSelectors = ["a", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", "button:not([disabled])", "[tabindex]", "iframe"];
var FocusState = function($el) {
    this.$el = $el;
    this.$firstFocusableElement = null;
    this.$lastFocusableElement = null;
    if (!this.$el[0].hasAttribute("tabindex")) {
        this.$el.attr("tabindex", -1)
    }
    this.init()
};
FocusState.prototype.init = function() {
    this.prev = document.activeElement;
    return this
};
FocusState.prototype.activate = function(selector) {
    var selectors = focusSelectors;
    if (selector) {
        selectors.push(selector)
    }
    var $focusable = this.$el.find(selectors.join(", ")).filter(function() {
        return this.tabIndex !== -1
    });
    this.focusTurnarounds = $focusable.first().add($focusable.last()).map(function() {
        var $this = jQuery(this);
        if ($this.is("iframe")) {
            return $this.parent().attr("tabindex", 0).get()
        }
        return this
    }).get();
    this.$el.focus();
    Estarossa.addAction("key.tab", this.trapFocus, 10, this);
    return this
};
FocusState.prototype.reset = function() {
    if (this.prev) {
        this.prev.focus();
        this.prev = false
    }
    Estarossa.removeAction("key.tab", this.trapFocus);
    return this
};
FocusState.prototype.trapFocus = function(event) {
    if (this.focusTurnarounds.indexOf(event.target) === -1) {
        return true
    }
    var direction = event.shiftKey;
    if (event.target === this.focusTurnarounds[+!direction]) {
        event.preventDefault();
        this.focusTurnarounds[+direction].focus();
        return false
    }
    return true
};
window.FocusState = FocusState;
Estarossa(function($, _, window, document) {
    var addAction = Estarossa.addAction;
    var currentFocusState;
    addAction("focusStateInit", function($el) {
        currentFocusState = new FocusState($el)
    });
    addAction("focusStateActivate", function(selector) {
        if (currentFocusState) {
            currentFocusState.activate(selector)
        }
    });
    addAction("focusStateReset", function() {
        if (currentFocusState) {
            currentFocusState.reset()
        }
    })
});
Estarossa(function($) {
    var BUTTON_TEXT = "Skip to Content";
    var BUTTON_CLASS = "sd-skip-nav";
    var DATA_ATTR = "skipNav";
    var TARGET_ATTR = "skipNavTarget";
    var $nav = $("[data-skip-nav]");
    if (!$nav.length) {
        return
    }
    $nav.each(function() {
        var $this = $(this);
        var $button = $('<a href="#" class="' + BUTTON_CLASS + '" />').html($this.data(DATA_ATTR) || BUTTON_TEXT);
        if ($this.data(TARGET_ATTR)) {
            $button.data(TARGET_ATTR, $this.data(TARGET_ATTR))
        }
        $this.prepend($button)
    });
    var getNext = function($el) {
        var $next = $el.next();
        if (!$next.length) {
            return getNext($el.parent())
        }
        return $next
    };
    var onClick = function(e) {
        e.preventDefault();
        var $button = $(this);
        var $target = function() {
            if ($button.data(TARGET_ATTR)) {
                var $el = $($button.data(TARGET_ATTR));
                return $el.length ? $el : false
            }
        }() || getNext($button.parent());
        if ($target.length) {
            $target.attr("tabindex", "-1");
            $target.get(0).focus();
            $("html, body").animate({
                scrollTop: $target.offset().top
            }, 400)
        }
    };
    $("." + BUTTON_CLASS).click(onClick)
});
Estarossa(function($, _, window, document) {
    var $body = $("body");
    var addAction = Estarossa.addAction;
    var isAccessibleMode = false;
    var ACCESSIBILITY_ON = "accessibility-on";
    var ACCESSIBILITY_OFF = "accessibility-off";
    var onTabPress = function() {
        if (!isAccessibleMode) {
            $body.addClass(ACCESSIBILITY_ON).removeClass(ACCESSIBILITY_OFF);
            isAccessibleMode = true
        }
    };
    var onClick = function() {
        if (isAccessibleMode) {
            $body.removeClass(ACCESSIBILITY_ON).addClass(ACCESSIBILITY_OFF);
            isAccessibleMode = false
        }
    };
    $body.addClass(ACCESSIBILITY_OFF);
    addAction("key.tab", onTabPress);
    $(document).mousedown(onClick)
});