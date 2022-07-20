function Radio($el, filterData) {
    var self = this;
    self.init($el, filterData);
    self.$el.on('change', self.onChange.bind(self));
}

$.extend(Radio.prototype, filterBase, {
    onChange: function() {
        var self = this;
        self.value = self.$el.filter(':checked').val();
        self.publish();
    },
    set: function(value) {
        var self = this;
        self.$el.each(function() {
            this.checked = value === this.value;
        });
        self.onChange();
    }
});