<?php

namespace DevAnime\Estarossa\Talent;
use DevAnime\Estarossa\Modal\ModalView;
use DevAnime\View\Component;
use DevAnime\View\TemplateView;
use DevAnime\Producers\Talent\TalentLayout;

/**
 * Class TalentContainerView
 * @package DevAnime\Estarossa\Talent
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property array $tabs
 * @property string $subnav_styles
 * @property string $modal_style
 * @property array $grids
 * @property array $css_modifiers
 * @property array $data_attributes
 */
class TalentContainerView extends Component
{
    protected $default_template = __DIR__ . '/talent-container';
    protected $name = 'talent-container';

    public function __construct(array $properties = [])
    {
        parent::__construct($properties);
        $this->subnav_styles = $this->subnav_styles ?: 'horizontal';
        $this->modal_style = $this->modal_style ?: 'centered';
        ModalView::load('talent-card-modal', $this->modal_style);
    }

    public static function createFromTalentLayout(TalentLayout $Layout)
    {
        return new static([
            'tabs'  => $Layout->getTabs(),
            'grids'  => $Layout->getGrids()
        ]);
    }
}
