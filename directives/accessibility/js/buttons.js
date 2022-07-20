Estarossa(function($) {
    $('[data-button]').each(function() {
        var $this = $(this);
        if (!$this.attr('role')) {
            $this.attr('role', 'button');
        }
        if (!$this.attr('tabindex')) {
            $this.attr('tabindex', '0');
        }
        if (!$this.attr('aria-label') && $this.data('button')) {
            $this.attr('aria-label', $this.data('button'));
        }
        $this.keypress(function(e) {
            if (e.which === 13 || e.which === 32) {
                e.preventDefault();
                $(this).click();
            }
        });
    });
});
