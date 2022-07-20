function VideoPlayList($container) {
    this.videos = {};
    this.players = {};
    this.$container = $container;
    this.orig = this.$container.children();
    this.current = false;
    addAction('video.playing', this.pauseAll, 10, this);
    addAction(VIDEO_PAUSE, this.pauseAll, 10, this);
}

$.extend(VideoPlayList.prototype, {
    add: function(video) {
        var id = video.id;
        if (this.videos.hasOwnProperty(id)) {
            return this;
        }
        var $el = $('<div>');
        this.$container.append($el);
        this.videos[id] = video;

        this.players[id] = video.service === VIMEO ?
            this.players[id] = new VimeoPlayer(video, $el) :
            this.players[id] = new YoutubePlayer(video, $el);
        if (!this.current) {
            this.select(video);
        }

        return this;
    },
    select: function(video) {
        this.currentVideo = this.videos[video.id];
        this.currentPlayer = this.players[video.id];
        this.current = video.id;
    },
    play: function(video) {
        this.fixContainerHeight();
        if (video) {
            this.select(video);
        }
        doAction(VIDEO_PAUSE);
        this.orig.hide();
        $.each(this.players, function(id, player) {
            if (id !== this.current) {
                player.hide();
            }
        });
        this.currentPlayer.play();
        this.fixContainerHeight(true);

        return this;
    },
    pause: function() {
        this.currentPlayer.pause();
        return this;
    },
    playPause: function(video) {
        if (this.currentPlayer.isPlaying()) {
            this.pause();
            if (video && video.id !== this.current) {
                this.play(video);
            }
        } else {
            this.play(video);
        }
        return this;
    },
    pauseAll: function(exceptVideo) {
        var self = this;
        $.each(self.players, function(id, player) {
            if (!exceptVideo || exceptVideo.id !== id) {
                player.pause();
            }
        });
        return self;
    },
    reset: function() {
        var self = this;
        $.each(self.players, function(id, player) {
            player.hide();
        });
        self.orig.show();
    },
    fixContainerHeight: function(reset) {
        var self = this;
        if(!reset) {
            self.$container.css('min-height', self.$container.height());
        } else {
            setTimeout(function(){
                self.$container.css('min-height', '');
            }, 50);
        }
    }
});
