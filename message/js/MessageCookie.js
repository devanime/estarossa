function MessageCookie(id, start, end, expiry) {
    this.id = id;
    this.start = this._getTime(start);
    this.end = this._getTime(end);
    this.expiry = parseInt(expiry);
    this.now = dayjs();
    if (this.expiry) {
        this.expiry = dayjs().add(this.expiry, 's');
    }
    this.cookie = 'message-' + this.id;
    if (this._expiryMismatch()) {
        this.setCookie();
    }
}

MessageCookie.prototype = {
    _getTime: function(str) {
        if (str) {
            var time = dayjs(str);
            if (dayjs.isDayjs(time)) {
                return time;
            }
        }
        return false;
    },
    setCookie: function() {
        var isSession = !dayjs.isDayjs(this.expiry);
        var expiry = isSession ? false : {
            expires: this.expiry.toDate()
        };
        var value = isSession ? this.cookie : this.expiry.toISOString();
        Cookies.set(this.cookie, value, expiry);
    },
    isValid: function() {
        var valid = true;
        if ((this.start && this.now.isBefore(this.start)) ||
            (this.end && this.now.isAfter(this.end)) ||
            (Cookies.get(this.cookie))
        ) {
            valid = false;
        }
        return valid;
    },
    /**
     * Determine if a previous message with longer expiration was set
     * @return {boolean}
     * @private
     */
    _expiryMismatch: function() {
        var cookie = Cookies.get(this.cookie);
        if (cookie && cookie !== this.cookie) {
            var expiry = dayjs(cookie);
            if (dayjs.isDayjs(expiry) && expiry.isAfter(this.expiry)) {
                return true;
            }
        }
        return false;
    }
};
