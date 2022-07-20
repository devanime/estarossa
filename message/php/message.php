<?php
/**
 * Expected:
 * @var string $style
 * @var string $message
 * @var array $link @deprecated
 * @var array $class_modifiers
 * @var array $element_attributes
 */

use DevAnime\Util;
use DevAnime\View\Link;

?>

<div <?= Util::componentAttributes('message', $class_modifiers, $element_attributes); ?>>
    <div class="message__content">
        <?= $message ?>
    </div>
    <?php
    /**
     * Use $message instead to insert links,
     * keeping for backwards compatibility.
     *
     * @deprecated
     **/ ?>
    <?php if (!empty($link)): ?>
        <div class="message__cta">
            <?= Link::createFromField($link); ?>
        </div>
    <?php endif; ?>
    <button class="message__close" type="button" aria-label="Close message"><?= apply_filters('estarossa/close', '&#10005;', 'message', $style); ?></button>
</div>
