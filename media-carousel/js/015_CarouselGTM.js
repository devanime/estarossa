function CarouselGTM(bus) {
    this.bus = bus;
    this.currentIndex = 1;
    this.currentPage = 0;
    bus.addAction('selected', this.onSelect, 10, this);
    bus.addAction('navigate', this.onNavigate, 10, this);
}

CarouselGTM.prototype = {
    onSelect : function(selected) {
        if( this.currentIndex === selected.index ) {
            return;
        }
        this.currentIndex = selected.index;
        Estarossa.doAction(Estarossa.GTM_INTERACTION, {
            type : 'carouselSelect',
            $el : selected.$el,
            label : selected.$caption.text() || selected.$el.find('img').attr('alt'),
            index : selected.index,
            media : selected.type
        });
    },
    onNavigate : function (event) {
        var currentPage = event.item.index;
        var direction = currentPage > this.currentPage ? 'next' : 'prev';
        this.currentPage = currentPage;
        Estarossa.doAction(Estarossa.GTM_INTERACTION, {
            type : 'carouselNavigate',
            $el : $(event.target),
            label : direction,
            index : currentPage
        });
    }
};
