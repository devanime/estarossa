function AccordionGroup($container) {
    var self = this;
    self.$el = $container;
    self.single = self.$el[0].hasAttribute('data-single-open');
    self.panels = self.$el.find(PANEL_SELECTOR);
    self.panels.each(function() {
        new AccordionPanel($(this));
    });
    if (self.single) {
        self.panels.on('expanding', self.collapseOther.bind(self));
    }
    self.panels.on('expanding', self.gtm.bind(self));
    addAction(Estarossa.HASH_STATE_CHANGE, function(state) {
        var $match = self.panels.filter('#' + state.current);
        if ($match.length && !$match.hasClass(EXPANDED_CLASS)) {
            $match.trigger('toggle', [true]);
        }
    });
}

AccordionGroup.prototype = {
    collapseOther: function(e) {
        var self = this;
        var $current = $(e.target);
        self.panels.not($current).filter(EXPANDED_SELECTOR).trigger('toggle');
    },
    gtm: function(e){
        // var self = this;
        var $current = $(e.target);
        var $btn = $current.find('.accordion-panel__button');
        doAction(Estarossa.GTM_INTERACTION, {
            type: "accordionExpand",
            $el: $btn,
            id: $current.attr('id')
        })
    }
};
