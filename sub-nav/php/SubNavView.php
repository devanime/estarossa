<?php

namespace DevAnime\Estarossa\SubNav;
use DevAnime\View\ComponentView;

/**
 * Class SubNavView
 * @package DevAnime\Estarossa\SubNavView
 *
 * @property $items
 * @property $config
 */
class SubNavView extends ComponentView
{
    protected $default_template = __DIR__ . '/sub-nav';
    protected $name = 'sub-nav';

    const WIDE_MIN = 4;

    public function __construct($properties)
    {
        parent::__construct($properties);
        if (empty($this->config)) {
            $this->config = ['default'];
        }
        if (count($this->items) >= static::WIDE_MIN) {
            $this->config = array_merge($this->config, ['wide']);
        }
        $items = $this->items;
        foreach ($items as &$link) {
            if (!$link instanceof NavLink) {
                $link = new NavLink($link);
            }
            $link->addClass('sub-nav__link');
            if (!$link->isActive() && $link->page_id && is_page($link->page_id)) {
                $link->setActive(true);
            }
        }
        $this->items = $items;
    }

    public static function create(array $items, array $config = [])
    {
        return new static(compact('items', 'config'));
    }

    public static function createFromMenu($menu_slug, array $config = [])
    {
        $menu = wp_get_nav_menu_items($menu_slug);
        $items = array_map(function($post) {
            $link = NavLink::create($post->url, $post->title, $post->target);
            $link->page_id = (int) get_post_meta($post->ID, '_menu_item_object_id', true);
            $link->classes = $post->classes;
            $link->tracking = $post->description;
            return $link;
        }, $menu);
        return static::create($items, $config);
    }

    public function placeholder(string $placeholder, bool $active = false)
    {
        if ($placeholder) {
            $link = NavLink::create('#', $placeholder)->addClass('sub-nav__link');
            if ($active) {
                $link->setActive(true);
            }
            $this->items = array_merge([$link], $this->items);
        }
        return $this;
    }
}
