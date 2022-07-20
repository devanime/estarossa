function FilterableItem($el, data, types) {
    var self = this;
    self.$el = $el;
    self.types = types;
    self.id = '';
    self.matches = {};
    Estarossa.whitelistAssign(self, data);
    self.matches = normalizeMatches(self.matches, self.types);
    self.matchMethods = {};
    $.each(self.types, function(key, value){
        var method = applyFilters(MATCH_FUNC + key, false);
        if (method) {
            self.matchMethods[key] = method;
        }
    });
}

FilterableItem.prototype = {
    /**
     *
     * @param {array} needle
     * @param {array|string} haystack
     */
    matchAll: function(needle, haystack) {
        for (var i = 0; i < needle.length; i++) {
            if (haystack.indexOf(needle[i]) === -1)
                return false;
        }
        return true;
    },
    matchAny: function(needle, haystack) {
        for (var i = 0; i < needle.length; i++) {
            if (haystack.indexOf(needle[i]) >= 0)
                return true;
        }
        return false;
    },
    isMatch: function(results) {
        var self = this;
        var allMatch = true;
        $.each(results, function(key, value) {
            if (value && value.length) {
                if (!self.matches.hasOwnProperty(key)) {
                    allMatch = false;
                    return allMatch;
                }
                var method = self.types[key] === 'keyword' ? self.matchAll : self.matchAny;
                method = self.matchMethods.hasOwnProperty(key) ? self.matchMethods[key] : method;
                if (!method.call(self, value, self.matches[key])) {
                    allMatch = false;
                    return allMatch;
                }
            }
        });
        return allMatch;
    }
};
