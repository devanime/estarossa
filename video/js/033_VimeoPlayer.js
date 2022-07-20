function VimeoPlayer(video, $container, options) {
    this.service = VIMEO;
    this.init(video, $container, options);
    this._duration = 0;
    this._isPlaying = false;
    this._curPos = 0;
}

$.extend(VimeoPlayer.prototype, playerBase, {
    _createPlayer: function() {
        var self = this;
        var playerVars = $.extend({}, Estarossa.applyFilters('playerVars/vimeo', {
            url: '',
            enablejsapi: 1,
            byline: false,
            title: false,
        }, self), {
            url: self.video.url,
            height: self.video.height,
            width: self.video.width,
            title: self.video.title
        });
        self._player = new Vimeo.Player(self.el, playerVars);
        self._player.on('play', function(data) {
            if (data.seconds === 0 && self.video.start) {
                self._player.setCurrentTime(self.video.start);
            }
            self._publish('playing');
        });
        self._player.on('ended', function() {
            self._publish('ended');
        });
        self._player.on('pause', function() {
            self._publish('paused');
        });
        self._player.on('loaded', function() {
            self._publish('ready');
        });
        self._player.on('timeupdate', _.throttle(self._updateState.bind(self), 1000, {leading: true, trailing: true}));
    },
    _updateState: function(data) {
        var self = this;
        self._curPos = data.seconds;
        self._duration = data.duration;
        self._playerAPI('getPaused').then(function(isPaused) {
            self._isPlaying = !isPaused;
            self._tick();
        });
    },
    isPlaying: function() {
        return this._isPlaying;
    },
    duration: function() {
        return this._duration;
    },
    position: function() {
        return this._curPos;
    }
});
