<?php

namespace DevAnime\Estarossa\NavMenu;

class NavMenuController
{
    public function __construct()
    {
        add_filter('nav_menu_css_class', function ($classes, $item, $args, $depth) {
            if ($args->menu_class !== NavMenuView::DEFAULT_MENU_CLASS) {
                return $classes;
            }
            $classes_map = array_combine($classes, $classes);
            $classes_map['menu-item'] = $depth ? 'nav-menu__sub-item' : 'nav-menu__item';
            if (isset($classes_map['menu-item-has-children'])) {
                $classes_map['menu-item-has-children'] = 'nav-menu__item--has-sub';
            }
            if (isset($classes_map['active'])) {
                if ($item->current) {
                    $classes_map['active'] = 'nav-menu__item--current';
                } elseif ($item->current_item_ancestor || (
                        in_array('current-menu-ancestor', $item->classes) &&
                        $depth === 0
                    )) {
                    $classes_map['active'] = 'nav-menu__item--has-current-sub';
                }
            }
            return array_values($classes_map);
        }, 99, 4);
        add_filter('nav_menu_submenu_css_class', function ($classes, $args) {
            return $args->menu_class == NavMenuView::DEFAULT_MENU_CLASS ? ['nav-menu__sub-list'] : $classes;
        }, 10, 2);
    }
}
