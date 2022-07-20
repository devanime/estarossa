<?php
/**
 * Expected:
 * @var ContentBlockViewCollection|array $blocks
 * @var array $class_modifiers
 * @var array $element_attributes
 */
use DevAnime\Estarossa\ContentBlock\ContentBlockViewCollection;
use DevAnime\Util;
if (empty($blocks)) {
    return;
} ?>

<div <?= Util::componentAttributes('content-block-list', $class_modifiers, $element_attributes); ?>>
    <?php foreach($blocks as $block): ?>
        <?= $block; ?>
    <?php endforeach; ?>
</div>
