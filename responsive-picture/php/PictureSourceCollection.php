<?php

namespace DevAnime\Estarossa\ResponsivePicture;

use DevAnime\Models\ObjectCollection;

/**
 * Class PictureSourceCollection
 * @package DevAnime\Estarossa\ResponsivePicture
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */
class PictureSourceCollection extends ObjectCollection
{
    protected $object_class = PictureSource::class;

    protected function getObjectHash($item)
    {
        return md5($item->getSourceUrl());
    }
}
