<?php

use DevAnime\Support\DateTime;
use DevAnime\View\Element;
use DevAnime\View\Link;

/**
 * Expected:
 * @var string   $id
 * @var string   $modal_id
 * @var string   $modal_style
 * @var string   $heading
 * @var string   $heading_el
 * @var string   $heading_class
 * @var string   $image
 * @var string   $message
 * @var string   $link
 * @var string   $link_class
 * @var DateTime $start
 * @var DateTime $end
 * @var string   $expiry
 */

?>
<div class="message-modal<?= empty($image) ? '' : ' message-modal--has-image'; ?>">
    <?php if (! empty($image)): ?>
        <div class="message-modal__image"><?= $image; ?></div>
    <?php endif; ?>
    <div class="message-modal__content">
        <?php if ($heading): ?>
            <?= Element::create($heading_el, $heading, ['class' => $heading_class]); ?>
        <?php endif; ?>
        <?= $message ?>
        <?php if (! empty($link)): ?>
            <div class="message-modal__cta">
                <?= (Link::createFromField($link))->addClass($link_class); ?>
            </div>
        <?php endif; ?>
    </div>
</div>


