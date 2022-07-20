(function() {
    var pluginName = "videoThumb";
    var defaults = {
        forceLoad: false
    };

    function JqueryVideoThumb(element, options) {
        var self = this;
        self.el = element;
        self.$el = $(self.el);
        self.iLoaded = false;
        self.options = options;
        self.init();
    }

    JqueryVideoThumb.prototype = {

        init: function() {
            var self = this;
            defaults.id = self.$el.data('videoId') || defaults.id;
            self.config = $.extend({}, defaults, self.options, {image: self.$el.data('videoThumb')}, self.$el.data('videoOptions'));
            var loader = self.config.id ? Estarossa.videoRepository.find(self.config.id) : $.Deferred().reject();
            loader.done(function(video) {
                self.video = video;
                self.$el.addClass('video-thumb--' + video.service);
                self.images = [self.config.image,video.img.src, video.img.srcFallback].filter(Boolean);
                addAction('video.lazyload', self.maybeLoadImage, 10, self);
                self.replaceIcon();
                self.forceAspect();
                self.maybeLoadImage();
            });
        },
        forceAspect: function() {
            var self = this;
            if (self.$el.hasClass('video-thumb--match-aspect')) {
                matchAspect(self.$el, self.video);
            }
        },
        maybeLoadImage: function() {
            var self = this;
            if ((Estarossa.viewport.isInViewport(self.el) || self.config.forceLoad) && !self.iLoaded) {
                self.iLoaded = true;
                var img = new Image();
                img.addEventListener('load', function(event) {
                    var loadedImage = event.target;
                    //trigger error if youtube default image
                    if (loadedImage.height < 100) {
                        loadedImage.dispatchEvent(new Event('error'));
                        return;
                    }
                    self.$el.find('.video-thumb__bg').css('background-image', 'url("' + loadedImage.src + '")');
                    if(self.$el.find('.video-thumb__icon').length && !(self.$el.hasClass('video-thumb--dark') || self.$el.hasClass('video-thumb--light'))) {
                        Estarossa.imageBrightness(loadedImage.src, function (brightness) {
                            self.$el.addClass(brightness < 50 ? 'video-thumb--dark' : 'video-thumb--light');
                        });
                    }
                    if (!self.$el.hasClass('video-thumb--match-aspect')) {
                        matchAspect(self.$el, loadedImage);
                    }
                    setTimeout(function() {
                        self.$el.addClass('video-thumb--loaded').removeAttr('aria-hidden');
                    }, 20);
                    img = null;
                }, false);
                img.addEventListener('error', function() {
                    if(self.images.length) {
                        img.src = self.images.shift();
                    }
                }, false);
                setTimeout(function() {
                    removeAction('video.lazyload', self.maybeLoadImage, self);
                    img.src = self.images.shift();
                }, 5);
            }
        },
        replaceIcon: function () {
            if (this.video.service === 'youtube') {
                var $icon = $('<span>').addClass('video-thumb__yt').append($('<svg><use xlink:href="#youtube-play"></use></svg>'));
                this.$el.find('.video-thumb__icon').html($icon);
            }
        }
    };

    $.fn[pluginName] = function(options) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var item = $(this);
            var instance = $.data(this, pluginName);
            if (!instance) {
                item.data(pluginName, new JqueryVideoThumb(this, options));
            } else {
                if (typeof options === 'string') {
                    // Call method
                    instance[options].apply(instance, args);
                }
            }
        });
    };
})();
