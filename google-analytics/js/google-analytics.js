(function(Estarossa, addAction, doAction, applyFilters) {
    var GA_EVENT = Estarossa.GA_EVENT;
    Estarossa(function($, _, window, document) {
        function getGaTracker() {
            var ga = window[window.GoogleAnalyticsObject];
            var deferred = $.Deferred();
            if (ga && $.isFunction(ga)) {
                ga(function() {
                    var customTrackerName = applyFilters('ga-tracker-name', false);
                    try {
                        deferred.resolve(customTrackerName ? ga.getByName(customTrackerName) : ga.getAll()[0]);
                    } catch (error) {
                        deferred.resolve(false);
                    }
                });
            } else {
                deferred.resolve(false);
            }
            return deferred.promise();
        }

        /**
         * Publish this event for custom analytics
         * doAction(GA_EVENT, ["Category", "Action", "Label"]);
         */
        addAction(GA_EVENT, function(event) {
            while (event.length < 3) {
                event.push('');
            }
            getGaTracker().then(function(tracker) {
                if (tracker) {
                    tracker.send('event', event[0], event[1], event[2]);
                }
            });
        });

        /**
         * Default data-attribute based event system
         * <a href="#" data-ga-event="Category, Action, Label"></a>
         */
        addAction(Estarossa.READY, function() {
            $(document).on('click', '[data-ga-event]', function(e) {
                var $this = $(this);
                var event = Estarossa.splitStr($this.data(GA_EVENT));
                doAction(GA_EVENT, event);
            });
        });

        /**
         * Gravity Forms successful submission hook for analytics events
         */
        addAction(Estarossa.GFORM_CONFIRM, function(formId) {
            var $formConfirmation = $('#gform_confirmation_wrapper_' + formId);
            var event = Estarossa.splitStr($formConfirmation.data(applyFilters('data-ga-confirm', 'gaConfirm')));
            if (event) {
                doAction(GA_EVENT, event);
            }
        });
        Estarossa.addFilter('gtm/disable-ga-click', function() {
            return true;
        });
    });

})(Estarossa, Estarossa.addAction, Estarossa.doAction, Estarossa.applyFilters);
