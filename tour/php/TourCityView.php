<?php

namespace DevAnime\Estarossa\Tour;

use DevAnime\Support\DateTime;
use DevAnime\Producers\Tour\TourCity;
use DevAnime\View\Component;
use DevAnime\View\Link;

/**
 * Class TourCityView
 * @package DevAnime\Estarossa\Tour
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string $title
 * @property DateTime $start_date
 * @property DateTime $end_date
 * @property string $date_replacement_text
 * @property string $venue_name
 * @property string $venue_url
 * @property string $cta_title
 * @property string $cta_url
 *
 * @property string $date_range
 * @property string $cta
 */
class TourCityView extends Component
{
    const CTA_TITLE = 'On Sale TBD';
    const DATE_FORMAT = 'm/d/y';

    protected $name = 'tour-city';
    protected static $default_properties = [
        'title' => '',
        'start_date' => null,
        'end_date' => null,
        'date_replacement_text' => '',
        'date_range' => '',
        'venue_name' => '',
        'venue_url' => '',
        'cta_title' => '',
        'cta_url' => ''
    ];

    public function __construct(array $properties = [])
    {
        parent::__construct($properties);
        $this->date_range = $this->getDateRange();
        $this->cta_title = $this->cta_title ?:
            apply_filters('estarossa/tour/cta-title', static::CTA_TITLE);
        $this->cta = $this->getCallToAction();
    }

    public static function createFromTourCity(TourCity $TourCity)
    {
        return new static([
            'title' => $TourCity->title(),
            'start_date' => $TourCity->start_date,
            'end_date' => $TourCity->end_date,
            'date_replacement_text' => $TourCity->date_replacement_text,
            'venue_name' => $TourCity->venue_name,
            'venue_url' => $TourCity->venue_url,
            'cta_title' => $TourCity->cta_title,
            'cta_url' => $TourCity->cta_url,
        ]);
    }

    protected function getCallToAction(): string
    {
        $Link = new Link($this->cta_url, $this->cta_title, [
            'aria-label' => sprintf('%s: %s', $this->cta_title, $this->title),
            'class' => 'tour-city-btn',
            'target' => '_blank',
            'data-gtm' => sd_gtm_attr([
                'city' => $this->title,
                'venue' => $this->venue_name
            ], false)
        ]);
        if (!$this->cta_url) {
            return $Link->attribute('disabled', 'disabled')->AddClass('tour-city-btn--disabled');
        }
        return $Link;
    }

    protected function getDateRange(): string
    {
        if (!$this->start_date && !$this->end_date) {
            return '';
        }
        return sprintf(
            '%1$s - %2$s',
            (string)$this->start_date->format(
                apply_filters('estarossa/tour/date-format', static::DATE_FORMAT)
            ),
            (string)$this->end_date->format(
                apply_filters('estarossa/tour/date-format', static::DATE_FORMAT)
            )
        );
    }
}
