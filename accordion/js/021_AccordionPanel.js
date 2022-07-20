function AccordionPanel($el) {
    var self = this;
    self.$el = $el;
    self.$btn = self.$el.find(BUTTON_SELECTOR);
    self.$content = self.$el.find(CONTENT_SELECTOR);
    self.height = 0;
    self.isOpen = false;
    self.$icon = self.$el.find('.accordion-panel__icon');
    self.icons = {
        a: self.$icon.data('iconName'),
        b: self.$icon.data('expandedIconName')
    };
    self.$use = self.$icon.find('.icon-use');
    if (self.$el.hasClass(EXPANDED_CLASS)) {
        self.toggle(null, true);
    }
    addAction(LAYOUTEND, self.setMax, 10, self);
    self.$btn.on('click', self.toggle.bind(self));
    self.$el.on('toggle', self.toggle.bind(self));
    self.$content.on(TRANSITION_END, _.debounce(self.transitionEnd.bind(self), 50));
}

AccordionPanel.prototype = {
    toggle: function (e, skipAnimation) {
        var self = this;
        self.isOpen = !self.isOpen;
        doAction('accordion/toggleStart', e, self.isOpen);
        self.$el.trigger(self.isOpen ? 'expanding' : 'collapsing');
        self.transition(!skipAnimation);
        self.swapIcons();
        self.$btn.attr('aria-expanded', self.isOpen);
        self.$content.attr('aria-hidden', !self.isOpen);
    },
    transition: function (animate) {
        var self = this;
        if (!animate) {
            self.applyClass();
            return;
        }
        self.$content.css(self.styles());
        self.applyClass();
        if (!self.isOpen) {
            setTimeout(self.transitionEnd.bind(self), 0);
        }
    },
    transitionEnd: function (e) {
        var self = this;
        if (!e || self.isOpen) {
            self.$content.css(self.styles(true));
        }
        if (e) {
            doAction('accordion/toggleEnd', e, self.isOpen);
        }
    },
    applyClass: function () {
        var self = this;
        self.$el.toggleClass(EXPANDED_CLASS, self.isOpen);
    },
    styles: function (reset) {
        return {
            maxHeight: reset ? '' : this.height
        };
    },
    setMax: function () {
        var self = this;
        setTimeout(function () {
            if (self.$el.hasClass(EXPANDED_CLASS)) {
                self.height = self.$content.outerHeight(true);
            } else {
                self.$el.addClass(EXPANDED_CLASS + ' ' + PANEL_CLASS + '--no-transition');
                self.$el.height(self.$el.height());
                self.height = self.$content.outerHeight(true);
                self.$el.removeClass(EXPANDED_CLASS);
                self.$el.css('height', '');
                setTimeout(function () {
                    self.$el.removeClass(PANEL_CLASS + '--no-transition');
                }, 250);
            }
        }, 0);
    },
    swapIcons: function () {
        var self = this;
        if (!self.icons.b || !self.$use.length) {
            return false;
        }
        self.$use.attr('xlink:href', '#icon-' + (self.isOpen ? self.icons.b : self.icons.a));
    },
};
