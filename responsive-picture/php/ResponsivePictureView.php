<?php

namespace DevAnime\Estarossa\ResponsivePicture;

use DevAnime\View\TemplateView;
use WP_Image;

/**
 * Class ResponsivePictureView
 * @package DevAnime\Estarossa\ResponsivePicture
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string $base_image_id
 * @property PictureSourceCollection $collection
 * @property array $class_modifiers
 * @property array $element_attributes
 */
class ResponsivePictureView extends TemplateView
{
    protected $default_template = __DIR__ . '/responsive-picture';
    protected $name = 'responsive-picture';

    public function __construct(WP_Image $base_image = null, PictureSourceCollection $collection = null, $lazy = true)
    {
        $properties = wp_parse_args(compact('base_image', 'collection'), [
            'base_image' => null,
            'collection' => null,
            'lazy' => $lazy,
            'class_modifiers' => [$lazy ? 'loading' : null],
            'element_attributes' => []
        ]);
        parent::__construct($properties);
    }

    /**
     * @param string|int $base_image_id
     * @param PictureSourceCollection $collection
     * @param bool $lazy
     * @return ResponsivePictureView
     */
    public static function create($base_image_id, PictureSourceCollection $collection, $lazy = true)
    {
        $base_image = WP_Image::get_by_attachment_id($base_image_id) ?: null;
        return new static($base_image, $collection, $lazy);
    }

    /**
     * Pull in CMS data. DEPRECATED, use createFromBreakpoints() instead
     * NOTE: Assumes desktop image is REQUIRED.
     *
     * @param array $config
     * @return ResponsivePictureView
     * @deprecated
     */
    public static function createFromConfig(array $config)
    {
        $sources = [];
        $defaults = [
            'desktop_image' => '',
            'tablet_image' => '',
            'mobile_image' => '',
            'lazy' => true
        ];
        $config = wp_parse_args($config, $defaults);
        if (!empty($config['mobile_image'])) {
            $sources[] = PictureSource::createFromImage($config['mobile_image'], MediaQuery::createMaximum(NamedViewportValue::mobile()));
        }
        if (!empty($config['tablet_image'])) {
            $sources[] = PictureSource::createFromImage($config['tablet_image'], MediaQuery::createMaximum(NamedViewportValue::tablet()));
        }
        return new static(
            $config['desktop_image'],
            new PictureSourceCollection($sources),
            $config['lazy']
        );
    }

    /**
     * Set images based on defined breakpoints
     *
     * Format:
     *
     * $breakpoints = [
     *    'default' => $mobile_image,
     *    'md' => $tablet_image,
     *    'lg' => $desktop_image
     * ]
     *
     * @param WP_Image[] $breakpoints
     * @param bool $lazy
     * @return ResponsivePictureView
     *
     */
    public static function createFromBreakpoints(array $breakpoints, $lazy = true)
    {
        $sources = [];
        $breakpoints = array_filter($breakpoints, function($image, $key) {
            return $image instanceof WP_Image && BreakpointValue::isDefinedKey($key);
        }, ARRAY_FILTER_USE_BOTH);
        uksort($breakpoints, function($a, $b) {
            return BreakpointValue::get($b) <=> BreakpointValue::get($a);
        });
        $fallback = reset($breakpoints);
        foreach ($breakpoints as $key => $image) {
            $sources[$key] = PictureSource::createFromImage($image, MediaQuery::createMinimum(new BreakpointValue($key)));
        }
        $view = new static(
            $fallback,
            new PictureSourceCollection($sources),
            $lazy
        );
        $aspect_ratio_css = [];
        foreach ($sources as $key => $source) {
            $aspect_ratio_css[] = sprintf(
                '--rp-aspect-ratio-%s: %f', $key, $source->getAspectRatio()
            );
        }
        $attr = $view->element_attributes;
        $attr['style'] = implode(';', $aspect_ratio_css);
        $view->element_attributes = $attr;
        return $view;
    }
}
