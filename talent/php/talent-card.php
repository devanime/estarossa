<?php
/**
 * Expected:
 * @var string $title
 * @var WP_Image $headshot
 * @var string $role
 * @var string $bio
 * @var string $type
 * @var array $class_modifiers
 * @var array $element_attributes
 * @var array $scope
 */

use DevAnime\Util;

if (empty($title)) {
    return;
} ?>

<div <?= Util::componentAttributes('talent-card', $class_modifiers, $element_attributes); ?>>
    <?php if ($headshot instanceof WP_Image) : ?>
        <div class="talent-card__image">
            <?= $headshot->css_class('talent-card__headshot'); ?>
        </div>
    <?php endif; ?>
    <?php do_action('talent-card/after-image', $scope); ?>
    <div class="talent-card__content">
        <div class="talent-card__content-inner">
            <div class="talent-card__heading">
                <?php do_action('talent-card/before-title', $scope); ?>
            <?php if ($title instanceof \DevAnime\View\Element): ?>
                <?= $title->addClass('talent-card__title'); ?>
            <?php endif; ?>
                <?php do_action('talent-card/after-title', $scope); ?>
            <?php if ($role) : ?>
                <p class="talent-card__role"><?= $role; ?></p>
            <?php endif; ?>
                <?php do_action('talent-card/after-role', $scope); ?>
            </div>
            <?php if ($bio) : ?>
            <div class="talent-card__bio">
                <?= $bio; ?>
            </div>
            <?php endif; ?>
        </div>
    </div>
</div>
