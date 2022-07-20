<?php
/**
 * Expected:
 * @var Element $headline
 * @var string $tagline
 * @var string $content
 * @var array $cta
 * @var array $class_modifiers
 * @var array $element_attributes
 */

use DevAnime\Util;
use DevAnime\View\Element;

if ( !empty($cta['url']) ) {
    $cta_btn = Element::create('div', Util::acfLinkToEl($cta), ['class'=>'content-block__cta-container'] );
    $class_modifiers[] = 'has-btn';
} ?>

<div <?= Util::componentAttributes('content-block', $class_modifiers, $element_attributes); ?>>
    <?php if ($headline instanceof Element) : ?>
        <?= $headline->addClass('content-block__headline'); ?>
    <?php endif; ?>
    <?php if ($tagline) : ?>
        <p class="content-block__tagline"><?= $tagline; ?></p>
    <?php endif; ?>
    <?php if ($content) : ?>
        <div class="content-block__content">
            <?= $content; ?>
        </div>
    <?php endif; ?>
    <?= $cta_btn; ?>
</div>
