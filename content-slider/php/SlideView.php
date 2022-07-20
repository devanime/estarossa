<?php
/**
 * Class SlideView
 * @package DevAnime\Estarossa\ContentSlider
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\ContentSlider;

use DevAnime\Util;
use DevAnime\View\Element;
use DevAnime\View\ItemComponent;

class SlideView extends ItemComponent
{
    protected $name = 'content-slide';

    function render(array $scope): string
    {
        return (string) Element::create('div', $scope['content'], Util::componentAttributesArray(
            $this->name, $scope['class_modifiers'], $scope['element_attributes']
        ));
    }
}
