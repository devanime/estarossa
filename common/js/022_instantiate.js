var Estarossa = window.Estarossa = function(hook, callback) {
    if ($.isFunction(hook)) {
        callback = hook;
        hook = false;
    }
    hook = hook || REGISTER;
    hooks.addAction(hook, function(args) {
        return callback($, _, window, document, args);
    });
};
