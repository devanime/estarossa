<?php
/**
 * Class FilterInputCollection
 * @package DevAnime\Estarossa\Filters
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Filters;

use DevAnime\Producers\Filter\DTO\FilterFieldDTO;
use DevAnime\Producers\Filter\DTO\FilterGroupDTO;
use DevAnime\Estarossa\Filters\Input\FilterInputView;
use DevAnime\View\ViewCollection;

class FilterInputCollection extends ViewCollection
{
    protected static $object_class_name = FilterInputView::class;

    public static function createFromGroupDTO(FilterGroupDTO $Collection)
    {
        return new static($Collection->map(function(FilterFieldDTO $DTO) {
            return new FilterInputView($DTO);
        }));
    }



}