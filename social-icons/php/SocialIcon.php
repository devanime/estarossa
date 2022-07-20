<?php

namespace DevAnime\Estarossa\SocialIcons;

/**
 * Class SocialIcon
 * @package DevAnime\Estarossa\SocialIcons
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string $name
 * @property string $url
 * @property string $label
 * @property array $styles
 * @property string $target
 */
class SocialIcon
{
    protected $name;
    protected $url;
    protected $label;
    protected $target;
    protected $styles;

    public function __construct(string $name, string $url, string $label, array $styles = ['primary'], string $target = '_blank')
    {
        $this->name = $name;
        $this->url = $url;
        $this->label = $label;
        $this->styles = $styles;
        $this->target = $target;
    }

    /**
     * @param string $name
     * @param string $url
     * @return SocialIcon
     */
    public static function create(string $name, string $url)
    {
        return new static($name, $url, ucfirst($name));
    }

    /**
     * Create a variation with the "secondary" class modifier.
     *
     * @param string $name
     * @param string $url
     * @return SocialIcon
     */
    public static function createSecondary(string $name, string $url)
    {
        $Object = static::create($name, $url);
        $Object->setStyles(['secondary']);
        return $Object;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function getStyle(): array
    {
        return $this->styles;
    }

    public function getTarget(): string
    {
        return $this->target;
    }

    protected function setStyles(array $styles)
    {
        $this->styles = $styles;
    }
}
