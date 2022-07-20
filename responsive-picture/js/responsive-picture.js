Estarossa(function ($, _, window, document) {
    function updateAttr(attr) {
        var $this = $(this);
        attr = $this.is('img') ? 'src' : 'srcset';
        $this.attr(attr, $this.data(attr)).removeAttr('data-' + attr);
    }

    function loadPicture() {
        var $picture = $(this);

        function reveal() {
            var $img = $(this);
            $img.css('padding-top', '');
            $picture.removeClass('responsive-picture--loading');
        }

        $picture.find('img').on('load error', reveal);
        $picture.find('source, img').each(updateAttr);
    }

    Estarossa.addAction('showModal', function ($modal) {
        $modal.find('.responsive-picture--loading').each(loadPicture);
    }, 30);
    Estarossa.scrollWatch($('.responsive-picture--loading'), loadPicture);
});
