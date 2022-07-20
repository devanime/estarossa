<?php

namespace DevAnime\Estarossa\Tour;
use DevAnime\View\Component;

/**
 * Class TourCityListView
 * @package DevAnime\Estarossa\Tour
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string $headline
 * @property array $cities
 * @property array $class_modifiers
 * @property array $element_attributes
 */
class TourCityListView extends Component
{
    protected $name = 'tour-city-list';
    protected static $default_properties = [
        'headline' => '',
        'cities' => []
    ];

    public function __construct(array $properties = [])
    {
        parent::__construct($properties);
        $this->elementAttributes(['role' => 'table']);
    }

    public static function createFromCities(array $cities, string $headline = '', array $class_modifiers = [], array $element_attributes = [])
    {
        return new static(compact('cities', 'headline', 'class_modifiers', 'element_attributes'));
    }
}
