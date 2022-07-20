function Slider($el, bus) {
    var self = this;
    self.$slider = $el;
    self.bus = bus;
    self.$links = self.$slider.find('.media-carousel__link');
    self.$links.on('click', self.onClick.bind(self));
    self.$slider.addClass('owl-carousel owl-theme').owlCarousel(owlSettings).on('changed.owl.carousel', self.onSlideChange.bind(self));
    self.$nav = self.$slider.find('.owl-nav');
    self.$nav.find('button').data('gtm', 0);
    if (self.$nav.find('svg').length) {
        self.$nav.addClass('owl-nav--svg');
    }
    Estarossa.addAction(Estarossa.LAYOUTEND, self.alignNav, 10, self);
    self.bus.addAction('selected', self.onSelect, 10, self);
}

Slider.prototype = {
    onClick: function(e) {
        e.preventDefault();
        var self = this;
        var $this = $(e.currentTarget);
        self.bus.doAction('selected', new Selected($this));
    },

    reset: function() {
        var self = this;
        self.$slider.trigger('to.owl.carousel', 0);
        self.bus.doAction('selected', new Selected(self.$links.first()));
    },
    /**
     * @param {Selected} selected
     */
    onSelect: function(selected) {
        var self = this;
        self.$links.removeClass('selected')/*.attr('tabindex', '')*/;
        selected.$el.addClass('selected')/*.attr('tabindex', '-1')*/;
    },
    alignNav: function() {
        this.$nav.css('top', this.$slider.find('.media-carousel__link').outerHeight() / 2);
    },
    onSlideChange: function(event) {
        var self = this;
        if (event.property.name === 'position') {
            Estarossa.updateLayout();
            self.bus.doAction('navigate', event);
            // Estarossa.doAction(Estarossa.GA_EVENT,
            //     Estarossa.applyFilters('media-carousel/navigate-ga',
            //         ['About_info', 'Internal_navigation', 'MediaBrowse']
            //     )
            // );
        }
    }
};
