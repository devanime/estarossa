<?php

namespace DevAnime\Estarossa\ResponsivePicture;

/**
 * Class ViewportValue
 * @package DevAnime\Estarossa\ResponsivePicture
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */
class ViewportValue
{
    const UNIT_PIXELS = 'px';
    const UNIT_EMS = 'em';
    protected $value;
    protected $unit;

    public function __construct($value, string $unit = self::UNIT_PIXELS)
    {
        $this->value = is_numeric($value) ? $value : 0;
        $this->unit = $unit;
    }

    public static function em($value)
    {
        return new static($value, static::UNIT_EMS);
    }

    public function getValue()
    {
        return $this->value;
    }

    public function getUnit()
    {
        return $this->unit;
    }

    public function __toString()
    {
        return $this->getValue() . $this->getUnit();
    }
}
