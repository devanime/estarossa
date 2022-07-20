Estarossa(function($, _, window, document) {
    var $body = $('body');
    var addAction = Estarossa.addAction;
    var isAccessibleMode = false;
    var ACCESSIBILITY_ON = 'accessibility-on';
    var ACCESSIBILITY_OFF = 'accessibility-off';
    var onTabPress = function() {
        if (!isAccessibleMode) {
            $body.addClass(ACCESSIBILITY_ON).removeClass(ACCESSIBILITY_OFF);
            isAccessibleMode = true;
        }
    };
    var onClick = function() {
        if (isAccessibleMode) {
            $body.removeClass(ACCESSIBILITY_ON).addClass(ACCESSIBILITY_OFF);
            isAccessibleMode = false;
        }
    };
    $body.addClass(ACCESSIBILITY_OFF);
    addAction('key.tab', onTabPress);
    $(document).mousedown(onClick);
});
