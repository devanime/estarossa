<?php
/**
 * Expected:
 * @var string $headline
 * @var array $ticketing_tips
 * @var array $additional_tips
 * @var array $class_modifiers
 * @var array $element_attributes
 */

use DevAnime\Estarossa\ContentBlock\ContentBlockView;
use DevAnime\Util; ?>

<section <?= Util::componentAttributes('calendar-container', $class_modifiers, $element_attributes); ?>>
    <?php if ($headline) : ?>
        <div class="calendar-container__headline">
            <?= $headline; ?>
        </div>
    <?php endif; ?>
    <div class="calendar-container__container">
        <div class="calendar-container__column">
            <?= do_shortcode('[ticket-calendar]'); ?>
        </div>
        <?php if (!empty($ticketing_tips) && !empty($additional_tips)): ?>
            <div class="calendar-container__column">
                <?php if (!empty($ticketing_tips)) : ?>
                    <div class="calendar-container__ticketing-tips">
                        <?php foreach ($ticketing_tips as $ContentBlock): ?>
                            <?= ContentBlockView::createFromContentBlock($ContentBlock); ?>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
                <?php if (!empty($additional_tips)) : ?>
                    <div class="calendar-container__additional-tips">
                        <?php foreach ($additional_tips as $ContentBlock): ?>
                            <?= ContentBlockView::createFromContentBlock($ContentBlock); ?>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
