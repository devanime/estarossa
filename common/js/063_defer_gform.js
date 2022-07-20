var scriptsLoaded = false;

var loadGFormScripts = function(formId) {
    var promises = [];
    if (!scriptsLoaded) {
        $('script[data-gform-src]').each(function () {
            this.setAttribute('src', this.dataset.gformSrc);
            promises.push($.Deferred(function(defer) {
                this.onload = defer.resolve;
                this.onerror = defer.reject;
            }.bind(this)));
        });
        scriptsLoaded = true;
    }
    $.when.apply($,promises).then(function() {
        if (window.gFormLoadStack && window.gFormLoadStack[formId] && window.executeLoadStack) {
            window.executeLoadStack(window.gFormLoadStack[formId]);
        }
    });
};

(function (addAction) {
    function initLoad() {
        $('.gform_wrapper').each(function () {
            loadGFormScripts(this.id);
        });
        setTimeout(function(){
            Estarossa.removeAction(USER_FIRST_INTERACTION, initLoad);
            Estarossa.removeAction('showModal', initLoad);
        }, 0);
    }

    addAction(USER_FIRST_INTERACTION, initLoad);
    addAction('showModal', initLoad);
})(Estarossa.addAction);
