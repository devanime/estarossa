<?php

namespace DevAnime\Estarossa\ResponsivePicture;

/**
 * Class NamedViewportValue
 * @package DevAnime\Estarossa\ResponsivePicture
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 *
 * @deprecated - use BreakpointValue instead
 */
class NamedViewportValue extends ViewportValue
{
    // TODO: Figure out way to pull in bootstrap constants! or maybe set in theme/CMS?
    const DESKTOP = 991;
    const TABLET = 767;
    const MOBILE = 479;
    //

    public static function desktop(string $unit = self::UNIT_PIXELS)
    {
        return new static(
            apply_filters('estarossa/responsive-picture/desktop', static::DESKTOP),
            $unit
        );
    }

    public static function tablet(string $unit = self::UNIT_PIXELS)
    {
        return new static(
            apply_filters('estarossa/responsive-picture/tablet', static::TABLET),
            $unit
        );
    }

    public static function mobile(string $unit = self::UNIT_PIXELS)
    {
        return new static(
            apply_filters('estarossa/responsive-picture/mobile', static::MOBILE),
            $unit
        );
    }
}
