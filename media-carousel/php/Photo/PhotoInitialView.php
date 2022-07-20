<?php
/**
 * Class PhotoInitialView
 * @package DevAnime\Estarossa\MediaCarousel
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\MediaCarousel\Photo;

use DevAnime\Estarossa\MediaCarousel\GalleryItemView;

class PhotoInitialView extends GalleryItemView
{
    protected $name = 'photo-initial';
    protected $parent_name = 'media-carousel';
    protected $default_template = __DIR__ . '/photo-initial';
}