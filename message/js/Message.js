function Message($el) {
    this.$el = $el;
    this.$el.find('.message__close').click(this.close.bind(this));
    this.id = this.$el.data('id');
    this.messageCookie = new MessageCookie(
        this.id, this.$el.data('start'), this.$el.data('end'), this.$el.data('expiry')
    );

    if (this.messageCookie.isValid()) {
        this.show();
    } else {
        this._remove();
    }
}

Message.prototype = {
    close: function () {
        this.messageCookie.setCookie();
        this._remove();
    },
    show: function () {
        this.$el.addClass('message--show');
    },
    _remove: function () {
        this.$el.remove();
        this.$el = false;
    }
};
