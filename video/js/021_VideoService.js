function VideoService(name, url, loadConfirmation) {
    this.name = name;
    this.url = url;
    this.loadConfirmation = loadConfirmation;
    this.requested = false;
    this.deferred = $.Deferred();
}


VideoService.prototype.load = function() {
    var self = this;
    if (!self.requested && !self._checkLoad()) {
        Estarossa.loadScript(self.name, self.url).then(function() {
            if (!self._checkLoad()) {
                var interval = 0;
                var timeout = setTimeout(function() {
                    if (interval) {
                        clearInterval(interval);
                        self.deferred.reject();
                    }
                }, 5000);
                interval = setInterval(function() {
                    if (self._checkLoad()) {
                        clearTimeout(timeout);
                        clearInterval(interval);
                    }
                }, 250);
            }
        });
    }
    self.requested = true;
    return self.deferred.promise();
};
VideoService.prototype._checkLoad = function() {
    var loaded = $.isFunction(this.loadConfirmation) ? this.loadConfirmation() : window.hasOwnProperty(this.loadConfirmation);
    if (loaded) {
        this.deferred.resolve(this);
    }
    return loaded;
};
