Estarossa(function($, _, window, document) {
    var TOGGLE_TRIGGER = 'toggleTrigger';
    var TOGGLE_ACTIVE = 'toggleActive';
    var TOGGLE_INIT = 'toggleInit';
    var TOGGLE_ACTIVE_CLASS = 'toggle-active';
    var targetMap = {};
    var $toggleTargets = $('[data-toggle-target]');
    var defaultToggleIds = [];
    if (!$toggleTargets.length) {
        return;
    }

    var getToggleIds = function(el) {
        return Estarossa.splitStr($(el).data('toggleTarget'));
    };

    var shouldSetToggleDefault = function($el, toggleId) {
        return !($el.data('toggleDefault') === undefined || $el.parents('[data-toggle-target]').length) &&
            -1 === defaultToggleIds.indexOf(toggleId);
    };

    var toggleTrigger = function (targetIds) {
        var $validTargets = $([]);
        var updateState = arguments[1] || false;
        var group = false;
        for (var i = 0; i < targetIds.length; i++) {
            var targetId = targetIds[i];
            var $targetsToMerge = targetMap[targetId];
            if ($targetsToMerge === undefined) {
                continue;
            }
            group = $targetsToMerge.data('toggleGroup') || group;
            $validTargets = $validTargets.add($targetsToMerge.get());

            // only check for default child if last part of path
            if (i < targetIds.length - 1) {
                continue;
            }
            //if terminal path part has a default child, add to state and start over
            var $defaultChild = $targetsToMerge.find('[data-toggle-default]').first();
            if ($defaultChild.length) {
                var defaultChildToggleIds = getToggleIds($defaultChild);
                if (
                    defaultChildToggleIds.length &&
                    targetIds.indexOf(defaultChildToggleIds[0]) === -1
                ) {
                    targetIds.push(defaultChildToggleIds[0]);
                    if (updateState) {
                        Estarossa.hashState.setList(targetIds);
                        return;
                    }
                }
            }

        }
        if (!$validTargets.length) {
            return;
        }
        $toggleTargets.filter(function() {
            return ($(this).data('toggleGroup') || false) === group;
        }).removeClass(TOGGLE_ACTIVE_CLASS);
        $validTargets.addClass(TOGGLE_ACTIVE_CLASS);
        Estarossa.doAction(TOGGLE_TRIGGER, $validTargets);
        var activeIds = [];
        $validTargets.each(function() {
            $.merge(activeIds, getToggleIds(this));
        });
        Estarossa.doAction(TOGGLE_ACTIVE, activeIds);
        Estarossa.updateLayout();
    };

    var initToggleIds = function() {
        $toggleTargets.each(function() {
            var $el = $(this);
            $.each(getToggleIds($el), function(_, toggleId) {
                targetMap[toggleId] = targetMap[toggleId] === undefined ?  $el : targetMap[toggleId].add($el);
                if (shouldSetToggleDefault($el, toggleId)) {
                    defaultToggleIds.push(toggleId);
                }
            });
        });

        if ( !defaultToggleIds.length) {
            return;
        }
        if (Estarossa.hashState.isset()) {
            var current = Estarossa.hashState.current;
            var $targets = targetMap[current];
            if ($targets !== undefined) {
                return;
            }
        }
        toggleTrigger(defaultToggleIds);

        Estarossa.doAction(TOGGLE_INIT, targetMap, defaultToggleIds);
    };

    Estarossa.addAction(Estarossa.READY, initToggleIds);
    Estarossa.addAction(Estarossa.HASH_STATE_CHANGE, function(state) {
        toggleTrigger(state.currentList, true);
    });

});
