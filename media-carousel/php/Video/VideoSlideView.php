<?php
/**
 * Class VideoSlideView
 * @package DevAnime\Estarossa\MediaCarousel
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\MediaCarousel\Video;

use DevAnime\Estarossa\MediaCarousel\SlideView;

class VideoSlideView extends SlideView
{
    protected $name = 'video-slide';
    protected $parent_name = 'media-carousel';
    protected $default_template = __DIR__ . '/video-slide';

    public function __construct(array $properties = [])
    {
        parent::__construct($properties);
        $this->caption = apply_filters('estarossa/media-carousel/caption', $this->caption);
    }
}
