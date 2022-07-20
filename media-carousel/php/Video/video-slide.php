<?php

use DevAnime\Producers\Video\VideoPost;
use DevAnime\Estarossa\Video\VideoThumb;

/**
 * Expected:
 * @var VideoPost $item
 * @var WP_Image $image
 * @var string    $caption
 * @var string    $target
 */
$thumb = VideoThumb::createFromVideoPost($item, '#' . $target, false, false,
    [
        'el_attr' => [
            'class'            => 'video-thumb media-carousel__link',
            'data-video-thumb' => $image->url,
            'data-gtm' => 0
        ]
    ]
);
?>

<figure class="media-carousel__slide media-carousel__slide--video">
    <?= $thumb; ?>
    <?php if ($caption): ?>
        <figcaption class="media-carousel__caption">
            <?= $caption; ?>
        </figcaption>
    <?php endif; ?>
</figure>
