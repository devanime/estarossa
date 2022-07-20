<?php

use DevAnime\View\Element;
use DevAnime\Util;

/**
 * Expected:
 * @var string $headline
 * @var string $content
 * @var Element $headline_element
 * @var string $headline_content
 * @var string $icon
 * @var array  $class_modifiers
 * @var array  $element_attributes
 */

$button = Element::create(
    'button',
    $headline_content . $icon,
    ['class' => 'accordion-panel__button', 'aria-expanded' => 'false']
);
$element_attributes['id'] = sanitize_title($headline);
if ($headline_element) {
    $headline_content = $headline_element->addClass('accordion-panel__heading')->content($button);
}
?>

<div <?= Util::componentAttributes('accordion-panel', $class_modifiers, $element_attributes); ?>>
    <?= $headline_content ?>
    <div class="accordion-panel__content">
        <?= $content; ?>
    </div>
</div>
