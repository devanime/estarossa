/**
 * Usage:
 * Estarossa.addFilter('css-vars/register', function(){
 *
 * });
 */
function DynamicStylesheet(name, compat) {
    var self = this;
    self.name = name;
    self.compat = compat;
    self.styles = {};
    self.$tag = $('<style />', {id: self.name, type: 'text/css'});
    if (self.compat) {
        $('head').append(self.$tag);
    }
    self.sheet = self.$tag[0].sheet;
}

DynamicStylesheet.prototype = {
    update: function() {
        var self = this;
        if ($.isEmptyObject(self.styles)) {
            return;
        }
        var ruleVals = {};
        var rules = $.map(self.styles, function(method, key) {
            var value = typeof method === "function" ? method() : method;
            var property = '--dynamic__' + key;
            ruleVals[property] = value;
            return [property, value].join(':');
        }).join(';');
        if (!self.compat) {
            window.cssVars({
                variables: ruleVals,
            });
        } else {
            self.sheet.insertRule(':root {' + rules + '}', 0);
            while (self.sheet.cssRules.length > 1) {
                self.sheet.deleteRule(self.sheet.cssRules.length - 1);
            }
        }
    }
};
Estarossa.DynamicStylesheet = DynamicStylesheet;
(function(addAction, applyFilters) {
    var compat = !window.hasOwnProperty('cssVars');
    var layoutStyles = new DynamicStylesheet('dynamic-styles', compat);
    var scrollStyles = new DynamicStylesheet('scroll-styles', compat);
    var scrollPosition = Estarossa.viewport.scrollPosition().top;
    addAction(READY, function() {
        var useScroll = applyFilters('css-vars/use-scroll', false);
        layoutStyles.styles = applyFilters('css-vars/register', layoutStyles.styles);
        layoutStyles.update();
        if (useScroll) {
            scrollStyles.styles = applyFilters('css-vars/register-scroll', scrollStyles.styles);
            scrollStyles.update();
            addAction(SCROLL, scrollStyles.update, 10, scrollStyles);
        }
    }, 100);
    addAction(LAYOUT, layoutStyles.update, 10, layoutStyles);

    addAction('css-vars/refresh', layoutStyles.update, 10, layoutStyles);
    Estarossa.addFilter('css-vars/register-scroll', function(styles) {
        styles['scroll-direction'] = function() {
            var newPosition = Estarossa.viewport.scrollPosition().top;
            var direction = newPosition >= scrollPosition ? 1 : -1;
            scrollPosition = newPosition;
            return direction;
        };
        return styles;
    });

})(Estarossa.addAction, Estarossa.applyFilters);
