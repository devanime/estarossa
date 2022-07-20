var focusSelectors = [
    'a',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    '[tabindex]',
    'iframe'
];
var FocusState = function($el) {
    this.$el = $el;
    this.$firstFocusableElement = null;
    this.$lastFocusableElement = null;
    if (!this.$el[0].hasAttribute('tabindex')){
        this.$el.attr('tabindex', -1);
    }
    this.init();
};
FocusState.prototype.init = function() {
    this.prev = document.activeElement;
    return this;
};
FocusState.prototype.activate = function(selector) {
    var selectors = focusSelectors;
    if (selector) {
        selectors.push(selector);
    }
    var $focusable = this.$el.find(selectors.join(', ')).filter(function() {
        return this.tabIndex !== -1;
    });
    this.focusTurnarounds = $focusable.first().add($focusable.last()).map(function() {
        var $this = jQuery(this);
        if ($this.is('iframe')) {
            return $this.parent().attr('tabindex', 0).get();
        }
        return this;
    }).get();
    this.$el.focus();
    Estarossa.addAction('key.tab', this.trapFocus, 10, this);
    return this;
};
FocusState.prototype.reset = function() {
    if (this.prev) {
        this.prev.focus();
        this.prev = false;
    }
    Estarossa.removeAction('key.tab', this.trapFocus);
    return this;
};

FocusState.prototype.trapFocus = function(event) {
    if (this.focusTurnarounds.indexOf(event.target) === -1) {
        return true;
    }
    var direction = event.shiftKey;

    if (event.target === this.focusTurnarounds[+!direction]) {
        event.preventDefault();
        this.focusTurnarounds[+direction].focus();
        return false;
    }
    return true;
};

window.FocusState = FocusState;
Estarossa(function($, _, window, document) {

    var addAction = Estarossa.addAction;

    var currentFocusState;
    addAction('focusStateInit', function($el) {
        currentFocusState = new FocusState($el);
    });
    addAction('focusStateActivate', function(selector) {
        if (currentFocusState) {
            currentFocusState.activate(selector);
        }
    });

    addAction('focusStateReset', function() {
        if (currentFocusState) {
            currentFocusState.reset();
        }
    });
});
