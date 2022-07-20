<?php


namespace DevAnime\Estarossa\Filters\Input;


use DevAnime\Producers\Filter\DTO\FilterFieldDTO;
use DevAnime\Util;
use DevAnime\View\Component;

/**
 * Class FilterInputView
 * @package DevAnime\Estarossa\Filters\Input
 *
 * @property string $field_name
 * @property string $group
 * @property string $type
 * @property string $input
 * @property string $label
 * @property array $config
 */
class FilterInputView extends Component
{
    public function __construct(FilterFieldDTO $DTO)
    {
        $properties = $DTO->getData();
        $properties['field_name'] = $properties['name'];
        unset($properties['name']);
        $properties['id'] = "{$properties['group']}_{$properties['field_name']}";
        $properties['label_plural'] = Util::pluralize($properties['label']);
        $properties['all_label'] = $properties['all_results_label'] ?: 'All ' . $properties['label_plural'];
        parent::__construct($properties);
    }

    public function getName(): string
    {
        return 'input-' . $this->input;
    }
}