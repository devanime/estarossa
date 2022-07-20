<?php
use DevAnime\Util;
/**
 * Expected:
 * @var string $icon_name
 * @var array $classes
 * @var array $element_attributes
 * @var array $svg_attr
 */

$element_attributes = array_merge(['class' => $classes], $element_attributes);
 ?>

<span <?= Util::arrayToAttributes($element_attributes); ?>>
    <svg <?= Util::arrayToAttributes($svg_attr); ?>><use class="icon-use" xlink:href="#<?= $icon_name; ?>"></use></svg>
</span>
