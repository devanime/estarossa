var getInteraction = function(action, video, container) {
    return {
        type: 'video',
        action: action,
        label: video.title,
        provider: video.service,
        url: video.url,
        id: video.id,
        $el: container
    };
};
addAction('video.playing', function(video, $container) {
    doAction(GTM_INTERACTION, getInteraction('start', video, $container));
});

addAction('video.paused', function(video, $container) {
    doAction(GTM_INTERACTION, getInteraction('pause', video, $container));
});
addAction('video.progress', function(video, $container, args) {
    doAction(GTM_INTERACTION, $.extend(getInteraction('progress', video, $container), {
        progress: args.progress
    }));
});
