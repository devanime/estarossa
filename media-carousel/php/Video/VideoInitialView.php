<?php
/**
 * Class VideoInitialView
 * @package DevAnime\Estarossa\MediaCarousel
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\MediaCarousel\Video;

use DevAnime\Estarossa\MediaCarousel\GalleryItemView;

class VideoInitialView extends GalleryItemView
{
    protected $name = 'video-initial';
    protected $parent_name = 'media-carousel';
    protected $default_template = __DIR__ . '/video-initial';

    public function __construct(array $properties = [])
    {
        parent::__construct($properties);
        $this->caption = '';
    }
}