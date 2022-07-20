Estarossa(function($, _, window, document) {
    var $body = $('body');
    var $modal = $('.modal');
    var addAction = Estarossa.addAction;
    var doAction = Estarossa.doAction;
    var removeAction = Estarossa.removeAction;
    var SHOW_MODAL = 'showModal';
    var HIDE_MODAL = 'hideModal';
    var BUILD_MODAL = 'buildModal';

    $modal.each(function() {
        try {
            var id = this.getAttribute('id');
            $('a[href="#' + id + '"], [data-target="#' + id + '"]').addClass('js-modal-trigger');
        } catch (error) {
        }
    });
    var openOnLoad = function(hash) {
        try {
            if (hash.isset()) {
                var $requestedModal = $modal.filter('#' + hash.currentId);
                if ($requestedModal.length) {
                    doAction(SHOW_MODAL, $requestedModal);
                }
            }
        } catch (error) {}
    };
    var escHandler = function(){
        doAction(HIDE_MODAL, $('.modal--open'));
    };
    var setModalLabel = function($modal) {
        var labelledby = $modal.attr('aria-labelledby');
        var $heading = $modal.find('h1, h2, h3, h4, h5, h6').first();
        if (!$heading.attr('id')) {
            $heading.attr('id', labelledby);
        } else if ($heading.attr('id') !== labelledby) {
            $modal.attr('aria-labelledby', $heading.attr('id'));
        }
    };
    $body.on('click', '.modal', function(e) {
        var $target = $(e.target);
        if ($target.hasClass('modal--open') || $target.hasClass('modal__close') || $target.hasClass('js-modal-trigger')) {
            doAction(HIDE_MODAL, $(this));
        }
    });
    $body.on('click', '.js-modal-trigger', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $target = $($this.data('target')).add($($this.attr('href'))).first();
        doAction(SHOW_MODAL, $target);
    });
    $body.on('click', '.js-modal-builder', function(e) {
        e.preventDefault();
        var $this = $(this);
        var source = $this.data('modal-source');
        var $source = source ? $this.find(source) : $this.children();
        var $target = $($this.data('modal-target'));
        doAction(BUILD_MODAL, $source.clone().removeClass('js-modal-builder'), $target);
    });
    addAction(SHOW_MODAL, function($modal) {
        doAction('focusStateInit', $modal);
        setModalLabel($modal);
        setTimeout(function() {
            $body.addClass('lock-scroll');
        }, 700);
        setTimeout(function() {
            $modal.addClass('modal--open');
            doAction('focusStateActivate');
        }, 50);
        addAction('key.esc', escHandler);
    });
    addAction(HIDE_MODAL, function($modal) {
        removeAction('key.esc', escHandler);
        $body.removeClass('lock-scroll');
        $modal.removeClass('modal--open');
        doAction('focusStateReset');
    });
    addAction(BUILD_MODAL, function($source, $modal) {
        var $content = $modal.find('.modal__content');
        $content.empty().append($source);
        doAction(SHOW_MODAL, $modal);
    });
    addAction(Estarossa.HASH_STATE_CHANGE, openOnLoad);
});
