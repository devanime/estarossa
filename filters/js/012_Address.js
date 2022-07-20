function Address(groupID) {
    var self = this;
    self.id = groupID;
    self.publish();
    addAction(PUBLISH_FILTER_GROUP_VALUES + self.id, self.update, 20, self);
    $.address.externalChange(self.publish.bind(self));
}

Address.prototype = {
    update: function(values) {
        var self = this;
        var lastPos = $(window).scrollTop();
        $.each(values, function(id, val) {
            $.address.parameter(self.id + '_' + id, val || null);
        });
        $(window).scrollTop(lastPos);
    },
    publish: _.debounce( function() {
        var self = this;
        $.each($.address.parameterNames() || [], function(index, name) {
            var value = decodeURI($.address.parameter(name).split(','));

            name = name.split('_');
            var group = name.shift();
            if (group === self.id) {
                var action = UPDATE_FILTER_SELECTION + [group, name.join('_')].join('/');
                doAction(action, value);
            }
        });
    }, 20)
};
