Estarossa(function($, _, window, document) {
    $('.video-thumb').videoThumb();
    addAction(Estarossa.USER_FIRST_INTERACTION, function(){
        $('[data-video-id]').videoTrigger();
    });
    $.each([Estarossa.SCROLL, Estarossa.LAYOUT, Estarossa.HASH_STATE_CHANGE], function(index, action) {
        addAction(action, function() {
            doAction('video.lazyload');
        });
    });
    $.each(['hideModal'], function(index, action) {
        addAction(action, function() {
            doAction(VIDEO_PAUSE);
        });
    });
});
