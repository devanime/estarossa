<?php

namespace DevAnime\Estarossa\CalendarContainer;

use DevAnime\Producers\Tickets\CalendarLayout;
use DevAnime\Estarossa\ContentBlock\ContentBlock;
use DevAnime\Estarossa\ContentBlock\ContentBlockListView;
use DevAnime\View\TemplateView;

/**
 * Class CalendarContainerView
 * @package DevAnime\Estarossa\CalendarContainer
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string $headline
 * @property array $ticketing_tips
 * @property array $additional_tips
 * @property array $class_modifiers
 * @property array $element_attributes
 */
class CalendarContainerView extends TemplateView
{
    protected $default_template = __DIR__ . '/calendar-container.php';
    protected $name = 'calendar-container';

    /**
     * @param array $config
     * @param array $class_modifiers
     * @param array $element_attributes
     * @return CalendarContainerView
     */
    public static function create(array $config, array $class_modifiers = [], array $element_attributes = [])
    {
        $defaults = [
            'headline' => '',
            'ticketing_tips' => [],
            'additional_tips' => []
        ];
        $config = wp_parse_args($config, $defaults);
        if (!empty($config['ticketing_tips']) && !in_array('ticketing-tips', $class_modifiers)) {
            $class_modifiers[] = 'ticketing-tips';
        }
        return new static([
            'headline' => $config['headline'],
            'ticketing_tips' => $config['ticketing_tips'],
            'additional_tips' => $config['additional_tips'],
            'class_modifiers' => $class_modifiers,
            'element_attributes' => $element_attributes
        ]);
    }

    /**
     * @param array $class_modifiers
     * @param array $element_attributes
     * @return CalendarContainerView
     */
    public static function createFromCalendarLayout(array $class_modifiers = [], array $element_attributes = [])
    {
        return static::create(
            [
                'headline' => CalendarLayout::calendarHeadline(),
                'ticketing_tips' => array_map(function($tip) {
                    return ContentBlock::create($tip['headline'], $tip['content'], $tip['cta'] ?: []);
                }, CalendarLayout::calendarTicketingTips()),
                'additional_tips' => array_map(function($tip) {
                    return ContentBlock::create($tip['headline'], $tip['content'], $tip['cta'] ?: []);
                }, CalendarLayout::calendarAdditionalTips())
            ],
            $class_modifiers,
            $element_attributes
        );
    }
}
