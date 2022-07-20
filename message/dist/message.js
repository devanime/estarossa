function Message($el) {
    this.$el = $el;
    this.$el.find(".message__close").click(this.close.bind(this));
    this.id = this.$el.data("id");
    this.messageCookie = new MessageCookie(this.id, this.$el.data("start"), this.$el.data("end"), this.$el.data("expiry"));
    if (this.messageCookie.isValid()) {
        this.show()
    } else {
        this._remove()
    }
}
Message.prototype = {
    close: function() {
        this.messageCookie.setCookie();
        this._remove()
    },
    show: function() {
        this.$el.addClass("message--show")
    },
    _remove: function() {
        this.$el.remove();
        this.$el = false
    }
};

function MessageCookie(id, start, end, expiry) {
    this.id = id;
    this.start = this._getTime(start);
    this.end = this._getTime(end);
    this.expiry = parseInt(expiry);
    this.now = dayjs();
    if (this.expiry) {
        this.expiry = dayjs().add(this.expiry, "s")
    }
    this.cookie = "message-" + this.id;
    if (this._expiryMismatch()) {
        this.setCookie()
    }
}
MessageCookie.prototype = {
    _getTime: function(str) {
        if (str) {
            var time = dayjs(str);
            if (dayjs.isDayjs(time)) {
                return time
            }
        }
        return false
    },
    setCookie: function() {
        var isSession = !dayjs.isDayjs(this.expiry);
        var expiry = isSession ? false : {
            expires: this.expiry.toDate()
        };
        var value = isSession ? this.cookie : this.expiry.toISOString();
        Cookies.set(this.cookie, value, expiry)
    },
    isValid: function() {
        var valid = true;
        if (this.start && this.now.isBefore(this.start) || this.end && this.now.isAfter(this.end) || Cookies.get(this.cookie)) {
            valid = false
        }
        return valid
    },
    _expiryMismatch: function() {
        var cookie = Cookies.get(this.cookie);
        if (cookie && cookie !== this.cookie) {
            var expiry = dayjs(cookie);
            if (dayjs.isDayjs(expiry) && expiry.isAfter(this.expiry)) {
                return true
            }
        }
        return false
    }
};

function MessageModal(data) {
    this.modalID = data.modalID;
    this.$modal = jQuery("#" + this.modalID);
    this.trigger = data.trigger;
    this.delay = data.delay;
    this.scrollDistance = data.scrollDistance || 5;
    this.showed = false;
    this.messageCookie = new MessageCookie(data.id, data.start, data.end, data.expiry);
    if (this.messageCookie.isValid() && this.$modal.length) {
        this.show()
    } else {}
}
MessageModal.prototype = {
    show: function() {
        var self = this;
        var delay = self.trigger === "time" ? self.delay * 1e3 : 500;
        if (self.trigger === "scroll" && jQuery(document).height() > Estarossa.viewport.height()) {
            Estarossa.addAction("scroll", self._onScroll, 10, self)
        } else {
            setTimeout(self._show.bind(self), delay)
        }
    },
    _onScroll: function(e, scrollPos) {
        var self = this;
        var vh = Estarossa.viewport.height();
        var docHeight = jQuery(document).height();
        if (scrollPos.top / (docHeight - vh) * 100 >= self.scrollDistance && !self.showed) {
            self.showed = true;
            setTimeout(function() {
                Estarossa.removeAction("scroll", self._onScroll, self);
                self._show()
            }, 0)
        }
    },
    _show: function() {
        var self = this;
        self.showed = true;
        Estarossa.doAction("showModal", self.$modal);
        self.$modal.one("click", function() {
            self.messageCookie.setCookie()
        })
    },
    _remove: function() {
        this.$modal.remove()
    }
};
Estarossa(Estarossa.READY, function($, _, window, document) {
    var addFilter = Estarossa.addFilter;
    var $messages = $(".message").filter(function() {
        var message = new Message($(this));
        return message.$el
    });
    if ($messages.length) {
        addFilter("stickyHeader/triggerHeight", function(val) {
            var height = $messages.first().height() || 0;
            height = height ? height + 20 : 0;
            return val + height
        }, 5);
        addFilter("css-vars/register", function(styles) {
            styles["navburger-top"] = function() {
                return "40px"
            };
            return styles
        }, 20)
    }
    if (window.messageModalData) {
        var modal_config_scripts = window.messageModalData;
        if (Array.isArray(modal_config_scripts)) {
            modal_config_scripts.forEach(function(item, index) {
                new MessageModal(item)
            })
        } else {
            new MessageModal(modal_config_scripts)
        }
    }
});