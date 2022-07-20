function Select($el, filterData) {
    this.init($el, filterData);
    this.$el.change(this.onChange.bind(this));
}

$.extend(Select.prototype, filterBase, {
    onChange: function() {
        var self = this;
        self.value = self.$el.val();
        self.publish();
    },
    set: function(value) {
        this.$el.val(value);
        this.onChange();
    }
});