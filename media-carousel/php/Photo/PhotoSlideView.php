<?php
/**
 * Class PhotoSlideView
 * @package DevAnime\Estarossa\MediaCarousel
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\MediaCarousel\Photo;

use DevAnime\Estarossa\MediaCarousel\SlideView;

class PhotoSlideView extends SlideView
{
    protected $name = 'photo-slide';
    protected $parent_name = 'media-carousel';
    protected $default_template = __DIR__ . '/photo-slide';
    protected static $images = [];
    protected static $first_run = true;

    public function __construct(array $properties = [])
    {
        parent::__construct($properties);
        if (static::$first_run) {
            add_action('wp_footer', [$this, 'listImages']);
            static::$first_run = false;
        }
        $image = clone $this->image;
        $dimensions = apply_filters('media-gallery/selection-size', ['width' => 1120, 'height' => 630], $this->type);
        if ($dimensions) {
            $image->width($dimensions['width'])->height($dimensions['height']);
        }
        static::$images[$image->ID] = $image->get_html();
    }

    public function listImages()
    {
        echo '<script>var mediaCarouselImages = ' . json_encode(static::$images) . '</script>';
    }
}