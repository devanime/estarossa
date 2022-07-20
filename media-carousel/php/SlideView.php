<?php

namespace DevAnime\Estarossa\MediaCarousel;

/**
 * Class SlideView
 * @package DevAnime\Estarossa\MediaCarousel
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 *
 * @property $dimensions
 */
abstract class SlideView extends GalleryItemView
{
    public function __construct(array $properties = [])
    {
        parent::__construct($properties);
        $this->dimensions = apply_filters('media-gallery/slide-size', ['width' => 500, 'height' => 281], $this->type);
        if ($this->dimensions && $this->image instanceof \WP_Image) {
            $this->image
                 ->width($this->dimensions['width'])
                 ->height($this->dimensions['height'])
                 ->css_class('media-carousel__img')
                 ->get_html();
        }
    }
}