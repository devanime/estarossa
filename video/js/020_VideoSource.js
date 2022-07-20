function VideoSource(str) {
    var self = this;
    if (typeof str !== 'string' && typeof str !== 'number') {
        throw new TypeError('VideoSource expects a string');
    }
    self.id = '';
    self.service = '';
    self.url = '';
    self.thumbnailReplace = ['', ''];
    self.thumbnailWidth = 1264;
    self.thumbnailHeight = 711;

    // remove surrounding whitespaces or linefeeds
    str = str.toString().trim();

    // remove the '-nocookie' flag from youtube urls
    str = str.replace('-nocookie', '');

    // remove any leading `www.`
    str = str.replace('/www.', '/');

    // Try to handle google redirection uri
    if (/\/\/google/.test(str)) {
        // Find the redirection uri
        var matches = str.match(/url=([^&]+)&/);

        // Decode the found uri and replace current url string - continue with final link
        if (matches) {
            // Javascript can get encoded URI
            str = decodeURIComponent(matches[1]);
        }
    }

    if (/youtube|youtu\.be|i.ytimg\./.test(str)) {
        self.id = self.youtube(str);
        self.service = YOUTUBE;
    } else if (/vimeo/.test(str)) {
        self.id = self.vimeo(str);
        self.service = VIMEO;
    } else if (!isNaN(parseFloat(str)) && isFinite(str)) {
        self.id = str;
        self.service = VIMEO;
    } else {
        self.id = str;
        self.service = YOUTUBE;
    }

    if (self.service === YOUTUBE) {
        self.url = 'https://www.youtube.com/watch?v=' + self.id;
        self.thumbnailReplace = ['hqdefault', 'maxresdefault'];
    } else if (self.service === VIMEO) {
        self.url = 'https://vimeo.com/' + self.id;
        self.thumbnailReplace = [/_.+?\.jpg/, '_' + self.thumbnailHeight + '.jpg'];
    }
}

/**
 * Get the vimeo id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
VideoSource.prototype.vimeo = function(str) {
    if (str.indexOf('#') > -1) {
        str = str.split('#')[0];
    }
    if (str.indexOf('?') > -1 && str.indexOf('clip_id=') === -1) {
        str = str.split('?')[0];
    }

    var id;
    var arr;

    if (/https?:\/\/vimeo\.com\/[0-9]+$|https?:\/\/player\.vimeo\.com\/video\/[0-9]+$|https?:\/\/vimeo\.com\/channels|groups|album/igm.test(str)) {
        arr = str.split('/');
        if (arr && arr.length) {
            id = arr.pop();
        }
    } else if (/clip_id=/igm.test(str)) {
        arr = str.split('clip_id=');
        if (arr && arr.length) {
            id = arr[1].split('&')[0];
        }
    }

    return id;
};

/**
 * Get the Youtube Video id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
VideoSource.prototype.youtube = function(str) {
    var self = this;
    // shortcode
    var shortcode = /youtube:\/\/|https?:\/\/youtu\.be\//g;

    if (shortcode.test(str)) {
        var shortcodeid = str.split(shortcode)[1];
        return self.stripParameters(shortcodeid);
    }

    // /v/ or /vi/
    var inlinev = /\/v\/|\/vi\//g;

    if (inlinev.test(str)) {
        var inlineid = str.split(inlinev)[1];
        return self.stripParameters(inlineid);
    }

    // v= or vi=
    var parameterv = /v=|vi=/g;

    if (parameterv.test(str)) {
        var arr = str.split(parameterv);
        return arr[1].split('&')[0];
    }

    // v= or vi=
    var parameterwebp = /\/an_webp\//g;

    if (parameterwebp.test(str)) {
        var webp = str.split(parameterwebp)[1];
        return self.stripParameters(webp);
    }

    // embed
    var embedreg = /\/embed\//g;

    if (embedreg.test(str)) {
        var embedid = str.split(embedreg)[1];
        return self.stripParameters(embedid);
    }

    // user
    var userreg = /\/user\//g;

    if (userreg.test(str)) {
        var elements = str.split('/');
        return self.stripParameters(elements.pop());
    }

    // attribution_link
    var attrreg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;

    if (attrreg.test(str)) {
        return str.match(attrreg)[1];
    }
};

/**
 * Strip away any parameters following `?` or `/`
 * @param str
 * @returns {*}
 */
VideoSource.prototype.stripParameters = function(str) {
    // Split parameters or split folder separator
    if (str.indexOf('?') > -1) {
        return str.split('?')[0];
    } else if (str.indexOf('/') > -1) {
        return str.split('/')[0];
    }
    return str;
};
