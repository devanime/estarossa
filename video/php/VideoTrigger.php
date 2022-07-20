<?php
/**
 * Class VideoTrigger
 * @package DevAnime\Estarossa\Video
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Video;

use DevAnime\Producers\Video\VideoPost;
use DevAnime\Producers\VideoProducer;
use DevAnime\View\ComponentView;

class VideoTrigger extends ComponentView
{
    protected $default_template = __DIR__ . '/video-trigger';
    protected $name = 'video-trigger';

    public function __construct($properties, $text = '', $el_attr = [])
    {
        $defaults = [
            'video_id'  => '',
            'target_id' => '#',
            'el_attr'   => $el_attr,
            'text'      => $text
        ];
        $properties = wp_parse_args($properties, $defaults);
        parent::__construct($properties);
    }

    public static function createFromVideoPost(VideoPost $videoPost, $target_id, $text = '', $attr = [])
    {
        VideoProducer::cacheVideo($videoPost);

        return new static([
            'video_id'  => $videoPost->ID,
            'target_id' => $target_id,
        ], $text, $attr);
    }
}