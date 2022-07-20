Estarossa(function($, _, window, document) {

    var addAction = Estarossa.addAction;
    var doAction = Estarossa.doAction;
    var lazyImageQueue = [];
    var currentlyLoading = 0;
    var loadingMax = 3;
    var selector = '.lazy-image';

    var ImageLoadTask = function($image) {
        this.$image = $($image);
        this.$parent = this.$image.parent();
        this.attributes = this.$image.data('lazy-image');
        this.cssClass = this.$image.attr('class').replace('lazy-image', 'lazy-image-loaded');
    };
    ImageLoadTask.prototype.onLoad = function(img) {
        this.$image.replaceWith(img);
        doAction('lazyImageLoaded', img);
        setTimeout(function() {
            this.$parent.removeClass('image-loading');
            this.$parent.addClass('image-loaded');
        }.bind(this), 10);
    };
    ImageLoadTask.prototype.run = function() {
        if (!this.attributes.src) {
            return false;
        }
        this.$parent.addClass('image-loading');
        var img = new Image();
        img.className = this.cssClass;
        img.addEventListener('load', this.onLoad.bind(this, img), false);
        for (var key in this.attributes) {
            if (this.attributes.hasOwnProperty(key)) {
                $(img).attr(key, this.attributes[key]);
            }
        }
    };

    var checkQueue = function() {
        if (!lazyImageQueue.length || currentlyLoading > loadingMax) {
            return false;
        }
        var nextTask = lazyImageQueue.shift();
        if (nextTask) {
            nextTask.run();
            currentlyLoading++;
            doAction('lazyImageTaskDequeued', nextTask);
        }
    };

    var completeLoad = function() {
        currentlyLoading--;
        checkQueue();
    };

    var addImageToQueue = function($lazyImage) {
        var task = new ImageLoadTask($lazyImage);
        lazyImageQueue.push(task);
        doAction('lazyImageJobQueued', task);
    };

    var checkImages = function() {
        var $image = $(this);
        if (!$image.hasClass('in-view')) {
            $image.addClass('in-view');
            addImageToQueue($image);
        }
    };

    Estarossa.scrollWatch($(selector), checkImages);

    addAction('refreshLazyLoad', function($container) {
        $container.find(selector).each(checkImages);
    });

    addAction('lazyImageJobQueued', checkQueue);
    addAction('lazyImageLoaded', completeLoad);
    addAction('showModal', function($modal) {
        doAction('refreshLazyLoad', $modal);
    }, 20);
});
