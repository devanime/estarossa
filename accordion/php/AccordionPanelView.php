<?php

namespace DevAnime\Estarossa\Accordion;

use DevAnime\Models\PostBase;
use DevAnime\Estarossa\Icon\IconView;
use DevAnime\View\Element;
use DevAnime\View\ItemComponent;

/**
 * Class AccordionPanelView
 * @package DevAnime\Estarossa\Accordion
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string $headline
 * @property string $content
 * @property IconView|string $icon
 * @property Element $headline_element
 * @property ELement|string $headline_content
 */
class AccordionPanelView extends ItemComponent
{
    protected $name = 'accordion-panel';
    protected static $default_properties = [
        'headline' => '',
        'content' => '',
        'headline_element' => null,
        'headline_content' => null,
        'icon' => null
    ];

    /**
     * AccordionPanelView constructor.
     * @param string $headline
     * @param string $content
     */
    public function __construct(string $headline, string $content)
    {
        parent::__construct(compact('headline', 'content'));
        $this->headline_content = Element::create('span', $this->headline, ['class' => 'accordion-panel__headline']);
    }

    /**
     * Add 'expanded' class modifier. Will expand panel.
     *
     * @return $this
     */
    public function expand()
    {
        return $this->classModifiers(['expanded']);
    }

    public static function createFromPost(PostBase $Post)
    {
        return new static($Post->title(), $Post->content());
    }
}
