<?php

namespace DevAnime\Estarossa\ResponsivePicture;

/**
 * Class MediaQuery
 * @package DevAnime\Estarossa\ResponsivePicture
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property ViewportValue $viewport_value
 * @property string $bounds
 */
class MediaQuery
{
    const BOUNDS_MIN = 'min';
    const BOUNDS_MAX = 'max';
    const FORMAT = '(%1s-width: %2$s)';
    protected $viewport_value;
    protected $bounds;

    public function __construct(ViewportValue $viewport_value, $bounds = self::BOUNDS_MAX)
    {
        $this->viewport_value = $viewport_value;
        $this->bounds = $bounds;
    }

    public static function createMaximum(ViewportValue $viewport_value)
    {
        return new static($viewport_value, static::BOUNDS_MAX);
    }

    public static function createMinimum(ViewportValue $viewport_value)
    {
        return new static($viewport_value, static::BOUNDS_MIN);
    }

    public function getViewportValue(): ViewportValue
    {
        return $this->viewport_value;
    }

    public function getBounds(): string
    {
        return $this->bounds;
    }

    public function getMediaQuery()
    {
        return $this->viewport_value->getValue() == 0 ? '' : sprintf(
            static::FORMAT,
            $this->bounds,
            $this->viewport_value
        );
    }

    public function __toString()
    {
        return $this->getMediaQuery();
    }
}
