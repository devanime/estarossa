<?php

namespace DevAnime\Estarossa\MediaCarousel;

use DevAnime\Producers\MediaGallery\GalleryItem;
use DevAnime\Producers\MediaGallery\MediaGalleryPost;
use DevAnime\Estarossa\MediaCarousel\Video;
use DevAnime\Estarossa\MediaCarousel\Photo;
use DevAnime\View\ComponentView;

/**
 * @property array $slides
 */
class MediaCarouselView extends ComponentView
{
    protected $name = 'media-carousel';
    protected $default_template = __DIR__ . '/media-carousel';
    protected static $info_icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.3 47.9"><path fill="currentColor" d="M18.3 47.9H.4v-7h4.3V22.5H0v-7.1h14v25.5h4.3v7zM4.3 9.6V0h9.3v9.6H4.3z"/></svg>';
    protected static $first_classmap = [
        'video' => Video\VideoInitialView::class,
        'photo' => Photo\PhotoInitialView::class
    ];
    protected static $slide_classmap = [
        'video' => Video\VideoSlideView::class,
        'photo' => Photo\PhotoSlideView::class
    ];
    protected static $id = 0;

    public static function createFromGalleryPost(MediaGalleryPost $gallery_post)
    {
        if (empty($gallery_post->gallery)) {
            return false;
        }
        $id = 'media-carousel-' . static::getId();
        /** @var GalleryItem $first_item */
        $first_item = clone $gallery_post->gallery[0];
        $classname = static::$first_classmap[$first_item->getType()];
        $first = $classname::createFromGalleryItem($first_item, $id);
        $slides = $gallery_post->gallery->map(function(GalleryItem $item) use ($id) {
            $classname = static::$slide_classmap[$item->getType()];
            return $classname::createFromGalleryItem($item, $id);
        });
        $info_icon = apply_filters('media-carousel/info-icon', static::$info_icon);

        return new static(compact('first', 'slides', 'caption', 'info_icon', 'id'));
    }

    protected static function getId()
    {
         return ++static::$id;
    }
}
