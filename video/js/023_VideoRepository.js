function VideoRepository() {
    this._videos = {};
    this._hasStorage = Estarossa.storageAvailable('sessionStorage');
}

$.extend(VideoRepository.prototype, {
    find: function(id) {
        var self = this;
        var video = self._getFromPage(id);
        if(!video) {
            var src = new VideoSource(id);
            id = src.id;
            video = self._getFromList(id) || self._getFromStorage(id) || self._createFromSrc(src);
        }

        var loader = video.load();
        loader.done(function(video) {
            self.add(video);
        }).fail(function(video){
        });
        return loader.promise();

    },
    _getFromList: function(id) {
        return this._videos.hasOwnProperty(id) ? this._videos[id] : false;
    },
    _getFromPage: function(id) {
        if (window.videoCache && window.videoCache.hasOwnProperty(id)) {
            return new Video(window.videoCache[id]);
        }
    },
    _getFromStorage: function(id) {
        if (this._hasStorage) {
            var video = sessionStorage.getItem('video_' + id);
            if (video) {
                return new Video(JSON.parse(video));
            }
        }
        return false;
    },
    _createFromSrc: function(src) {
        return new Video(src);
    },
    _store: function(video) {
        if (this._hasStorage) {
            sessionStorage.setItem('video_' + video.id, JSON.stringify(video._toObj()));
        }
    },
    add: function(video) {
        this._videos[video.id] = video;
        this._store(video);
    },
});
Estarossa.videoRepository = new VideoRepository();
