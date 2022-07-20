<?php

namespace DevAnime\Estarossa\ContentBlock;

use DevAnime\View\ViewCollection;

/**
 * Class ContentBlockViewCollection
 * @package DevAnime\Estarossa\ContentBlock
 * @author Vinent Ragosta <devanimecards@gmail.com>
 * @version 1.0
 */
class ContentBlockViewCollection extends ViewCollection
{
    protected static $object_class_name = ContentBlockView::class;
}
