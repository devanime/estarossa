<?php

namespace DevAnime\Estarossa\FAQ;

use DevAnime\Models\PostCollection;
use DevAnime\Estarossa\Schema\FAQ\FAQSchema;
use DevAnime\View\Component;

/**
 * Class FAQSectionView
 * @package DevAnime\Estarossa\FAQ
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string         $title
 * @property PostCollection $faqs
 */
class FAQSectionView extends Component
{
    protected $name = 'faq-section';
    protected static $default_properties = [
        'title'              => '',
        'faqs'               => null,
        'accordion_settings' => [],
    ];

    public function __construct(string $title, PostCollection $faqs, $accordion_settings = [])
    {
        $accordion_settings = array_merge([
            'open_first'  => false,
            'single_open' => true,
            'headline_element' => 'h3'
        ], $accordion_settings);
        FAQSchema::register($faqs);
        parent::__construct(compact('title', 'faqs', 'accordion_settings'));
        $this->elementAttributes(['data-gtm', 'faq']);
    }
}
