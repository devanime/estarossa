function TextInput($el, filterData) {
    this.init($el, filterData);
    this.$el.on('input propertychange', this.onChange.bind(this));
}

$.extend(TextInput.prototype, filterBase, {
    onChange: function() {
        var self = this;
        var value = self.$el.val();
        self.value = value.length >= self.config['min_characters'] ? value : '';
        self.publish();
    },
    set: function(value) {
        var self = this;
        self.$el.val(value);
        self.onChange();
    }
});