function SelectionWindow($wrap, bus) {
    var self = this;
    self.bus = bus;
    self.$wrap = $wrap;
    self.$selection = $wrap.find('.media-carousel__selection');
    self.$initial = self.$selection.find('.media-carousel__selection__initial');
    self.$captionToggle = $wrap.find('.media-carousel__selection__toggle-caption');
    self.$selectionCaption = $wrap.find('.media-carousel__selection__caption');
    self.$captionToggle.click(function(e) {
        self.$wrap.toggleClass('media-carousel__selection-wrap--caption-active');
    });
    self.bus.addAction('selected', self.onSelection, 10, self);
}

SelectionWindow.prototype = {
    reset: function(showInit) {
        var self = this;
        Estarossa.doAction(Estarossa.VIDEO_PAUSE);
        self.$selection.find('.video-player').addClass('video-player--inactive');
        self.$selection.find('.media-carousel__selection__photo--active').removeClass('media-carousel__selection__photo--active');
        self.$initial.toggleClass('media-carousel__selection__initial--hide', !showInit).css('display', '');
    },
    lockHeight: function(clear) {
        var self = this;
        self.$selection.css('min-height', '');
        if (!clear) {
            self.$selection.css('min-height', self.$selection.height());
        }
    },
    /**
     * @param {Selected} selected
     */
    onSelection: function(selected) {
        var self = this;
        self.doTransition();
        if (selected.type === 'video' || !window.mediaCarouselImages.hasOwnProperty(selected.id)) {
            self.$selection.find('.media-carousel__selection__photo--active').removeClass('media-carousel__selection__photo--active');
            return;
        }
        self.reset(false);
        var $image = self.getImageEl(selected);

        $image.addClass('media-carousel__selection__photo--active');
        self.$wrap.toggleClass('media-carousel__selection-wrap--caption', selected.$caption.length > 0).removeClass('media-carousel__selection-wrap--caption-active');
        setTimeout(function() {
            if (selected.$caption.length) {
                self.$selectionCaption.html(selected.$caption.clone());
            } else {
                self.$selectionCaption.empty();
            }
        }, 600);
    },
    doTransition: function() {
        var self = this;
        self.scrollWindow();
        self.lockHeight();
        self.$selection.addClass('media-carousel__selection--transition');
        setTimeout(function() {
            self.$selection.removeClass('media-carousel__selection--transition');
            self.lockHeight(true);
        }, 150);
    },
    /**
     *
     * @param {Selected} image
     */
    getImageEl: function(image) {
        var self = this;
        var $image = self.$selection.find('#image_' + image.id);
        if ($image.length) {
            return $image;
        }
        $image = $('<div>');
        $image.attr({id: 'image_' + image.id, class: 'media-carousel__selection__photo'});
        $image.html(window.mediaCarouselImages[image.id]);
        self.$selection.append($image);
        return $image;

    },
    scrollWindow: function() {
        var self = this;
        if (!self.bus.resetting) {
            setTimeout(function() {
                var scrollTarget = self.$selection.offset().top - Estarossa.applyFilters('header-height');
                if (Estarossa.viewport.scrollPosition().top > scrollTarget) {
                    $('html, body').animate({
                        scrollTop: scrollTarget
                    }, 350);
                }
            }, 150);
        }
    }
};
