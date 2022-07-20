(function(window, doAction, addAction) {
    var HashState = function(previous) {
        this.current = $.address.path();
        this.currentList = $.address.pathNames();
        this.currentId = this.current.replace('/', '__');
        if (previous !== undefined) {
            this.previous = previous.current;
            this.previousList = previous.currentList;
        }
    };
    HashState.prototype.hasChanged = function() {
        return this.current !== this.previous;
    };
    HashState.prototype.isset = function() {
        return !!this.current;
    };
    HashState.prototype.matchesHash = function(hash) {
        return this.current.indexOf(hash.replace(/^#/, '')) > -1;
    };
    $.address.strict(false);
    $.address.tracker(function() {});
    var currentState = new HashState();
    var state = {
        emit: function() {
            if (currentState.isset() && currentState.hasChanged()) {
                doAction(Estarossa.HASH_STATE_CHANGE, currentState);
            }
        },
        isset: function() {
            return currentState.isset();
        },
        get: function() {
            return currentState;
        },
        set: function(newState) {
            if (typeof newState === 'string') {
                $.address.path(newState);
                return;
            }
            currentState = new HashState(currentState);
            state.emit();
        },
        setList: function(stateList) {
            state.set(stateList.join('/'));
        }
    };

    addAction(READY, function() {
        state.emit();
        $.address.change(function() {
            state.set();
        });
    }, 99);

    addAction(SET_HASH_STATE, function(hash) {
        state.set(hash);
    });

    Estarossa.hashState = state;
})(window, Estarossa.doAction, Estarossa.addAction);
