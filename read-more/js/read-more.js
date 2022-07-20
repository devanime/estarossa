Estarossa(function($, _, window, document) {
    var $readMore = $('.js-read-more');

    $readMore.click(function(e) {
        e.preventDefault();
        var $_this = $(this);
        var $buttonTextContainer = $_this.find('.read-more__button-text');
        var $parent = $_this.parents('.read-more');
        var $content = $parent.find('.read-more__content');
        var readMoreText = $parent.data('read-more-text');
        var readLessText = $parent.data('read-less-text');
        var currentScrollPosition = Estarossa.viewport.scrollPosition().top;
        if (!$parent.hasClass('read-more--expanded')) {
            $parent.addClass('read-more--expanded');
            $content.attr('tabindex', '-1').get(0).focus();
            if (readLessText) {
                $buttonTextContainer.text(readLessText);
            } else {
                $_this.remove();
            }
        } else {
            $parent.removeClass('read-more--expanded');
            $buttonTextContainer.text(readMoreText);
        }
        $('html, body').scrollTop(currentScrollPosition);
        if($_this.offset().top) {
            var scrollTarget = $_this.offset().top - Estarossa.applyFilters('header-height');
            if ( currentScrollPosition > scrollTarget) {
                $('html, body').animate({
                    scrollTop: scrollTarget
                }, 350);
            }
        }
    });
});
