<?php

namespace DevAnime\Estarossa\NavMenu;

use DevAnime\View\ComponentView;

class NavMenuView extends ComponentView
{
    const DEFAULT_MENU_CLASS = 'nav-menu__list';
    protected $default_template = __DIR__ . '/nav-menu';
    protected $name = 'nav-menu';
    protected static $default_menu_options = [
        'menu_class' => self::DEFAULT_MENU_CLASS,
        'echo' => false
    ];

    public function __construct(array $properties = [])
    {
        $default_options = ['responsive' => false, 'list_only' => false];
        $properties['config'] = array_merge($default_options, $properties['config'] ?? []);
        $properties['menu_options'] = array_merge(static::$default_menu_options, $properties['menu_options'] ?? []);
        parent::__construct($properties);
    }

    public static function create($menu_name = 'primary_navigation', $menu_options = [], $config = [])
    {
        $menu_options['theme_location'] = $menu_name;
        return new static(compact('menu_name', 'menu_options', 'config'));
    }

    public static function createResponsive($menu_name = 'primary_navigation', $menu_options = [])
    {
        return static::create($menu_name, $menu_options, ['responsive' => true]);
    }

    public static function createList($menu_name = 'primary_navigation', $menu_options = [])
    {
        return static::create($menu_name, $menu_options, ['list_only' => true]);
    }
}