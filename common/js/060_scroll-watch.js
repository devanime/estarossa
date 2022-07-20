(function(addAction, removeAction) {
    var registered = [];
    var windowLoaded = false;
    /**
     *
     * @param {jQuery} $els
     * @param {function} callback
     * @param {Object} [options] Configuration options
     * @param {boolean} [options.force] Trigger even if element isn't visible
     * @param {boolean} [options.defer] Fire after window load event
     * @param {boolean} [options.prune] Remove element from group after firing once
     */
    Estarossa.scrollWatch = function($els, callback, options) {
        options = $.extend({
            force: false,
            defer: false,
            prune: true
        }, options || {});
        if ($els.length) {
            registered.push({$els: $els, callback: callback, options: options});
        }
    };

    function initCallback(group) {
        if (group.options.defer && !windowLoaded) {
            return;
        }
        group.$els.each(function() {
            var $this = $(this);
            if (Estarossa.viewport.isInViewport($this) && (group.force || $this.is(':visible'))) {
                var prune = group.callback.call(this, $this);
                if(prune || group.options.prune) {
                    group.$els = group.$els.not($this);
                }
            }
        });
    }

    function checkElements() {
        for (var i = 0; i < registered.length; i++) {
            if (registered[i].$els.length) {
                initCallback(registered[i]);
            } else {
                registered.splice(i, 1);
            }
        }
    }

    addAction(READY, checkElements);
    addAction(SCROLL, checkElements);
    addAction(LAYOUT, checkElements);
    $(window).on('load', function() {
        windowLoaded = true;
    });
})(Estarossa.addAction, Estarossa.removeAction);
