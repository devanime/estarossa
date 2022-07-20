<?php
/**
 * Expected:
 * @var WP_Image $image
 * @var string   $caption
 * @var string   $target
 */
?>
<figure class="media-carousel__slide media-carousel__slide--photo">
    <a href="#<?= $target; ?>" class="media-carousel__link"
        data-image-id="<?= $image->ID; ?>" data-gtm="0">
        <?= $image; ?>
    </a>
    <?php if ($caption): ?>
        <figcaption class="media-carousel__caption">
            <?= $caption; ?>
        </figcaption>
    <?php endif; ?>
</figure>
