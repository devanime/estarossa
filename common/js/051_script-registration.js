(function() {
    var scripts = {};
    var cachedScript = function(url, options) {
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });
        return jQuery.ajax(options);
    };

    var registerScript = Estarossa.registerScript = function(scriptName, url) {
        scripts[scriptName] = {
            url: url,
            deferred: $.Deferred(),
            requested: false
        };
    };
    Estarossa.loadScript = function(name, url) {
        if (!scripts.hasOwnProperty(name)) {
            if (url) {
                registerScript(name, url);
            } else {
                return false;
            }
        }
        if (!scripts[name].requested) {
            scripts[name].requested = true;
            cachedScript(scripts[name].url).done(function() {
                scripts[name].deferred.resolve(name);
            });
        }
        return scripts[name].deferred.promise();
    };
})();
