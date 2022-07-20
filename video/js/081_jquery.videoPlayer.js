(function() {
    var pluginName = "videoPlayer";
    var defaults = {};

    function JqueryVideoPlayer(element, args) {
        var self = this;
        self.el = element;
        self.$el = $(self.el);
        self.options = args;
        self.init();
    }

    JqueryVideoPlayer.prototype = {

        init: function() {
            var self = this;
            self.playlist = new VideoPlayList(self.$el);
            self.config = $.extend({}, defaults, self.options, self.$el.data('videoOptions'));
        },
        playPause: function(video, args) {
            this.playlist.playPause(video);
        },
        register: function(video, args) {
            this.playlist.add(video);
        }
    };

    $.fn[pluginName] = function() {
        var video = false;
        var method = false;
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            var element = arguments[i];
            if (element instanceof Video) {
                video = element;
            } else if (typeof element === "string") {
                method = element;
            } else if ($.isPlainObject(element)) {
                args = element;
            }
        }
        return this.each(function() {
            var item = $(this);
            var instance = $.data(this, pluginName);
            if (!instance) {
                instance = new JqueryVideoPlayer(this, args);
                item.data(pluginName, instance);
            }
            if (method) {
                instance[method].call(instance, video, args);
            } else {
                instance.register(video, args);
            }
        });
    };
})();
