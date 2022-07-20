function Selected($slide) {
    var self = this;
    self.$el = $slide;
    self.$caption = $slide.parent().find('.media-carousel__caption');
    self.index = $slide.parents('.owl-item').index() + 1;
    self.type = $slide.attr('data-video-id') ? 'video' : 'image';
    self.id = $slide.attr('data-video-id') || $slide.attr('data-image-id');
}
