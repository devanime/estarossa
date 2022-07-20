<?php

namespace DevAnime\Estarossa\Talent;

use DevAnime\Producers\Talent\TalentPost;
use DevAnime\View\Component;
use DevAnime\View\Element;
use WP_Image;

/**
 * Class TalentCardView
 * @package DevAnime\Estarossa\Talent
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string $tag
 * @property string $title
 * @property \WP_Image $headshot
 * @property string $role
 * @property string $bio
 * @property string $type
 */
class TalentCardView extends Component
{
    const DEFAULT_TAG = 'h3';

    protected $name = 'talent-card';
    protected static $default_properties = [
        'tag' => 'h3',
        'title' => '',
        'headshot' => false,
        'role' => '',
        'bio' => '',
        'type' => ''
    ];

    public function __construct(TalentPost $TalentPost)
    {
        parent::__construct(apply_filters('estarossa/talent/scope', [
            'title' => $TalentPost->title(),
            'headshot' => apply_filters('estarossa/talent/headshot', $TalentPost->headshot, $TalentPost->title(), $TalentPost->type_slug),
            'role' => $TalentPost->role,
            'bio' => $TalentPost->bio,
            'type' => $TalentPost->type_slug
        ], $TalentPost));
        if (! $this->headshot instanceof WP_Image) {
            $this->classModifiers('no-image');
        }
        if ($this->title) {
            $this->title = Element::create($this->tag ?: static::DEFAULT_TAG, $this->title);
        }
        if ($this->type) {
            $this->classModifiers($this->type);
        }
    }

}
