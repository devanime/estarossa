<?php

namespace DevAnime\Estarossa\ResponsivePicture;

class BreakpointValue extends ViewportValue
{
    const BREAKPOINT_XS = 'xs';
    const BREAKPOINT_SM = 'sm';
    const BREAKPOINT_MD = 'md';
    const BREAKPOINT_LG = 'lg';
    const BREAKPOINT_XL = 'xl';

    protected static $definitions;

    public function __construct($key)
    {
        if (!static::isDefinedKey($key)) {
            throw new \InvalidArgumentException('Not a valid breakpoint key');
        }
        parent::__construct(static::getDefinitions()[$key]);
    }

    public static function isDefinedKey($key)
    {
        return array_key_exists($key, static::getDefinitions());
    }

    public static function get(string $key)
    {
        return static::getDefinitions()[$key] ?? null;
    }

    public static function getDefinitions()
    {
        if (!isset(static::$definitions)) {
            static::$definitions = apply_filters('estarossa/responsive-picture/breakpoints', [
                static::BREAKPOINT_XS => 0,
                static::BREAKPOINT_SM => 576,
                static::BREAKPOINT_MD => 768,
                static::BREAKPOINT_LG => 992,
                static::BREAKPOINT_XL => 1200,
            ]);
        }
        return static::$definitions;
    }
}
