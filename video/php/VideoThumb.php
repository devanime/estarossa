<?php
/**
 * Class VideoThumb
 * @package DevAnime\Estarossa\Video
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Video;

use DevAnime\Producers\Video\VideoPost;
use DevAnime\Producers\VideoProducer;
use DevAnime\View\ComponentView;

class VideoThumb extends ComponentView
{
    protected $default_template = __DIR__ . '/video-thumb';
    protected $name = 'video-thumb';

    public function __construct($properties = [], $el_attr = [])
    {
        if (is_string($properties)) {
            $properties = ['video_id' => $properties];
        }
        $defaults = [
            'video_id'     => '',
            'thumbnail'    => false,
            'target_id'    => '#',
            'match_aspect' => true,
            'thumbnail_brightness' => null,
            'el_attr'      => $el_attr
        ];
        $properties = wp_parse_args($properties, $defaults);
        parent::__construct($properties);
    }

    public static function createFromVideoPost(
        VideoPost $videoPost,
        $target_id = false,
        $match_aspect = true,
        $video_options = [],
        $props = []
    ) {
        VideoProducer::cacheVideo($videoPost);
        $properties = array_merge([
            'video_id'     => $videoPost->ID,
            'target_id'    => $target_id,
            'match_aspect' => $match_aspect,
            'thumbnail_brightness' => $videoPost->thumbnail_brightness
        ], $props);
        $el_attr = array_merge(
            $props['el_attr'] ?? [],
            $video_options ? ['data-video-options' => json_encode($video_options)] : []
        );
        $properties['el_attr'] = $el_attr;

        return new static($properties);
    }
}
