var playerBase = {
    init: function(video, $container, options) {
        var self = this;
        self.video = video;
        self.$container = $container;
        self.$container.addClass('video-player video-player--inactive');
        self.options = options || {};
        self.isMobile = Estarossa.isMobile;
        matchAspect(self.$container, self.video);
        self._progress = [25, 50, 75, 95];
        self._getService().then(function() {
            self._setupContainer();
            self._createPlayer();
        });
    },
    _tick: function() {
        var progress = {
            position: Math.round(this.position()),
            duration: Math.round(this.duration()),
            percent: Math.round(this.position() / this.duration() * 100)
        };
        this._checkProgress(progress);
    },
    _checkProgress: function(progress) {
        var self = this;
        var next = self._progress[0] || false;
        if (next && progress.percent >= next) {
            var currentProgress = self._progress.shift();
            if (currentProgress >= 95) {
                currentProgress = 100;
            }
            self._publish('progress', {progress: currentProgress});
        }
    },
    show: function() {
        this.$container.removeClass('video-player--inactive');
    },
    hide: function() {
        this.$container.addClass('video-player--inactive');
    },
    play: function() {
        this._publish('play');
        this.show();
        this._playerAPI('play');
    },
    pause: function() {
        this._playerAPI('pause');
    },
    stop: function() {
        this._playerAPI('stop');
    },
    mute: function() {
        this._playerAPI('mute');
    },
    unMute: function() {
        this._playerAPI('unMute');
    },

    destroy: function() {
        this._playerAPI('destroy');
    },
    reset: function() {
        this.stop();
        this.hide();
    },
    onStateChange: function(state) {
        this._publish(state);
    },
    isPlaying: function() {
        return this._playerAPI('getPlayerState') === 1;
    },
    duration: function() {
        return this._playerAPI('getDuration');
    },
    position: function() {
        return this._playerAPI('getCurrentTime');
    },
    _publish: function(action, args) {
        doAction('video.' + action, this.video, this.$container, args);
        this.$container.trigger('video.' + action, args);
    },
    _setupContainer: function() {
        var el = $('<span/>');
        var origHtml = this.$container.data('origHtml') || this.$container.html();
        this.$container.data('origHtml', origHtml);
        this.$container.html(el);
        this.el = el[0];
    },

    _getService: function() {
        return videoServices[this.service].load();
    },
    _playerAPI: function(method, args) {
        if (this._player && typeof this._player[method] === 'function') {
            return this._player[method].apply(this._player, args);
        }
    },
    _createPlayer: function() {}
};
