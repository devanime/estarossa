<?php

namespace DevAnime\Estarossa\Icon;

use DevAnime\Estarossa\SocialIcons\SocialIcon;
use DevAnime\View\TemplateView;

/**
 * Class IconView
 * @package DevAnime\Estarossa\Icon
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string $icon_name
 * @property string $style
 * @property array $element_attributes
 */
class IconView extends TemplateView
{
    protected $default_template = __DIR__ . '/icon.php';
    protected $name = 'icon';

    public function __construct(array $properties = [])
    {
        if (!empty($properties['name'])) {
            $properties['icon_name'] = $properties['name'];
        }
        if (empty($properties['icon_name'])) {
            $properties['icon_name'] = '';
        }
        if (empty($properties['style'])) {
            $properties['style'] = [];
        }
        if (!is_array($properties['style'])) {
            $properties['style'] = explode(' ', $properties['style']);
        }
        $properties = array_merge([
            'svg_attr'           => [],
            'element_attributes' => []
        ], $properties);
        parent::__construct($properties);
    }

    /**
     * Override parent setProperties()
     * @param array $properties
     */
    public function setProperties(array $properties = [])
    {
        if (isset($properties[0])) {
            $this->icon_name = $properties[0];
            unset($properties[0]);
        }
        parent::setProperties($properties);
    }

    /**
     * Modify component scope
     * @param array $scope
     * @return array
     */
    protected function setupRenderScope(array $scope): array
    {
        $scope['icon_name'] = 'icon-' . $scope['icon_name'];
        $classes = ['icon', $scope['icon_name']];

        foreach (array_filter($scope['style']) as $s) {
            $classes[] = "icon-style-$s";
        }
        if (!empty($scope['direction'])) {
            $classes[] = 'icon-direction-' . $scope['direction'];
        }
        $scope['classes'] = !empty($scope['classes']) ? array_merge((array) $scope['classes'], $classes) : $classes;
        return $scope;
    }

    /**
     * @param string $name
     * @param string $style
     * @param string $direction
     * @return IconView
     */
    public static function create(string $name, string $style, string $direction = '')
    {
        return new static(compact('name', 'style', 'direction'));
    }

    /**
     * @param SocialIcon $SocialIcon
     * @return IconView
     */
    public static function createFromSocialIcon(SocialIcon $SocialIcon)
    {
        return new static([
            'icon_name' => $SocialIcon->getName(),
            'style' => $SocialIcon->getStyle()
        ]);
    }

    /**
     * @param string $name
     * @param array $arguments Array of style and $direction
     * @return IconView
     */
    public static function __callStatic(string $name, array $arguments)
    {
        return static::create($name, $arguments[0] ?? [], $arguments[1] ?? '');
    }
}
