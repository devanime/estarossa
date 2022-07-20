function VideoMetaElement($target, video, config) {
    this.$target = $target;
    this.video = video;
    this.$el = $('<div class="video-meta">');
    var $title = $('<div class="video-meta__title ' + applyFilters('video/title-class', 'heading heading--large') + '">' + video.title + '</div>');
    var $description = $('<div class="video-meta__description">' + video.description + '</div>');
    if (config.title) {
        this.$el.append($title);
    }
    if (config.description) {
        this.$el.append($description);
    }
    $target.append(this.$el);
    addAction(VIDEO_PAUSE, this.onPause, 10, this);
    addAction('video.play', this.onPlay, 10, this);
}

VideoMetaElement.prototype = {
    toggle: function(show) {
        this.$el.toggleClass('video-meta--active', show);
    },
    onPlay: function(video, $container) {
        this.toggle(this.video === video);
    },
    onPause: function() {
        this.toggle(false);
    }
};
