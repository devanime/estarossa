/**
 *
 * @param {VideoSource|Object} videoSource
 * @constructor
 */
function Video(videoSource) {
    this.id = '';
    this.service = '';
    this.height = 0;
    this.width = 0;
    this.title = '';
    this.description = '';
    this.img = '';
    this.url = '';
    this.thumbnailReplace = '';
    this.thumbnailWidth = '';
    this.thumbnailHeight = '';
    this._deferred = false;
    Estarossa.whitelistAssign(this, videoSource);
    this.height = parseInt(this.height);
    this.width = parseInt(this.width);
    this.start = 0;
    this._setStart();
}

$.extend(Video.prototype, {
    load: function() {
        var self = this;
        var firstRun = false;
        if (!self._deferred) {
            firstRun = true;
            self._deferred = $.Deferred();
        }
        if (self.height > 0) {
            self._deferred.resolve(self);
        } else if (firstRun) {
            $.getJSON('https://noembed.com/embed', {
                format: 'json',
                url: self.url
            }, function(data) {
                if (data.error) {
                    self._deferred.reject(self);
                    return;
                }
                Estarossa.whitelistAssign(self, data);
                try {
                    self.img = {
                        src: self.thumbnailReplace ? String.prototype.replace.apply(data.thumbnail_url, self.thumbnailReplace) : data.thumbnail_url,
                        srcFallback: data.thumbnail_url,
                        width: self.thumbnailWidth,
                        height: self.thumbnailHeight
                    };
                    self._deferred.resolve(self);
                } catch (e) {
                    self._deferred.reject(self);
                }
            });
        }
        return self._deferred.promise();
    },
    _toObj: function() {
        var ret = {};
        $.each(this, function(key, value) {
            if (key.indexOf('_') !== 0 && !$.isFunction(value)) {
                ret[key] = value;
            }
        });
        return ret;
    },
    _setStart: function() {
        var self = this;
        var params = getParams(self.url);
        switch (self.service) {
            case YOUTUBE:
                if (params.query.hasOwnProperty('t')) {
                    self.start = params.query.t;
                }
                break;
            case VIMEO:
                if (params.hash.hasOwnProperty('t')) {
                    self.start = vimeoTimeToSeconds(params.hash.t);
                }
                break;
        }
    }
});
