<?php

namespace DevAnime\Estarossa\SocialIcons;
use DevAnime\View\TemplateView;

/**
 * Class SocialIconsView
 * @package DevAnime\Estarossa\SocialIcons
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property array $icons
 * @property array $class_modifiers
 * @property array $element_attributes
 */
class SocialIconsView extends TemplateView
{
    protected $default_template = __DIR__ . '/social-icons';
    protected $name = 'social-icons';

    /**
     * @param SocialIconCollection|SocialIcon[] $icons
     * @param array $class_modifiers View modifiers
     * @param array $element_attributes View attributes
     * @return static
     */
    public static function create($icons, array $class_modifiers = [], array $element_attributes = [])
    {
        if (!$icons instanceof SocialIconCollection) {
            $icons = new SocialIconCollection($icons);
        }
        return new static(compact('icons', 'class_modifiers', 'element_attributes'));
    }
}
