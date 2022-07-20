<?php

namespace DevAnime\Estarossa\Accordion;

use DevAnime\Models\PostCollection;
use DevAnime\Estarossa\Icon\IconView;
use DevAnime\View\Element;
use DevAnime\View\ViewCollection;
use DevAnime\View\ParentComponent;

/**
 * Class AccordionView
 * @package DevAnime\Estarossa\Accordion
 *
 * @property ViewCollection $items
 * @property IconView|string $icon
 * @property bool $single_open
 * @property bool $open_first
 * @property string $headline_element
 */
class AccordionView extends ParentComponent
{
    protected $name = 'accordion';
    protected static $default_properties = [
        'icon' => [
            'icon_name' => '',
            'style' => '',
            'direction' => '',
            'expanded_icon_name' => '',
            'classes' => 'accordion-panel__icon'
        ],
        'single_open' => false,
        'open_first'  => false,
        'headline_element' => 'h2'
    ];

    /**
     * AccordionView constructor.
     *
     * @param ViewCollection|AccordionPanelView[] $items
     * @param array $args
     */
    public function __construct($items, $args = [])
    {
        $args['items'] = $items;
        $args['icon'] = apply_filters('estarossa/accordion/icon-properties', static::$default_properties['icon']);
        parent::__construct($args);
    }

    public function setSingleOpen($flag)
    {
        if ($flag) {
            $this->elementAttributes(['data-single-open' => null]);
        }
        return $this;
    }

    public function setOpenFirst($flag)
    {
        if ($flag){
            $this->items[0]->expand();
        }
        return $this;
    }

    public function setIcon($icon)
    {
        if (!empty($icon['icon_name'])) {
            $element_attributes = ['aria-hidden' => 'true', 'focusable' => 'false'];
            if (!empty($icon['expanded_icon_name'])) {
                $element_attributes['data-icon-name'] = $icon['icon_name'];
                $element_attributes['data-expanded-icon-name'] = $icon['expanded_icon_name'];
            }
            $icon = new IconView(array_merge($icon, ['classes' => 'accordion-panel__icon'], compact('element_attributes')));
        } else if (isset($icon['icon_name'])) {
            $icon = null;
        }
        $this->setValue('icon', $icon);
        return $this;
    }

    public function setHeadlineElement($element)
    {
        if (!$element instanceof Element) {
            $element = Element::create($element);
        }
        $this->setValue('headline_element', $element);
        return $this;
    }

    /**
     * @param AccordionPanelView $panel
     * @param array              $args
     *
     * @return AccordionView
     */
    public static function createWithOnePanel(AccordionPanelView $panel, $args = [])
    {
        return new static([$panel], $args);
    }

    /**
     * @param PostCollection $collection
     * @param array          $args
     *
     * @return AccordionView
     */
    public static function createFromPostCollection(PostCollection $collection, $args = [])
    {
        return new static($collection->map([AccordionPanelView::class, 'createFromPost']), $args);
    }
}
