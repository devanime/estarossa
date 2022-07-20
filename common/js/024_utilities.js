/**
 * Usage:
 * var newUrl = Estarossa.updateUrlParameter(oldUrl, 'myparam', 'myvalue');
 * - or -
 * var newUrl = Estarossa.updateUrlParameter(oldUrl, 'myparam=myvalue');
 * Result:
 * "http://old-url.com/?myparam=myvalue"
 *
 * Accommodates existing different or some query parameters, as well as hash state
 *
 * @param uri {string}
 * @param key {string}
 * @param value {string}
 * @returns {string}
 */
Estarossa.updateUrlParameter = function(uri, key, value) {
    if (!value && key.indexOf('=') !== -1) {
        key = key.split('=');
        value = key.pop();
        key = key.shift();
    }
    // remove the hash part before operating on the uri
    var i = uri.indexOf('#');
    var hash = i === -1 ? '' : uri.substr(i);
    uri = i === -1 ? uri : uri.substr(0, i);

    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";

    if (!value) {
        // remove key-value pair if value is empty
        uri = uri.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), '');
        if (uri.slice(-1) === '?') {
            uri = uri.slice(0, -1);
        }
        // replace first occurrence of & by ? if no ? is present
        if (uri.indexOf('?') === -1) {
            uri = uri.replace(/&/, '?');
        }
    } else if (uri.match(re)) {
        uri = uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        uri = uri + separator + key + "=" + value;
    }
    return uri + hash;
};
Estarossa.splitStr = function(str, delim) {
    delim = delim || ',';
    if ($.isArray(str)) {
        return str;
    }
    return str.split(delim).map(function(item) {
        return item.trim();
    }) || [];
};
Estarossa.groupByParent = function(selector) {
    return $(selector).parent().map(function() {
        return $(this).children(selector);
    });
};
Estarossa.uniqueID = function() {
    return Math.random().toString(36).substr(3, 6) + '-' + Math.random().toString(36).substr(3, 6);
};
Estarossa.storageAvailable = function(type) {
    var storage = [];
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
};
Estarossa.whitelistAssign = function(defaults, override) {
    $.each(override, function(key, value) {
        if (defaults.hasOwnProperty(key)) {
            defaults[key] = value;
        }
    });
};

Estarossa.groupByRow = function($els) {
    var groups = {};
    var row = 0;
    $els.each(function() {
        var $this = $(this);
        if (!$this.is(':visible')) {
            return true;
        }
        var top = $this.offset().top;
        var bottom = top + $this.height();
        var found = false;
        $.each(groups, function(index, obj) {
            if (top <= obj.top && bottom >= obj.bottom) {
                obj.top = top;
                obj.bottom = bottom;
                obj.$els = obj.$els.add($this);
                found = true;
            } else if (top >= obj.top && bottom <= obj.bottom) {
                obj.$els = obj.$els.add($this);
                found = true;
            }
        });
        if (!found) {
            groups[row] = {
                top: top,
                bottom: bottom,
                $els: $this
            };
            row++;
        }
    });
    groups = Object.keys(groups).map(function(k) {return groups[k];});
    groups.sort(function(a, b) {
        return a.top > b.top ? 1 : -1;
    });
    return groups.map(function(group) {
        return group.$els;
    });
};
Estarossa.imageBrightness = function(imageSrc, callback) {
    var img = new Image();
    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var r, g, b, lum;
        var colorSum = 0;
        for (var x = 0, len = data.length; x < len; x += 4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];
            /** @see: https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color */
            lum = 0.299 * r + 0.587 * g + 0.114 * b;
            colorSum += lum;
        }
        var brightness = Math.round (colorSum / (this.width * this.height) / 255 * 100);
        callback(brightness);
    };
    if (/^([\w]+\:)?\/\//.test(imageSrc) && imageSrc.indexOf(location.host) === -1) {
        // This would only be used in cases where image is not local - eg youtube thumbnail NOT imported via Video Producer
        img.crossOrigin = "anonymous"; // or "use-credentials"
        imageSrc = 'https://cors-anywhere.herokuapp.com/' + imageSrc;
    }
    img.src = imageSrc;
};
