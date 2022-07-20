Estarossa(Estarossa.READY, function ($, _, window, document) {
    var addFilter = Estarossa.addFilter;
    var $messages = $('.message').filter(function () {
        var message = new Message($(this));
        return message.$el;
    });

    if ($messages.length) {
        addFilter('stickyHeader/triggerHeight', function (val) {
            var height = $messages.first().height() || 0;
            height = height ? height + 20 : 0;
            return val + height;
        }, 5);
        addFilter('css-vars/register', function (styles) {
            styles['navburger-top'] = function () {
                return '40px';
            };
            return styles;
        }, 20);
    }

    if (window.messageModalData) {
        var modal_config_scripts = window.messageModalData;
        if (Array.isArray(modal_config_scripts)) {
            modal_config_scripts.forEach(function (item, index) {
                new MessageModal(item);
            });
        } else {
            new MessageModal(modal_config_scripts);
        }
    }
});
