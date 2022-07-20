$.extend(Estarossa, globals, {
    addAction: function(action, callback, priority, context) {
        hooks.addAction.apply(this, arguments);
        return this;
    },
    removeAction: function(action, callback, context) {
        hooks.removeAction.apply(this, arguments);
        return this;
    },
    doAction: function(action) {
        actionHistory[action] = 1;
        hooks.doAction.apply(this, arguments);
        actionHistory[action] = 0;
        return this;
    },
    doingAction: function(action) {
        return (actionHistory[action] === 1);
    },
    didAction: function(action) {
        return (actionHistory[action] !== undefined);
    },
    currentAction: function() {
        for (var k in actionHistory) {
            if (actionHistory[k]) {
                return k;
            }
        }
        return false;
    },
    addFilter: function(filter, callback, priority, context) {
        hooks.addFilter.apply(this, arguments);
        return this;
    },
    removeFilter: function(filter, callback, context) {
        hooks.removeFilter.apply(this, arguments);
        return this;
    },
    applyFilters: function(action) {
        return hooks.applyFilters.apply(this, arguments);
    }
});
