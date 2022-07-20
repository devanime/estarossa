<?php
/**
 * Class SliderView
 * @package DevAnime\Estarossa\ContentSlider
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\ContentSlider;

use DevAnime\View\ParentComponent;
use DevAnime\View\ViewCollection;

class SliderView extends ParentComponent
{
    protected $name = 'content-slider';

    public function __construct(ViewCollection $slides, array $owl_config = [], array $modifiers = [])
    {
        $args = [
            'items' => $slides,
            'class_modifiers' => $modifiers,
        ];
        if ($owl_config) {
            $args['element_attributes'] = [
                'data-owl-config' => esc_attr(json_encode($owl_config))
            ];
        }
        parent::__construct($args);
    }
}
