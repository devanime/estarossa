<?php

namespace DevAnime\Estarossa\LazyImage;

use DevAnime\View\ComponentView;

/**
 * Class LazyImageView
 * @package DevAnime\Estarossa\LazyImage
 *
 * @property \WP_Image $image
 * @property float $aspect_ratio
 * @property array $data_attributes
 * @property array $attributes
 */
class LazyImageView extends ComponentView
{
    protected $default_template = __DIR__ . '/lazy-image';
    protected $name = 'lazy-image';

    public function __construct($attributes = [])
    {
        parent::__construct($attributes);
        $image_attributes = [
            'class' => implode(' ', array_filter(['lazy-image', $this->image->css_class])),
            'data-lazy-image' => array_filter([
                'src' => $this->image->url,
                'alt' => $this->image->alt,
                'width' => $this->image->width,
                'height' => $this->image->height,
                'style' => $this->image->attr('style')
            ]),
            'style' => sprintf('padding-bottom: %f%%;', $this->aspect_ratio)
        ];
        foreach ($this->data_attributes as $key => $value) {
            $data_key = 'data-' . str_replace('_', '-', $key);
            $image_attributes['data-lazy-image'][$data_key] = $value;
        }
        $image_attributes['data-lazy-image'] = json_encode($image_attributes['data-lazy-image']);
        $this->attributes = $image_attributes;
    }

    public static function create(\WP_Image $image, $data_attributes = [])
    {
        $image();
        $data_attributes = array_filter($data_attributes);
        $aspect_ratio = ($image->height && $image->width) ? $image->height / $image->width * 100 : 0;
        return new static(compact('image', 'aspect_ratio', 'data_attributes'));
    }

}
