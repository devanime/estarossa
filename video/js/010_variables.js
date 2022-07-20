var doAction = Estarossa.doAction;
var addAction = Estarossa.addAction;
var removeAction = Estarossa.removeAction;
var addFilter = Estarossa.addFilter;
var applyFilters = Estarossa.applyFilters;
var removeFilter = Estarossa.removeFilter;
var GTM_INTERACTION = Estarossa.GTM_INTERACTION;
var VIMEO = 'vimeo';
var YOUTUBE = 'youtube';
var videoServices = {};
videoServices[VIMEO] = new VideoService(VIMEO, 'https://player.vimeo.com/api/player.js', 'Vimeo');
videoServices[YOUTUBE] = new VideoService(YOUTUBE, 'https://www.youtube.com/iframe_api', function() {
    return window.hasOwnProperty('YT') && typeof YT.Player !== 'undefined';
});
var VIDEO_PAUSE = Estarossa.VIDEO_PAUSE = 'videoPause';
if (!window.location.origin) {
    window.location.origin =
        window.location.protocol + "//" + window.location.hostname +
        (window.location.port ? ':' + window.location.port : '');
}
