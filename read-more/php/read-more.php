<?php
/**
 * Expected:
 * @var string $display
 * @var string $expanded
 * @var string $button_text
 * @var string $aria_label
 * @var array $icon_properties
 * @var array $class_modifiers
 * @var array $element_attributes
 */

use DevAnime\Util;
use DevAnime\Estarossa\Icon\IconView;

if (!$expanded) {
    echo $display;
    return;
}

$icon_properties = array_merge($icon_properties, ['classes' => 'read-more__icon']);
?>

<div <?= Util::componentAttributes('read-more', $class_modifiers, $element_attributes); ?>>
    <?= $display; ?>
    <div class="read-more__content">
        <?= $expanded; ?>
    </div>
    <button class="read-more__button js-read-more" aria-label="<?= $aria_label ?>">
        <span class="read-more__button-text"><?= $button_text; ?></span>
        <?php if (! empty($icon_properties['icon_name'])): ?>
            <?= new IconView($icon_properties); ?>
        <?php endif; ?>
    </button>
</div>

