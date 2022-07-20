(function($, Estarossa, _) {
    var doAction = Estarossa.doAction;
    var addAction = Estarossa.addAction;
    var removeAction = Estarossa.removeAction;
    var addFilter = Estarossa.addFilter;
    var applyFilters = Estarossa.applyFilters;
    var removeFilter = Estarossa.removeFilter;
    var GTM_INTERACTION = Estarossa.GTM_INTERACTION;
    var VIMEO = "vimeo";
    var YOUTUBE = "youtube";
    var videoServices = {};
    videoServices[VIMEO] = new VideoService(VIMEO, "https://player.vimeo.com/api/player.js", "Vimeo");
    videoServices[YOUTUBE] = new VideoService(YOUTUBE, "https://www.youtube.com/iframe_api", function() {
        return window.hasOwnProperty("YT") && typeof YT.Player !== "undefined"
    });
    var VIDEO_PAUSE = Estarossa.VIDEO_PAUSE = "videoPause";
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "")
    }
    var matchAspect = function($el, video) {
        var padding = Math.round(video.height / video.width * 1e4) / 100;
        $el.css("padding-top", padding + "%")
    };
    var getParams = function(url) {
        var params = {
            query: {},
            hash: {}
        };

        function strToObj(str) {
            var obj = {};
            var arr = str.split("&");
            $.each(arr, function(index, item) {
                var pair = item.split("=");
                obj[pair[0]] = pair[1]
            });
            return obj
        }
        var parts = url.split("?");
        if (parts.length > 1) {
            params.query = strToObj(parts.pop())
        }
        var hash = url.split("#");
        if (hash.length > 1) {
            params.hash = strToObj(hash.pop())
        }
        return params
    };
    var vimeoTimeToSeconds = function(timeStr) {
        var parts = timeStr.split("m");
        var min = 0;
        if (parts.length > 1) {
            min = parseInt(parts[0])
        }
        var sec = parseInt(parts.pop());
        return min * 60 + sec
    };
    var getInteraction = function(action, video, container) {
        return {
            type: "video",
            action: action,
            label: video.title,
            provider: video.service,
            url: video.url,
            id: video.id,
            $el: container
        }
    };
    addAction("video.playing", function(video, $container) {
        doAction(GTM_INTERACTION, getInteraction("start", video, $container))
    });
    addAction("video.paused", function(video, $container) {
        doAction(GTM_INTERACTION, getInteraction("pause", video, $container))
    });
    addAction("video.progress", function(video, $container, args) {
        doAction(GTM_INTERACTION, $.extend(getInteraction("progress", video, $container), {
            progress: args.progress
        }))
    });

    function VideoSource(str) {
        var self = this;
        if (typeof str !== "string" && typeof str !== "number") {
            throw new TypeError("VideoSource expects a string")
        }
        self.id = "";
        self.service = "";
        self.url = "";
        self.thumbnailReplace = ["", ""];
        self.thumbnailWidth = 1264;
        self.thumbnailHeight = 711;
        str = str.toString().trim();
        str = str.replace("-nocookie", "");
        str = str.replace("/www.", "/");
        if (/\/\/google/.test(str)) {
            var matches = str.match(/url=([^&]+)&/);
            if (matches) {
                str = decodeURIComponent(matches[1])
            }
        }
        if (/youtube|youtu\.be|i.ytimg\./.test(str)) {
            self.id = self.youtube(str);
            self.service = YOUTUBE
        } else if (/vimeo/.test(str)) {
            self.id = self.vimeo(str);
            self.service = VIMEO
        } else if (!isNaN(parseFloat(str)) && isFinite(str)) {
            self.id = str;
            self.service = VIMEO
        } else {
            self.id = str;
            self.service = YOUTUBE
        }
        if (self.service === YOUTUBE) {
            self.url = "https://www.youtube.com/watch?v=" + self.id;
            self.thumbnailReplace = ["hqdefault", "maxresdefault"]
        } else if (self.service === VIMEO) {
            self.url = "https://vimeo.com/" + self.id;
            self.thumbnailReplace = [/_.+?\.jpg/, "_" + self.thumbnailHeight + ".jpg"]
        }
    }
    VideoSource.prototype.vimeo = function(str) {
        if (str.indexOf("#") > -1) {
            str = str.split("#")[0]
        }
        if (str.indexOf("?") > -1 && str.indexOf("clip_id=") === -1) {
            str = str.split("?")[0]
        }
        var id;
        var arr;
        if (/https?:\/\/vimeo\.com\/[0-9]+$|https?:\/\/player\.vimeo\.com\/video\/[0-9]+$|https?:\/\/vimeo\.com\/channels|groups|album/gim.test(str)) {
            arr = str.split("/");
            if (arr && arr.length) {
                id = arr.pop()
            }
        } else if (/clip_id=/gim.test(str)) {
            arr = str.split("clip_id=");
            if (arr && arr.length) {
                id = arr[1].split("&")[0]
            }
        }
        return id
    };
    VideoSource.prototype.youtube = function(str) {
        var self = this;
        var shortcode = /youtube:\/\/|https?:\/\/youtu\.be\//g;
        if (shortcode.test(str)) {
            var shortcodeid = str.split(shortcode)[1];
            return self.stripParameters(shortcodeid)
        }
        var inlinev = /\/v\/|\/vi\//g;
        if (inlinev.test(str)) {
            var inlineid = str.split(inlinev)[1];
            return self.stripParameters(inlineid)
        }
        var parameterv = /v=|vi=/g;
        if (parameterv.test(str)) {
            var arr = str.split(parameterv);
            return arr[1].split("&")[0]
        }
        var parameterwebp = /\/an_webp\//g;
        if (parameterwebp.test(str)) {
            var webp = str.split(parameterwebp)[1];
            return self.stripParameters(webp)
        }
        var embedreg = /\/embed\//g;
        if (embedreg.test(str)) {
            var embedid = str.split(embedreg)[1];
            return self.stripParameters(embedid)
        }
        var userreg = /\/user\//g;
        if (userreg.test(str)) {
            var elements = str.split("/");
            return self.stripParameters(elements.pop())
        }
        var attrreg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;
        if (attrreg.test(str)) {
            return str.match(attrreg)[1]
        }
    };
    VideoSource.prototype.stripParameters = function(str) {
        if (str.indexOf("?") > -1) {
            return str.split("?")[0]
        } else if (str.indexOf("/") > -1) {
            return str.split("/")[0]
        }
        return str
    };

    function VideoService(name, url, loadConfirmation) {
        this.name = name;
        this.url = url;
        this.loadConfirmation = loadConfirmation;
        this.requested = false;
        this.deferred = $.Deferred()
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
                            self.deferred.reject()
                        }
                    }, 5e3);
                    interval = setInterval(function() {
                        if (self._checkLoad()) {
                            clearTimeout(timeout);
                            clearInterval(interval)
                        }
                    }, 250)
                }
            })
        }
        self.requested = true;
        return self.deferred.promise()
    };
    VideoService.prototype._checkLoad = function() {
        var loaded = $.isFunction(this.loadConfirmation) ? this.loadConfirmation() : window.hasOwnProperty(this.loadConfirmation);
        if (loaded) {
            this.deferred.resolve(this)
        }
        return loaded
    };

    function Video(videoSource) {
        this.id = "";
        this.service = "";
        this.height = 0;
        this.width = 0;
        this.title = "";
        this.description = "";
        this.img = "";
        this.url = "";
        this.thumbnailReplace = "";
        this.thumbnailWidth = "";
        this.thumbnailHeight = "";
        this._deferred = false;
        Estarossa.whitelistAssign(this, videoSource);
        this.height = parseInt(this.height);
        this.width = parseInt(this.width);
        this.start = 0;
        this._setStart()
    }
    $.extend(Video.prototype, {
        load: function() {
            var self = this;
            var firstRun = false;
            if (!self._deferred) {
                firstRun = true;
                self._deferred = $.Deferred()
            }
            if (self.height > 0) {
                self._deferred.resolve(self)
            } else if (firstRun) {
                $.getJSON("https://noembed.com/embed", {
                    format: "json",
                    url: self.url
                }, function(data) {
                    if (data.error) {
                        self._deferred.reject(self);
                        return
                    }
                    Estarossa.whitelistAssign(self, data);
                    try {
                        self.img = {
                            src: self.thumbnailReplace ? String.prototype.replace.apply(data.thumbnail_url, self.thumbnailReplace) : data.thumbnail_url,
                            srcFallback: data.thumbnail_url,
                            width: self.thumbnailWidth,
                            height: self.thumbnailHeight
                        };
                        self._deferred.resolve(self)
                    } catch (e) {
                        self._deferred.reject(self)
                    }
                })
            }
            return self._deferred.promise()
        },
        _toObj: function() {
            var ret = {};
            $.each(this, function(key, value) {
                if (key.indexOf("_") !== 0 && !$.isFunction(value)) {
                    ret[key] = value
                }
            });
            return ret
        },
        _setStart: function() {
            var self = this;
            var params = getParams(self.url);
            switch (self.service) {
                case YOUTUBE:
                    if (params.query.hasOwnProperty("t")) {
                        self.start = params.query.t
                    }
                    break;
                case VIMEO:
                    if (params.hash.hasOwnProperty("t")) {
                        self.start = vimeoTimeToSeconds(params.hash.t)
                    }
                    break
            }
        }
    });

    function VideoRepository() {
        this._videos = {};
        this._hasStorage = Estarossa.storageAvailable("sessionStorage")
    }
    $.extend(VideoRepository.prototype, {
        find: function(id) {
            var self = this;
            var video = self._getFromPage(id);
            if (!video) {
                var src = new VideoSource(id);
                id = src.id;
                video = self._getFromList(id) || self._getFromStorage(id) || self._createFromSrc(src)
            }
            var loader = video.load();
            loader.done(function(video) {
                self.add(video)
            }).fail(function(video) {});
            return loader.promise()
        },
        _getFromList: function(id) {
            return this._videos.hasOwnProperty(id) ? this._videos[id] : false
        },
        _getFromPage: function(id) {
            if (window.videoCache && window.videoCache.hasOwnProperty(id)) {
                return new Video(window.videoCache[id])
            }
        },
        _getFromStorage: function(id) {
            if (this._hasStorage) {
                var video = sessionStorage.getItem("video_" + id);
                if (video) {
                    return new Video(JSON.parse(video))
                }
            }
            return false
        },
        _createFromSrc: function(src) {
            return new Video(src)
        },
        _store: function(video) {
            if (this._hasStorage) {
                sessionStorage.setItem("video_" + video.id, JSON.stringify(video._toObj()))
            }
        },
        add: function(video) {
            this._videos[video.id] = video;
            this._store(video)
        }
    });
    Estarossa.videoRepository = new VideoRepository;
    var playerBase = {
        init: function(video, $container, options) {
            var self = this;
            self.video = video;
            self.$container = $container;
            self.$container.addClass("video-player video-player--inactive");
            self.options = options || {};
            self.isMobile = Estarossa.isMobile;
            matchAspect(self.$container, self.video);
            self._progress = [25, 50, 75, 95];
            self._getService().then(function() {
                self._setupContainer();
                self._createPlayer()
            })
        },
        _tick: function() {
            var progress = {
                position: Math.round(this.position()),
                duration: Math.round(this.duration()),
                percent: Math.round(this.position() / this.duration() * 100)
            };
            this._checkProgress(progress)
        },
        _checkProgress: function(progress) {
            var self = this;
            var next = self._progress[0] || false;
            if (next && progress.percent >= next) {
                var currentProgress = self._progress.shift();
                if (currentProgress >= 95) {
                    currentProgress = 100
                }
                self._publish("progress", {
                    progress: currentProgress
                })
            }
        },
        show: function() {
            this.$container.removeClass("video-player--inactive")
        },
        hide: function() {
            this.$container.addClass("video-player--inactive")
        },
        play: function() {
            this._publish("play");
            this.show();
            this._playerAPI("play")
        },
        pause: function() {
            this._playerAPI("pause")
        },
        stop: function() {
            this._playerAPI("stop")
        },
        mute: function() {
            this._playerAPI("mute")
        },
        unMute: function() {
            this._playerAPI("unMute")
        },
        destroy: function() {
            this._playerAPI("destroy")
        },
        reset: function() {
            this.stop();
            this.hide()
        },
        onStateChange: function(state) {
            this._publish(state)
        },
        isPlaying: function() {
            return this._playerAPI("getPlayerState") === 1
        },
        duration: function() {
            return this._playerAPI("getDuration")
        },
        position: function() {
            return this._playerAPI("getCurrentTime")
        },
        _publish: function(action, args) {
            doAction("video." + action, this.video, this.$container, args);
            this.$container.trigger("video." + action, args)
        },
        _setupContainer: function() {
            var el = $("<span/>");
            var origHtml = this.$container.data("origHtml") || this.$container.html();
            this.$container.data("origHtml", origHtml);
            this.$container.html(el);
            this.el = el[0]
        },
        _getService: function() {
            return videoServices[this.service].load()
        },
        _playerAPI: function(method, args) {
            if (this._player && typeof this._player[method] === "function") {
                return this._player[method].apply(this._player, args)
            }
        },
        _createPlayer: function() {}
    };

    function YoutubePlayer(video, $container, options) {
        this.service = YOUTUBE;
        this.init(video, $container, options);
        this._timer = false
    }
    $.extend(YoutubePlayer.prototype, playerBase, {
        _createPlayer: function() {
            var self = this;
            var playerVars = Estarossa.applyFilters("playerVars/youtube", {
                enablejsapi: 1,
                modestbranding: 1,
                iv_load_policy: 3,
                rel: 0,
                playsinline: 1
            }, self);
            if (self.video.start) {
                playerVars.start = self.video.start
            }
            self._player = new YT.Player(self.el, $.extend({}, Estarossa.applyFilters("playerArgs/youtube", {}, self), {
                height: self.video.height,
                width: self.video.width,
                videoId: self.video.id,
                title: self.video.title,
                playerVars: playerVars,
                events: {
                    onReady: function() {
                        self._publish("ready")
                    }.bind(self),
                    onStateChange: self.onStateChange.bind(self)
                }
            }))
        },
        _initTimer: function() {
            var self = this;
            self._timer = self._timer || setInterval(function() {
                if (self.isPlaying()) {
                    self._tick()
                } else {
                    self._clearTimer()
                }
            }, 1e3)
        },
        _clearTimer: function() {
            var self = this;
            clearInterval(self._timer);
            self._timer = false
        },
        play: function() {
            this._publish("play");
            this.show();
            this._playerAPI("playVideo")
        },
        stop: function() {
            this._playerAPI("stopVideo")
        },
        pause: function() {
            this._playerAPI("pauseVideo")
        },
        onStateChange: function(state) {
            var self = this;
            switch (state.data) {
                case YT.PlayerState.ENDED:
                    self._clearTimer();
                    self._tick();
                    self._publish("ended");
                    break;
                case YT.PlayerState.PLAYING:
                    self._tick();
                    self._initTimer();
                    self._publish("playing");
                    break;
                case YT.PlayerState.PAUSED:
                    self._clearTimer();
                    self._publish("paused");
                    break
            }
        }
    });

    function VimeoPlayer(video, $container, options) {
        this.service = VIMEO;
        this.init(video, $container, options);
        this._duration = 0;
        this._isPlaying = false;
        this._curPos = 0
    }
    $.extend(VimeoPlayer.prototype, playerBase, {
        _createPlayer: function() {
            var self = this;
            var playerVars = $.extend({}, Estarossa.applyFilters("playerVars/vimeo", {
                url: "",
                enablejsapi: 1,
                byline: false,
                title: false
            }, self), {
                url: self.video.url,
                height: self.video.height,
                width: self.video.width,
                title: self.video.title
            });
            self._player = new Vimeo.Player(self.el, playerVars);
            self._player.on("play", function(data) {
                if (data.seconds === 0 && self.video.start) {
                    self._player.setCurrentTime(self.video.start)
                }
                self._publish("playing")
            });
            self._player.on("ended", function() {
                self._publish("ended")
            });
            self._player.on("pause", function() {
                self._publish("paused")
            });
            self._player.on("loaded", function() {
                self._publish("ready")
            });
            self._player.on("timeupdate", _.throttle(self._updateState.bind(self), 1e3, {
                leading: true,
                trailing: true
            }))
        },
        _updateState: function(data) {
            var self = this;
            self._curPos = data.seconds;
            self._duration = data.duration;
            self._playerAPI("getPaused").then(function(isPaused) {
                self._isPlaying = !isPaused;
                self._tick()
            })
        },
        isPlaying: function() {
            return this._isPlaying
        },
        duration: function() {
            return this._duration
        },
        position: function() {
            return this._curPos
        }
    });

    function VideoPlayList($container) {
        this.videos = {};
        this.players = {};
        this.$container = $container;
        this.orig = this.$container.children();
        this.current = false;
        addAction("video.playing", this.pauseAll, 10, this);
        addAction(VIDEO_PAUSE, this.pauseAll, 10, this)
    }
    $.extend(VideoPlayList.prototype, {
        add: function(video) {
            var id = video.id;
            if (this.videos.hasOwnProperty(id)) {
                return this
            }
            var $el = $("<div>");
            this.$container.append($el);
            this.videos[id] = video;
            this.players[id] = video.service === VIMEO ? this.players[id] = new VimeoPlayer(video, $el) : this.players[id] = new YoutubePlayer(video, $el);
            if (!this.current) {
                this.select(video)
            }
            return this
        },
        select: function(video) {
            this.currentVideo = this.videos[video.id];
            this.currentPlayer = this.players[video.id];
            this.current = video.id
        },
        play: function(video) {
            this.fixContainerHeight();
            if (video) {
                this.select(video)
            }
            doAction(VIDEO_PAUSE);
            this.orig.hide();
            $.each(this.players, function(id, player) {
                if (id !== this.current) {
                    player.hide()
                }
            });
            this.currentPlayer.play();
            this.fixContainerHeight(true);
            return this
        },
        pause: function() {
            this.currentPlayer.pause();
            return this
        },
        playPause: function(video) {
            if (this.currentPlayer.isPlaying()) {
                this.pause();
                if (video && video.id !== this.current) {
                    this.play(video)
                }
            } else {
                this.play(video)
            }
            return this
        },
        pauseAll: function(exceptVideo) {
            var self = this;
            $.each(self.players, function(id, player) {
                if (!exceptVideo || exceptVideo.id !== id) {
                    player.pause()
                }
            });
            return self
        },
        reset: function() {
            var self = this;
            $.each(self.players, function(id, player) {
                player.hide()
            });
            self.orig.show()
        },
        fixContainerHeight: function(reset) {
            var self = this;
            if (!reset) {
                self.$container.css("min-height", self.$container.height())
            } else {
                setTimeout(function() {
                    self.$container.css("min-height", "")
                }, 50)
            }
        }
    });

    function VideoMetaElement($target, video, config) {
        this.$target = $target;
        this.video = video;
        this.$el = $('<div class="video-meta">');
        var $title = $('<div class="video-meta__title ' + applyFilters("video/title-class", "heading heading--large") + '">' + video.title + "</div>");
        var $description = $('<div class="video-meta__description">' + video.description + "</div>");
        if (config.title) {
            this.$el.append($title)
        }
        if (config.description) {
            this.$el.append($description)
        }
        $target.append(this.$el);
        addAction(VIDEO_PAUSE, this.onPause, 10, this);
        addAction("video.play", this.onPlay, 10, this)
    }
    VideoMetaElement.prototype = {
        toggle: function(show) {
            this.$el.toggleClass("video-meta--active", show)
        },
        onPlay: function(video, $container) {
            this.toggle(this.video === video)
        },
        onPause: function() {
            this.toggle(false)
        }
    };
    (function() {
        var pluginName = "videoThumb";
        var defaults = {
            forceLoad: false
        };

        function JqueryVideoThumb(element, options) {
            var self = this;
            self.el = element;
            self.$el = $(self.el);
            self.iLoaded = false;
            self.options = options;
            self.init()
        }
        JqueryVideoThumb.prototype = {
            init: function() {
                var self = this;
                defaults.id = self.$el.data("videoId") || defaults.id;
                self.config = $.extend({}, defaults, self.options, {
                    image: self.$el.data("videoThumb")
                }, self.$el.data("videoOptions"));
                var loader = self.config.id ? Estarossa.videoRepository.find(self.config.id) : $.Deferred().reject();
                loader.done(function(video) {
                    self.video = video;
                    self.$el.addClass("video-thumb--" + video.service);
                    self.images = [self.config.image, video.img.src, video.img.srcFallback].filter(Boolean);
                    addAction("video.lazyload", self.maybeLoadImage, 10, self);
                    self.replaceIcon();
                    self.forceAspect();
                    self.maybeLoadImage()
                })
            },
            forceAspect: function() {
                var self = this;
                if (self.$el.hasClass("video-thumb--match-aspect")) {
                    matchAspect(self.$el, self.video)
                }
            },
            maybeLoadImage: function() {
                var self = this;
                if ((Estarossa.viewport.isInViewport(self.el) || self.config.forceLoad) && !self.iLoaded) {
                    self.iLoaded = true;
                    var img = new Image;
                    img.addEventListener("load", function(event) {
                        var loadedImage = event.target;
                        if (loadedImage.height < 100) {
                            loadedImage.dispatchEvent(new Event("error"));
                            return
                        }
                        self.$el.find(".video-thumb__bg").css("background-image", 'url("' + loadedImage.src + '")');
                        if (self.$el.find(".video-thumb__icon").length && !(self.$el.hasClass("video-thumb--dark") || self.$el.hasClass("video-thumb--light"))) {
                            Estarossa.imageBrightness(loadedImage.src, function(brightness) {
                                self.$el.addClass(brightness < 50 ? "video-thumb--dark" : "video-thumb--light")
                            })
                        }
                        if (!self.$el.hasClass("video-thumb--match-aspect")) {
                            matchAspect(self.$el, loadedImage)
                        }
                        setTimeout(function() {
                            self.$el.addClass("video-thumb--loaded").removeAttr("aria-hidden")
                        }, 20);
                        img = null
                    }, false);
                    img.addEventListener("error", function() {
                        if (self.images.length) {
                            img.src = self.images.shift()
                        }
                    }, false);
                    setTimeout(function() {
                        removeAction("video.lazyload", self.maybeLoadImage, self);
                        img.src = self.images.shift()
                    }, 5)
                }
            },
            replaceIcon: function() {
                if (this.video.service === "youtube") {
                    var $icon = $("<span>").addClass("video-thumb__yt").append($('<svg><use xlink:href="#youtube-play"></use></svg>'));
                    this.$el.find(".video-thumb__icon").html($icon)
                }
            }
        };
        $.fn[pluginName] = function(options) {
            var args = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var item = $(this);
                var instance = $.data(this, pluginName);
                if (!instance) {
                    item.data(pluginName, new JqueryVideoThumb(this, options))
                } else {
                    if (typeof options === "string") {
                        instance[options].apply(instance, args)
                    }
                }
            })
        }
    })();
    (function() {
        var pluginName = "videoTrigger";
        var defaults = {
            forceLoad: false
        };

        function JqueryVideoTrigger(element, options) {
            var self = this;
            self.el = element;
            self.$el = $(self.el);
            self.options = options;
            self.pLoaded = false;
            self.init()
        }
        JqueryVideoTrigger.prototype = {
            init: function() {
                var self = this;
                self.$el.addClass("video--loading");
                defaults.id = self.$el.data("videoId") || defaults.id;
                self.config = $.extend({}, defaults, self.options, self.$el.data("videoOptions"));
                self.$target = self.getTargetEl();
                if (self.$target && self.$target.hasClass("modal") || self.config.modal) {
                    self.$target = self.$target.find(".modal__content")
                }
                addAction("video.ready", self.onVideoReady, 10, self);
                var loader = self.config.id ? Estarossa.videoRepository.find(self.config.id) : $.Deferred().reject();
                loader.done(function(video) {
                    self.video = video;
                    if (!self.$target && self.$el.is("a")) {
                        self.$el.attr({
                            href: video.url,
                            target: "_blank"
                        })
                    }
                    if (!self.$el.attr("aria-label")) {
                        self.$el.attr("aria-label", "Play Video - " + video.title)
                    }
                    self.$el.data("gtm", false);
                    if (self.$target) {
                        self.$el.on("click", self.onClick.bind(self));
                        addAction("video.lazyload", self.registerPlayer, 10, self);
                        self.registerPlayer()
                    }
                })
            },
            getTargetEl: function() {
                var self = this;
                var target = $(self.$el.data("target")).add($(self.$el.attr("href"))).first();
                if (!target.length && self.$el.hasClass("video-thumb")) {
                    target = self.$el.wrap('<div class="video-player-container">').parent(".video-player-container")
                }
                return target.length > 0 ? target : false
            },
            onClick: function(e) {
                var self = this;
                e.preventDefault();
                self.$target.videoPlayer(self.video, "playPause")
            },
            onVideoReady: function(video) {
                var self = this;
                if (self.video && video.id === self.video.id) {
                    setTimeout(function() {
                        removeAction("video.ready", self.onVideoReady, self);
                        self.$el.removeClass("video--loading").addClass("video--loaded").removeAttr("aria-hidden")
                    }, 5)
                }
            },
            registerPlayer: function() {
                var self = this;
                if ((Estarossa.viewport.isInViewport(self.el) || self.config.forceLoad) && !self.pLoaded) {
                    self.pLoaded = true;
                    setTimeout(function() {
                        removeAction("video.lazyload", self.registerPlayer, self);
                        self.$target.videoPlayer(self.video);
                        if (self.config.title || self.config.description) {
                            new VideoMetaElement(self.$target, self.video, self.config)
                        }
                    }, 5)
                }
            }
        };
        $.fn[pluginName] = function(options) {
            var args = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var item = $(this);
                var instance = $.data(this, pluginName);
                if (!instance) {
                    item.data(pluginName, new JqueryVideoTrigger(this, options))
                } else {
                    if (typeof options === "string") {
                        instance[options].apply(instance, args)
                    }
                }
            })
        }
    })();
    (function() {
        var pluginName = "videoPlayer";
        var defaults = {};

        function JqueryVideoPlayer(element, args) {
            var self = this;
            self.el = element;
            self.$el = $(self.el);
            self.options = args;
            self.init()
        }
        JqueryVideoPlayer.prototype = {
            init: function() {
                var self = this;
                self.playlist = new VideoPlayList(self.$el);
                self.config = $.extend({}, defaults, self.options, self.$el.data("videoOptions"))
            },
            playPause: function(video, args) {
                this.playlist.playPause(video)
            },
            register: function(video, args) {
                this.playlist.add(video)
            }
        };
        $.fn[pluginName] = function() {
            var video = false;
            var method = false;
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                var element = arguments[i];
                if (element instanceof Video) {
                    video = element
                } else if (typeof element === "string") {
                    method = element
                } else if ($.isPlainObject(element)) {
                    args = element
                }
            }
            return this.each(function() {
                var item = $(this);
                var instance = $.data(this, pluginName);
                if (!instance) {
                    instance = new JqueryVideoPlayer(this, args);
                    item.data(pluginName, instance)
                }
                if (method) {
                    instance[method].call(instance, video, args)
                } else {
                    instance.register(video, args)
                }
            })
        }
    })();
    Estarossa(function($, _, window, document) {
        $(".video-thumb").videoThumb();
        addAction(Estarossa.USER_FIRST_INTERACTION, function() {
            $("[data-video-id]").videoTrigger()
        });
        $.each([Estarossa.SCROLL, Estarossa.LAYOUT, Estarossa.HASH_STATE_CHANGE], function(index, action) {
            addAction(action, function() {
                doAction("video.lazyload")
            })
        });
        $.each(["hideModal"], function(index, action) {
            addAction(action, function() {
                doAction(VIDEO_PAUSE)
            })
        })
    })
})(jQuery, Estarossa, lodash);