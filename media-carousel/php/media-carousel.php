<?php

use DevAnime\Util;

use DevAnime\Estarossa\MediaCarousel\GalleryItemView;

/**
 * Expected:
 * @var GalleryItemView $first
 * @var GalleryItemView[] $slides
 * @var string $caption
 * @var string $info_icon
 * @var string $id
 */
?>
<div <?= Util::componentAttributes('media-carousel') ?>>
    <div class="media-carousel__selection-wrap<?= $first->caption ? ' media-carousel__selection-wrap--caption' : ''; ?>">
        <div id="<?= $id; ?>" class="media-carousel__selection">
            <?= $first; ?>
        </div>
        <button class="media-carousel__selection__toggle-caption"><?= $info_icon; ?></button>
        <div class="media-carousel__selection__caption"></div>
    </div>
    <div class="media-carousel__carousel">
        <div class="media-carousel__slides">
            <?php foreach ($slides as $slide) : ?>
            <?= $slide; ?>
            <?php endforeach; ?>
        </div>
    </div>
</div>
