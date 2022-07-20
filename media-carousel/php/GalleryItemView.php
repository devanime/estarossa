<?php

namespace DevAnime\Estarossa\MediaCarousel;
use DevAnime\Producers\MediaGallery\GalleryItem;
use DevAnime\View\ComponentView;

/**
 * Class GalleryItemView
 * @package DevAnime\Estarossa\MediaCarousel
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 *
 * @property $type
 * @property $item
 * @property \WP_Image $image
 * @property $caption
 * @property $target
 * @property $dimensions
 */
abstract class GalleryItemView extends ComponentView
{
    public static function createFromGalleryItem(GalleryItem $item, string $target_id)
    {
        return new static([
            'type' => $item->getType(),
            'item' => $item->getItem(),
            'image' => clone $item->getImage(),
            'caption' => $item->getCaption(),
            'target' => $target_id
        ]);
    }

}