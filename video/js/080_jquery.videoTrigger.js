(function() {
    var pluginName = "videoTrigger";
    var defaults = {
        forceLoad: false
    };

    function JqueryVideoTrigger(element, options) {
        var self = this;
        self.el = element;
        self.$el = $(self.el);
        self.options = options;
        self.pLoaded = false;
        self.init();
    }

    JqueryVideoTrigger.prototype = {

        init: function() {
            var self = this;
            self.$el.addClass('video--loading');
            defaults.id = self.$el.data('videoId') || defaults.id;
            self.config = $.extend({}, defaults, self.options, self.$el.data('videoOptions'));
            self.$target = self.getTargetEl();
            if ((self.$target && self.$target.hasClass('modal')) || self.config.modal) {
                self.$target = self.$target.find('.modal__content');
            }
            addAction('video.ready', self.onVideoReady, 10, self);
            var loader = self.config.id ? Estarossa.videoRepository.find(self.config.id) : $.Deferred().reject();
            loader.done(function(video) {
                self.video = video;
                if (!self.$target && self.$el.is('a')) {
                    self.$el.attr({'href': video.url, 'target': '_blank'});
                }
                if (!self.$el.attr('aria-label')) {
                    self.$el.attr('aria-label', 'Play Video - ' + video.title);
                }
                self.$el.data('gtm', false);
                if (self.$target) {
                    self.$el.on('click', self.onClick.bind(self));
                    addAction('video.lazyload', self.registerPlayer, 10, self);
                    self.registerPlayer();
                }
            });
        },
        getTargetEl: function() {
            var self = this;
            var target = $(self.$el.data('target')).add($(self.$el.attr('href'))).first();
            if (!target.length && self.$el.hasClass('video-thumb')) {
                target = self.$el.wrap('<div class="video-player-container">').parent('.video-player-container');
            }
            return target.length > 0 ? target : false;
        },
        onClick: function(e) {
            var self = this;
            e.preventDefault();
            self.$target.videoPlayer(self.video, 'playPause');
        },
        onVideoReady: function(video) {
            var self = this;
            if (self.video && video.id === self.video.id) {
                setTimeout(function() {
                    removeAction('video.ready', self.onVideoReady, self);
                    self.$el.removeClass('video--loading').addClass('video--loaded').removeAttr('aria-hidden');
                }, 5);
            }
        },
        registerPlayer: function() {
            var self = this;
            if ((Estarossa.viewport.isInViewport(self.el) || self.config.forceLoad) && !self.pLoaded) {
                self.pLoaded = true;
                setTimeout(function() {
                    removeAction('video.lazyload', self.registerPlayer, self);
                    self.$target.videoPlayer(self.video);
                    if(self.config.title || self.config.description) {
                        new VideoMetaElement(self.$target, self.video, self.config);
                    }
                }, 5);
            }
        }

    };

    $.fn[pluginName] = function(options) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var item = $(this);
            var instance = $.data(this, pluginName);
            if (!instance) {
                item.data(pluginName, new JqueryVideoTrigger(this, options));
            } else {
                if (typeof options === 'string') {
                    // Call method
                    instance[options].apply(instance, args);
                }
            }
        });
    };
})();
