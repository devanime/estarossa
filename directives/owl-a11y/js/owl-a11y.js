/**
 * Owl Carousel v2 Accessibility Plugin
 * Version 0.2.1
 * © Geoffrey Roberts 2016
 */

;(function($, window, document) {
    var applyFilters = Estarossa.applyFilters;
    var Owl2A11y = function(carousel) {
        this._core = carousel;
        this._initialized = false;

        this._core._options = $.extend(Owl2A11y.defaults, this._core.options);

        this.$element = this._core.$element;

        var setCurrent = $.proxy(function(e) {
            this.setCurrent(e);
        }, this);

        this._handlers = {
            'initialized.owl.carousel': $.proxy(function(e) {
                this.setupRoot();
                if (e.namespace && !this._initialized) {
                    this.setupFocus();
                    this.setupKeyboard();
                }
                this.setCurrent(e);
            }, this),
            'changed.owl.carousel': setCurrent,
            'translated.owl.carousel': setCurrent,
            'refreshed.owl.carousel': setCurrent,
            'resized.owl.carousel': setCurrent
        };
        this.$element.on(this._handlers);
    };

    /* PREFERENCES */

    /**
     * Contains default parameters, if there were any.
     */
    Owl2A11y.defaults = {};

    /* EVENT HANDLERS */

    /**
     * Adds support for things that don't map nicely to the root object
     * such as event handlers.
     */
    Owl2A11y.eventHandlers = {};

    /**
     * Get a callback for keyup events within this carousel.
     *
     * @return callback
     *   An event callback that takes an Event as an argument.
     */
    Owl2A11y.prototype.getDocumentKeyUp = function() {
        var self = this;
        return function(e) {
            var eventTarg = $(e.target),
                targ = self.focused(eventTarg),
                action = null;

            if (!!targ) {
                if (e.keyCode == 37 || e.keyCode == 38) {
                    action = 'prev.owl.carousel';
                } else if (e.keyCode == 39 || e.keyCode == 40) {
                    action = 'next.owl.carousel';
                } else if (e.keyCode == 13) {
                    // EDIT: Don't double up event handlers
                    // if (eventTarg.hasClass('owl-prev')) action = 'prev.owl.carousel';
                    // else if (eventTarg.hasClass('owl-next')) action = 'next.owl.carousel';
                    // else if (eventTarg.hasClass('owl-dot')) action = 'click';
                }

                if (!!action) targ.trigger(action);
            }
        };
    };

    /* SETUP AND TEAR DOWN */

    /**
     * Assign attributes to the root element.
     */
    Owl2A11y.prototype.setupRoot = function() {
        this.$element.attr({
            tabindex: '0'
        });
    };

    /**
     * Setup keyboard events for this carousel.
     */
    Owl2A11y.prototype.setupKeyboard = function() {
        // Only needed to initialise once for the entire document
        if (!this.$element.attr('data-owl-access-keyup')) {
            this.$element.bind('keyup', this.getDocumentKeyUp())
                .attr('data-owl-access-keyup', '1');
        }
        this.$element.attr('data-owl-carousel-focusable', '1');
    };

    /**
     * Setup focusing behaviour for the carousel.
     */
    Owl2A11y.prototype.setupFocus = function() {
        // Only needed to initialise once for the entire document
        var self = this;
        self.$element.bind('focusin', function() {
            $(this).attr({
                'data-owl-carousel-focused': '1',
                'aria-live': 'polite'
            }).trigger('stop.owl.autoplay');
        }).bind('focusout', function() {
            $(this).attr({
                'data-owl-carousel-focused': '0',
                'aria-live': 'off'
            })/*.trigger('play.owl.autoplay')*/;
        });

        // Add tabindex to allow navigation to be focused.
        if (!!self._core._plugins.navigation) {
            var navPlugin = self._core._plugins.navigation,
                toFocus = [];
            if (!!navPlugin._controls.$previous) {
                navPlugin._controls.$previous.removeAttr('role').attr('aria-label', applyFilters('owl-a11y/label-previous', 'Previous Slide', this.$element));
                toFocus.push(navPlugin._controls.$previous);
            }
            if (!!navPlugin._controls.$next) {
                navPlugin._controls.$next.removeAttr('role').attr('aria-label', applyFilters('owl-a11y/label-next', 'Next Slide', this.$element));
                toFocus.push(navPlugin._controls.$next);
            }
            if (!!navPlugin._controls.$absolute) {
                var indicatorIndex = 1;
                navPlugin._controls.$absolute.children().each(function() {
                    $(this).attr('aria-label', applyFilters('owl-a11y/label-indicator', 'Slide ' + indicatorIndex, self.$element));
                    indicatorIndex++;
                });
                toFocus.push(navPlugin._controls.$absolute.children());
            }
            $.each(toFocus, function() {
                this.attr('tabindex', '0');
            });
        }
    };

    /**
     * Assign attributes to the root element.
     */
    Owl2A11y.prototype.destroy = function() {
        this.$element.unbind('keyup')
            .removeAttr('data-owl-access-keyup data-owl-carousel-focusable')
            .unbind('focusin focusout');
    };

    /* HELPER FUNCTIONS */

    /**
     * Identifies all focusable elements within a given element.
     *
     * @param DOMElement elem
     *   A DOM element.
     *
     * @return jQuery
     *   A jQuery object that may refer to zero or more focusable elements.
     */
    Owl2A11y.prototype.focusableElems = function(elem) {
        return $(elem).find('a, input, select, button, *[tabindex]');
    };

    /**
     * Identifies all focusable elements within a given element.
     *
     * @param jQeury elems
     *   A jQuery object that may refer to zero or more focusable elements.
     * @param boolean enable
     *   Whether focus is to be enabled on these elements or not.
     */
    Owl2A11y.prototype.adjustFocus = function(elems, enable) {
        elems.each(function() {
            var item = $(this);

            if(!this.hasAttribute('data-tabindex')){
                item.attr('data-tabindex', this.hasAttribute('tabindex') ? item.attr('tabindex') : 0);
            }
            item.attr('tabindex', enable ? item.data('tabindex') : -1);
        });

    };

    /**
     * Get the root element if we are focused within it.
     *
     * @param DOMElement targ
     *   An element that might be within this carousel.
     *
     * @return mixed
     *   Either the jQuery element containing the root element, or NULL.
     */
    Owl2A11y.prototype.focused = function(targ) {
        var targ = $(targ);
        if (targ.attr('data-owl-carousel-focused') == 1) {
            return targ;
        }
        var closest = targ.closest('[data-owl-carousel-focused="1"]');
        if (closest.length > 0) return closest;
        return null;
    };

    /* UPDATE FUNCTIONS */

    /**
     * Identify active elements, set WAI-ARIA sttributes accordingly,
     * scroll to show element if we need to, and set up focusing.
     *
     * @param Event e
     *   The triggering event.
     */
    Owl2A11y.prototype.setCurrent = function(e) {
        var targ = this.focused($(':focus')),
            element = this._core.$element,
            stage = this._core.$stage,
            focusableElems = this.focusableElems,
            adjustFocus = this.adjustFocus;

        if (!!stage) {
            // EDIT: Don't hijack scroll
            /*var offs = stage.offset();
            if (!!targ) {
                window.scrollTo(
                    offs.left,
                    offs.top - parseInt($('body').css('padding-top'), 10)
                );
            }*/

            this._core.$stage.children().each(function(i) {
                var item = $(this);
                var focusable = focusableElems(this);

                // Use the active class to determine if we can see it or not.
                // Pretty lazy, but the Owl API doesn't make it easy to tell
                // from indices alone.
                if (item.hasClass('active')) {
                    item.attr('aria-hidden', 'false');
                    adjustFocus(focusable, true);
                } else {
                    item.attr('aria-hidden', 'true');
                    adjustFocus(focusable, false);
                }
            });
            if (!!targ && !this._core.options.autoplay) {
                // Focus on the root element after we're done moving,
                // but only if we're not using the controls.
                // EDIT: Check for specific nav element classes because sometimes parent container is not used.
                setTimeout(function() {
                    var newFocus = element;
                    var focusedEl = $(':focus');
                    var isNav = focusedEl.hasClass('owl-next') || focusedEl.hasClass('owl-prev') || focusedEl.hasClass('owl-dot');
                    if (isNav) {
                        newFocus = focusedEl;
                    }
                    newFocus[0].focus();
                }, 250);
            }
        }
    };

    $.fn.owlCarousel.Constructor.Plugins['Owl2A11y'] = Owl2A11y;
})(window.Zepto || window.jQuery, window, document);
