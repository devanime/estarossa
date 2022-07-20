function Carousel($container) {
    var self = this;
    self.$container = $container;
    self.bus = new EventManager();
    self.bus.resetting = false;
    self.selection = new SelectionWindow($container.find('.media-carousel__selection-wrap'), self.bus);
    self.slider = new Slider($container.find('.media-carousel__slides'), self.bus);
    Estarossa.addAction(Estarossa.HASH_STATE_CHANGE, self.reset, 10, self);
    self.reset();
    $(window).on('load', function() {
        new CarouselGTM(self.bus);
    });
}

Carousel.prototype = {
    reset: function() {
        var self = this;
        self.bus.resetting = true;
        self.selection.reset(true);
        self.slider.reset();
        self.bus.resetting = false;
    }
};
