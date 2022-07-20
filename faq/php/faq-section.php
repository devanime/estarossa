<?php
/**
 * Expected:
 * @var string $title
 * @var PostCollection $faqs
 * @var array $accordion_settings
 * @var array $class_modifiers
 * @var array $element_attributes
 */

// TODO: Refactor to eliminate object instantiation in template

use DevAnime\Models\PostCollection;
use DevAnime\Estarossa\Accordion\AccordionView;
use DevAnime\Util;

if ($faqs->isEmpty()) {
    return;
} ?>

<div <?= Util::componentAttributes('faq-section', $class_modifiers, $element_attributes); ?>>
    <h2 class="faq-card__title"><?= $title; ?></h2>
    <?= AccordionView::createFromPostCollection($faqs, $accordion_settings); ?>
</div>
