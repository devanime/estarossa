function MessageModal(data) {
    this.modalID = data.modalID;
    this.$modal = jQuery('#' + this.modalID);
    this.trigger = data.trigger;
    this.delay = data.delay;
    this.scrollDistance = data.scrollDistance || 5;
    this.showed = false;
    this.messageCookie = new MessageCookie(data.id, data.start, data.end, data.expiry);
    if (this.messageCookie.isValid() && this.$modal.length) {
        this.show();
    } else {
        // this._remove();
    }
}

MessageModal.prototype = {
    show: function () {
        var self = this;
        var delay = self.trigger === 'time' ? self.delay * 1000 : 500;
        if (self.trigger === 'scroll' && jQuery(document).height() > Estarossa.viewport.height()) {
            Estarossa.addAction('scroll', self._onScroll, 10, self);
        } else {
            setTimeout(self._show.bind(self), delay);
        }
    },
    _onScroll: function (e, scrollPos) {
        var self = this;
        var vh = Estarossa.viewport.height();
        var docHeight = jQuery(document).height();
        if (scrollPos.top / (docHeight - vh) * 100 >= self.scrollDistance && !self.showed) {
            self.showed = true;
            setTimeout(function () {
                Estarossa.removeAction('scroll', self._onScroll, self);
                self._show();
            }, 0);
        }
    },
    _show: function () {
        var self = this;
        self.showed = true;
        Estarossa.doAction('showModal', self.$modal);
        self.$modal.one('click', function () {
            self.messageCookie.setCookie();
        });
    },
    _remove: function () {
        this.$modal.remove();
    }
};
