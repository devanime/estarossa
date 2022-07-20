<?php

namespace DevAnime\Estarossa\ContentBlock;

use DevAnime\View\Component;
use DevAnime\View\Element;

/**
 * Class ContentBlockView
 * @package DevAnime\Estarossa\ContentBlock
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string $tag
 * @property string $headline
 * @property string $tagline
 * @property string $content
 * @property array $cta

 */
class ContentBlockView extends Component
{
    const DEFAULT_TAG = 'h3';

    protected $name = 'content-block';
    protected static $default_properties = [
        'tag' => 'h3',
        'headline' => '',
        'tagline' => '',
        'content' => '',
        'cta' => []
    ];

    public function __construct(array $properties = [])
    {
        parent::__construct($properties);
        if ($this->headline) {
            $this->headline = Element::create($this->tag ?: static::DEFAULT_TAG, $this->headline);
        }
        if ($this->cta) {
            $this->cta = $this->getCallToAction($this->cta);
        }
    }

    /**
     * TODO: we should remove the class_modifiers + element_attributes from the param list
     *
     * @param ContentBlock $ContentBlock
     * @param array $class_modifiers
     * @param array $element_attributes
     * @return ContentBlockView
     */
    public static function createFromContentBlock(ContentBlock $ContentBlock, array $class_modifiers = [], array $element_attributes = [])
    {
        return new static([
            'headline' => $ContentBlock->getHeadline(),
            'tagline' => $ContentBlock->getTagline(),
            'content' => $ContentBlock->getContent(),
            'cta' => $ContentBlock->getCTA(),
            'class_modifiers' => $class_modifiers,
            'element_attributes' => $element_attributes,
        ]);
    }

    /**
     * @param array $cta
     * @return array
     */
    protected function getCallToAction(array $cta)
    {
        if (!isset($cta['title'])) {
            return [];
        }
        $classes = ['content-block__cta'];
        if (isset($cta['modal'])) {
            $classes[] = 'js-modal-trigger';
            unset($cta['modal']);
        }
        if (isset($cta['class'])) {
            $classes[] = $cta['class'];
        }
        $cta['class'] = implode(' ', $classes);
        return $cta;
    }
}
