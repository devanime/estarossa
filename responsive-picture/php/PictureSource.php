<?php

namespace DevAnime\Estarossa\ResponsivePicture;

use DevAnime\View\Element;
use WP_Image;

/**
 * Class PictureSource
 * @package DevAnime\Estarossa\ResponsivePicture
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */
class PictureSource
{
    protected $source_url;
    protected $media_query;
    protected $aspect_ratio;

    public function __construct(string $source_url, MediaQuery $media_query, float $aspect_ratio = 1.0)
    {
        $this->source_url = $source_url;
        $this->media_query = $media_query;
        $this->aspect_ratio = $aspect_ratio;
    }

    /**
     * @param string $image_id
     * @param MediaQuery $media_query
     * @return PictureSource
     */
    public static function createFromImageId(string $image_id, MediaQuery $media_query)
    {
        $image = WP_Image::get_by_attachment_id($image_id);
        return $image ?
            static::createFromImage($image, $media_query) :
            new static('', $media_query);
    }

    /**
     * @param WP_Image $image
     * @param MediaQuery $media_query
     * @return PictureSource
     */
    public static function createFromImage(WP_Image $image, MediaQuery $media_query)
    {
        return new static($image->url, $media_query, $image->height / $image->width);
    }

    public function getSourceUrl(): string
    {
        return $this->source_url;
    }

    public function getMediaQuery(): MediaQuery
    {
        return $this->media_query;
    }

    public function getAspectRatio(): float
    {
        return $this->aspect_ratio;
    }

    public function getPreloadLink()
    {
        return Element::create('link')->attributes([
            'rel' => 'preload',
            'as' => 'image',
            'href' => $this->source_url,
            'media' => $this->media_query
        ]);
    }
}
