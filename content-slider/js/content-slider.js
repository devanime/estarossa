Estarossa(function($, _, window, document) {
    var defaultOwlConfig = Estarossa.applyFilters('media-carousel/owl-settings', {
        items: 1,
        dots: false,
        nav: true,
        navText: ['&lsaquo;', '&rsaquo;'],
    });
    $('.content-slider').addClass('owl-carousel owl-theme').each(function() {
        var $this = $(this);
        var config = $this.data('owlConfig') || {};
        var instanceConfig = Estarossa.applyFilters('content-slider/owl-settings', defaultOwlConfig, $this);
        config = $.extend({}, instanceConfig, config);
        var $slides = $this.children();
        if ($slides.length > 1) {
            $this.owlCarousel(config).on('changed.owl.carousel', function(event) {
                if (event.property.name === 'position') {
                    Estarossa.doAction('refreshLazyLoad', $this);
                }
            });
            var $nav = $this.find('.owl-nav');
            if ($nav.find('svg').length) {
                $nav.addClass('owl-nav--svg');
            }
            Estarossa.doAction('content-slider/init', $this, config);
        } else {
            $this.removeClass('owl-carousel owl-theme');
        }
    });
});
