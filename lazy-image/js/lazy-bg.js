Estarossa(function($, _, window, document) {
    var selector = '[data-lazy-bg]';

    var checkBackgrounds = function () {
        var $this = $(this);
        $this.css('background-image', 'url("' + $this.data('lazyBg') + '")').removeAttr('data-lazy-bg');
    };

    Estarossa.scrollWatch($(selector), checkBackgrounds);

    Estarossa.addAction('refreshLazyLoad', function($container) {
        $container.find(selector).each(checkBackgrounds);
    });
});
