<?php

namespace DevAnime\Estarossa\ContentBlock;

use DevAnime\View\Component;

/**
 * Class ContentBlockListView
 * @package DevAnime\Estarossa\ContentBlock
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property ContentBlockViewCollection|array $blocks
 */
class ContentBlockListView extends Component
{
    protected $name = 'content-block-list';
    protected static $default_properties = [
        'blocks' => []
    ];

    /**
     * ContentBlockListView constructor.
     * @param ContentBlockViewCollection|array $blocks
     */
    public function __construct($blocks)
    {
        if (!$blocks instanceof ContentBlockViewCollection) {
            $blocks = new ContentBlockViewCollection($blocks);
        }
        parent::__construct(compact('blocks'));
    }

    /**
     * @param array $rows
     * @return ContentBlockListView
     */
    public static function createFromRows(array $rows)
    {
        return new static(array_map(function($row) {
            return new ContentBlockView($row);
        }, $rows));
    }
}
