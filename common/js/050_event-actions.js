/**
 * Event hooks for initializing components and handling layout changes. Initialize most components with:
 * Estarossa.addAction(INIT, myInitFunction);
 * eg:
 * myInitFunction($outerContainer){
 *      $outerContainer.find('.component-wrapper');
 * }
 *
 * Hook layout end events (after a resize, etc) like this:
 * Estarossa.addAction(LAYOUTEND, myUpdateFunction);
 *
 * For throttled layout updates instead of debounced, use:
 * Estarossa.addAction(LAYOUT, myUpdateFunction);
 */
(function(doAction, addAction, applyFilters) {
    addAction(REGISTER, function() {
        var debounce = applyFilters('debounceDelay', 300) || 300;
        var throttleLayout = applyFilters('layoutThrottle', 250) || 250;
        var throttleScroll = applyFilters('scrollThrottle', 100) || 100;
        var docWidth = viewport.width();
        var isScrolling = false;
        var currentWidth = 0;
        var widthHasChanged = function() {
            var newWidth = viewport.width();
            if (currentWidth === newWidth) {
                return false;
            }
            currentWidth = newWidth;
            return true;
        };
        var broadcastLayoutUpdate = _.throttle(function() {
            doAction(LAYOUT, widthHasChanged());
        }, throttleLayout, {leading: false});

        var broadcastLayoutEnd = _.debounce(function() {
            doAction(LAYOUTEND);
        }, debounce);

        var broadcastScrollEnd = _.debounce(function(event, position) {
            isScrolling = false;
            doAction(SCROLLEND, event, position);
        }, debounce);

        var layoutUpdate = Estarossa.updateLayout = function() {
            broadcastLayoutUpdate();
            broadcastLayoutEnd();
        };

        var onScroll = _.throttle(function(event) {
            var position = viewport.scrollPosition();
            if (!isScrolling) {
                isScrolling = true;
                doAction(SCROLLSTART, event, position);
            }
            doAction(SCROLL, event, position);
            broadcastScrollEnd(event, position);
        }, throttleScroll, {leading: true});

        var onUserFirstInteraction = function(){
            $(window).off("keydown mousemove touchmove touchstart touchend wheel", onUserFirstInteraction);
            doAction(USER_FIRST_INTERACTION);
        }

        $(window).on('load orientationchange', layoutUpdate);
        $(window).on('orientationchange', function() {
            setTimeout(layoutUpdate, 600);
        });

        if (isiOS) {
            $(window).on('resize', function() {
                var width = viewport.width();
                if (width !== docWidth) {
                    layoutUpdate();
                }
                docWidth = width;
            });
        } else {
            $(window).on('resize', layoutUpdate);
        }
        $(document).on('keydown', function(e) {
            var code = e.which || e.keyCode;
            var codes = {
                9: 'tab',
                13: 'return',
                27: 'esc'
            };
            if (codes.hasOwnProperty(code)) {
                doAction('key.' + codes[code], e);
            }
        });
        $(window).on('scroll', onScroll);
        $(window).one("keydown mousemove touchmove touchstart touchend wheel", onUserFirstInteraction);
        layoutUpdate();
    }, 100);

    $(function() {
        // Use this event if there is a possibility Estarossa hasn't been instantiated yet
        $(document).trigger('Estarossa.init', Estarossa);

        // Theme should register here to add any filters
        doAction(INIT);

        // Components should register here so theme can filter
        doAction(REGISTER);

        // Component post-registration actions can happen here
        doAction(READY);
    });
    $(document).bind('gform_confirmation_loaded', function(event, formId) {
        doAction(GFORM_CONFIRM, formId);
    });


})(Estarossa.doAction, Estarossa.addAction, Estarossa.applyFilters);
