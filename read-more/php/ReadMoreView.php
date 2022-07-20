<?php

namespace DevAnime\Estarossa\ReadMore;

use DevAnime\View\Component;
use DevAnime\View\ViewCollection;

/**
 * Class ReadMoreView
 * @package DevAnime\Estarossa\ReadMore
 * @property string $raw
 * @property string $display
 * @property string $expanded
 * @property string $button_text
 * @property string $aria_label
 * @property array $icon_properties
 */
class ReadMoreView extends Component
{
    const BUTTON_TEXT = 'Read More';
    const READ_LESS_TEXT = 'Read Less';
    const DELIMITER = "\r\n\r\n";
    const DEFAULT_DELIMITER_COUNT = 1;

    protected $name = 'read-more';
    protected static $default_properties = [
        'display' => '',
        'expanded' => '',
        'button_text' => '',
        'aria_label' => '',
        'icon_properties' => [
            'icon_name' => '',
            'style' => '',
            'direction' => ''
        ]
    ];

    public function __construct(string $display, string $expanded = '', string $aria_label = '')
    {
        parent::__construct(compact('display', 'expanded', 'aria_label'));
        $this->button_text = apply_filters('estarossa/read-more/button-text', static::BUTTON_TEXT);
        $this->icon_properties = apply_filters('estarossa/read-more/icon-properties', $this->icon_properties);
        $this->aria_label = apply_filters('estarossa/read-more/aria-label', $this->aria_label ?: $this->button_text);

        $element_attributes = ['data-read-more-text' => $this->button_text];
        if (apply_filters('estarossa/read-more/read-less', false)) {
            $element_attributes = array_merge($element_attributes, [
                'data-read-less-text' => apply_filters('estarossa/read-more/text', static::READ_LESS_TEXT)
            ]);
        }
        $this->elementAttributes($element_attributes);
    }

    /**
     * @param string $raw
     * @param int $delimiter_count
     * @param string $aria_label
     * @return ReadMoreView
     */
    public static function createFromText(string $raw, $delimiter_count = self::DEFAULT_DELIMITER_COUNT, string $aria_label = '')
    {
        $delimiter = apply_filters('estarossa/read-more/delimiter', static::DELIMITER);
        $parts = array_filter(explode($delimiter, trim($raw)));
        if (empty($parts)) {
            return new static($raw);
        }
        $summary_parts = array_splice($parts, 0, $delimiter_count);
        return new static(
            apply_filters('the_content', implode($delimiter, $summary_parts)),
            apply_filters('the_content', implode($delimiter, $parts)),
            $aria_label
        );
    }

    /**
     * @param ViewCollection $ViewCollection
     * @param int $delimiter_count
     * @param string $aria_label
     * @return ReadMoreView
     */
    public static function createFromViewCollection(ViewCollection $ViewCollection, $delimiter_count = self::DEFAULT_DELIMITER_COUNT, string $aria_label = '')
    {
        $items = $ViewCollection->getAll();
        $summary_items = array_splice($items, 0, $delimiter_count);
        return new static(
            implode(' ', $summary_items),
            implode(' ', $items),
            $aria_label
        );
    }
}
