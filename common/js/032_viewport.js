var viewport = Estarossa.viewport = (function() {
    var width = function() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    };
    var height = function() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    };
    var scrollPosition = function() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = height();
        var scrollBottom = scrollTop + windowHeight;
        return {
            top: scrollTop,
            bottom: scrollBottom,
            height: windowHeight
        };
    };
    var isInViewport = function (el){
        if (typeof jQuery === 'function' && el instanceof jQuery) {
            el = el[0];
        }
        if (!el) {
            return false;
        }
        var rect = el.getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= height() &&
            rect.left <= width()
        );
    };
    return {
        width: width,
        height: height,
        scrollPosition: scrollPosition,
        isInViewport: isInViewport
    };
})();
