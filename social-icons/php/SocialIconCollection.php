<?php

namespace DevAnime\Estarossa\SocialIcons;

use DevAnime\Models\ObjectCollection;

/**
 * Class SocialIconCollection
 * @package DevAnime\Estarossa\SocialIcons
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */
class SocialIconCollection extends ObjectCollection
{
    protected static $object_class_name = SocialIcon::class;

    public function getObjectHash($item)
    {
        /* @var SocialIcon $item */
        return md5($item->getName());
    }
}
