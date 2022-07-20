function Checkbox($el, filterData) {
    var self = this;
    self.init($el, filterData);
    self.$el.on('change', self.onChange.bind(self));
}

$.extend(Checkbox.prototype, filterBase, {
    onChange: function() {
        var self = this;
        self.value = self.$el.filter(':checked').map(function() { return this.value; }).get() || [];
        self.publish();
    },
    set: function(values) {
        var self = this;
        self.$el.each(function() {
            this.checked = values.split(',').indexOf(this.value) >= 0;
        });
        self.onChange();
    },
    onParent: function(value) {
        var self = this;
        self.$el.each(function() {
            var $this = $(this);
            var $container = $this.parents('[data-parent]');
            var found = value.indexOf($container.data('parent').toString()) > -1;
            $container.toggleClass('filters--hide', !found);
            if (!found) {
                $this.prop('checked', false);
            }
        });
        self.onChange();
    }
});
