Estarossa(function($, _, window, document) {
    var addAction = Estarossa.addAction;
    var applyFilters = Estarossa.applyFilters;
    var doAction = Estarossa.doAction;
    var GA_EVENT = Estarossa.GA_EVENT;
    var GTM_INTERACTION = Estarossa.GTM_INTERACTION;
    var GTM_STATE = Estarossa.GTM_STATE;
    var dataLayer = window.dataLayer = window.dataLayer || [];
    var getContext = function($el) {
        return $el.parents('[data-gtm], [id], [aria-label], [aria-labelledby]').map(function() {
            var $this = $(this);
            return $this.data('gtm') || $this.attr('id') || $this.attr('aria-label') || $('#' + $this.attr('aria-labelledby')).text() || null;
        }).get().reverse();
    };
    $(document).on('click', '[data-ga-event]', function(e) {
        if (!applyFilters('gtm/disable-ga-click', false)) {
            doAction(GA_EVENT, Estarossa.splitStr($(this).data('gaEvent')));
        }
    });
    $(document).on('click', 'a, button, input:submit, [data-button]', function(e) {
        var $this = $(this);
        if ($this.data('gtm') !== 0 && $this.data('gtm') !== false) {
            doAction(GTM_INTERACTION, this);
        }
    });
    $(document).bind('gform_confirmation_loaded', function(e, formId) {
        var $el = $('#gform_confirmation_wrapper_' + formId);
        doAction(GTM_INTERACTION, {type: 'submit', formID: formId, success: true, $el: $el});
    });
    addAction(Estarossa.HASH_STATE_CHANGE, function(state) {
        doAction(GTM_STATE, {currentHash: state.current});
    });
    addAction('showModal', function($modal){
        var id = $modal.attr('id');
        var label = $modal.find('#' + $modal.attr('aria-labelledby')).text() || id;
        doAction(GTM_INTERACTION, {type: 'modal-open', label: label, destination: '#' + id});
    });
    addAction('hideModal', function($modal){
        var id = $modal.attr('id');
        var label = $modal.find('#' + $modal.attr('aria-labelledby')).text() || id;
        doAction(GTM_INTERACTION, {type: 'modal-close', label: label, destination: '#' + id});
    });

    addAction(GA_EVENT, function(eventData) {
        dataLayer.push({
            event: 'gaEvent',
            gaEvent: {
                category: eventData[0],
                action: eventData[1],
                label: eventData[2]
            }
        });
    });

    addAction(GTM_INTERACTION, function(interactionObj) {
        var $el = [];
        if (!$.isPlainObject(interactionObj)) {
            $el = $(interactionObj);
            interactionObj = {};
        } else if (interactionObj.hasOwnProperty('$el')) {
            $el = interactionObj.$el;
            delete interactionObj.$el;
        }
        var defaultInteraction = {
            type: 'click'
        };
        setTimeout(function() {
            if ($el.length) {
                var dataAttr = $el.data('gtm');
                var override = {};
                var label = '';
                if ($.isPlainObject(dataAttr)) {
                    override = dataAttr;
                } else {
                    label = dataAttr;
                }
                defaultInteraction.label =
                    label || $el.attr('aria-label') || $( '#' + $el.attr('aria-labelledby')).text() || $el.attr('title') || $el.attr('value') || $el.text().trim();
                defaultInteraction.context = getContext($el);
                if ($el.attr('href')) {
                    defaultInteraction.direction = $el[0].host !== window.location.host ? 'outbound' : 'internal';
                    defaultInteraction.destination = $el.attr('href').replace(window.location.protocol + '//' + window.location.host, '');
                    defaultInteraction.target = defaultInteraction.destination;
                }
                var toggleAttributes = [$el.attr('aria-pressed'), $el.attr('aria-expanded')].filter(Boolean);
                if (toggleAttributes.length) {
                    var toggleState = toggleAttributes[0];
                    defaultInteraction.toggle =
                        toggleState.toLowerCase().trim() === 'true' ||
                        parseInt(toggleState) === 1;
                }
                interactionObj = $.extend(interactionObj, override);
            }
            interactionObj = $.extend({}, defaultInteraction, interactionObj);

            dataLayer.push({event: 'interaction', interaction: interactionObj});
            dataLayer.push({event: '', interaction: undefined});
        }, 5);
    });
    addAction(GTM_STATE, function(interactionObj) {
        // @see https://www.lunametrics.com/blog/2016/03/21/removing-values-in-the-datalayer/
        var reset = {};
        for (var key in interactionObj) {
            if (interactionObj.hasOwnProperty(key) && ($.isPlainObject(interactionObj[key]) || $.isArray(interactionObj[key]))) {
                reset[key] = undefined;
            }
        }
        if (!$.isEmptyObject(reset)) {
            dataLayer.push({state: reset});
        }
        dataLayer.push({state: interactionObj});
    });

    $(window).on('load', function() {
        // Usage:
        // addFilter('gtm/scroll', function($el) { return $el.add('.my-target-element'); });
        // Or: add 'data-gtm-scroll' to any element to track
        Estarossa.scrollWatch($(applyFilters('gtm/scroll', $())).add('[data-gtm-scroll]').add($('footer').last()), function() {
            doAction(GTM_INTERACTION, {$el: $(this), type: 'scroll-view'});
        });
    });
});
