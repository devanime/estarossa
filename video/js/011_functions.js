var matchAspect = function($el, video) {
    var padding = Math.round(video.height / video.width * 10000) / 100;
    $el.css('padding-top', padding + '%');
};
var getParams = function(url) {
    var params = {
        query: {},
        hash: {}
    };

    function strToObj(str) {
        var obj = {};
        var arr = str.split('&');
        $.each(arr, function(index, item) {
            var pair = item.split('=');
            obj[pair[0]] = pair[1];
        });
        return obj;
    }

    var parts = url.split('?');
    if (parts.length > 1) {
        params.query = strToObj(parts.pop());
    }
    var hash = url.split('#');
    if (hash.length > 1) {
        params.hash = strToObj(hash.pop());
    }

    return params;
};
var vimeoTimeToSeconds = function(timeStr) {
    var parts = timeStr.split('m');
    var min = 0;
    if (parts.length > 1) {
        min = parseInt(parts[0]);
    }
    var sec = parseInt(parts.pop());
    return (min * 60) + sec;
};
