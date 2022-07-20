function YoutubePlayer(video, $container, options) {
    this.service = YOUTUBE;
    this.init(video, $container, options);
    this._timer = false;
}

$.extend(YoutubePlayer.prototype, playerBase, {
    _createPlayer: function() {
        var self = this;
        var playerVars = Estarossa.applyFilters('playerVars/youtube', {
            enablejsapi: 1,
            modestbranding: 1,
            iv_load_policy: 3,
            rel: 0,
            playsinline: 1
        }, self);
        if (self.video.start) {
            playerVars.start = self.video.start;
        }

        self._player = new YT.Player(self.el, $.extend({}, Estarossa.applyFilters('playerArgs/youtube', {}, self), {
            height: self.video.height,
            width: self.video.width,
            videoId: self.video.id,
            title: self.video.title,
            playerVars: playerVars,
            events: {
                'onReady': function() {
                    self._publish('ready');
                }.bind(self),
                'onStateChange': self.onStateChange.bind(self)
            }
        }));
    },
    _initTimer: function() {
        var self = this;
        self._timer = self._timer || setInterval(function() {
            if (self.isPlaying()) {
                self._tick();
            } else {
                self._clearTimer();
            }
        }, 1000);
    },
    _clearTimer: function() {
        var self = this;
        clearInterval(self._timer);
        self._timer = false;
    },
    play: function() {
        this._publish('play');
        this.show();
        this._playerAPI('playVideo');
    },
    stop: function() {
        this._playerAPI('stopVideo');
    },
    pause: function() {
        this._playerAPI('pauseVideo');
    },
    onStateChange: function(state) {
        var self = this;
        switch (state.data) {
            case YT.PlayerState.ENDED:
                self._clearTimer();
                self._tick();
                self._publish('ended');
                break;
            case YT.PlayerState.PLAYING:
                self._tick();
                self._initTimer();
                self._publish('playing');
                break;
            case YT.PlayerState.PAUSED:
                self._clearTimer();
                self._publish('paused');
                break;
        }
    }
});
