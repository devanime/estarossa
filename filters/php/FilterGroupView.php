<?php
/**
 * Class FilterGroupView
 * @package DevAnime\Estarossa\Filters
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Filters;

use DevAnime\Producers\Filter\FilterablePostsService;
use DevAnime\View\ComponentView;

class FilterGroupView extends ComponentView
{
    protected $default_template = __DIR__ . '/filter-group';
    protected $name = 'filter-group';
    public static $group_data = [];

    public function __construct(string $name, $content, $filters, $filterable_data)
    {
        parent::__construct(['group' => $name, 'content' => $content]);
        if (empty(static::$group_data)) {
            add_action('wp_footer', [static::class, 'outputFilterJson']);
        }
        static::$group_data[$name] = ['filters' => $filters, 'data' => $filterable_data];
    }

    public static function createFromService(FilterablePostsService $filterablePostsService)
    {
        return new static(
            $filterablePostsService->getFilterGroupName(),
            FilterInputCollection::createFromGroupDTO($filterablePostsService->getFilterGroupInputData()),
            $filterablePostsService->getFilterGroupConfigData(),
            $filterablePostsService->getFilterablePostsData()
        );
    }

    public static function outputFilterJson()
    {
        echo '<script>var filterableGroupData=' . json_encode(static::$group_data) . '</script>';
    }

}