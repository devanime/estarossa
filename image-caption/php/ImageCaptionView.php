<?php

namespace DevAnime\Estarossa\ImageCaption;

use DevAnime\View\TemplateView;
use WP_Image;

/**
 * Class ImageCaptionView
 * @package DevAnime\Estarossa\ImageCaption
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string image_id
 * @property WP_Image $image
 * @property string $caption
 */
class ImageCaptionView extends TemplateView
{
    protected $name = 'image-caption';
    protected $default_template = __DIR__ . '/image-caption.php';
    protected static $width = false;

    public function __construct($atts)
    {
        parent::__construct($atts);
        if ($this->image_id) {
            $this->image = WP_Image::get_by_attachment_id($this->image_id);
        }
        if ($this->image instanceof WP_Image) {
            if (static::$width) {
                $this->image->width(static::$width);
            }
            $this->caption = $this->caption ?: $this->image->caption;
        }
    }

    /**
     * @param string $image_id
     * @param string $caption
     * @param array $class_modifiers
     * @param array $element_attributes
     * @return ImageCaptionView
     */
    public static function create(string $image_id, string $caption, array $class_modifiers = [], array $element_attributes = [])
    {
        return new static(compact('image_id', 'caption', 'class_modifiers', 'element_attributes'));
    }

    /**
     * @param string $image_id
     * @param array $class_modifiers
     * @param array $element_attributes
     * @return ImageCaptionView
     */
    public static function createFromImage(string $image_id, array $class_modifiers = [], array $element_attributes = [])
    {
        return new static(compact('image_id', 'class_modifiers', 'element_attributes'));
    }

    public static function setWidth(string $width)
    {
        return static::$width = $width;
    }
}
