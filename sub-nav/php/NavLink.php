<?php

namespace DevAnime\Estarossa\SubNav;


use DevAnime\Models\ObjectBase;

/**
 * Class NavLink
 * @package DevAnime\Estarossa\SubNav
 *
 * @property string $url
 * @property string $title
 * @property string $target
 * @property int $page_id
 * @property array $classes
 * @property string $tracking
 */
class NavLink extends ObjectBase
{
    protected $url;
    protected $title;
    protected $target;
    protected $page_id;
    protected $classes = [];
    protected $tracking;
    protected $active = false;

    public static function create($url, $title, $target = false)
    {
        return new static(compact('url', 'title', 'target'));
    }

    public function getPageId()
    {
        return $this->page_id;
    }

    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    public function setPageId($page_id)
    {
        $this->page_id = $page_id;
        return $this;
    }

    public function setActive(bool $active)
    {
        $this->active = $active;
        return $this;
    }

    public function isActive()
    {
        return $this->active;
    }

    public function addClass($class)
    {
        $this->classes[] = $class;
        return $this;
    }

    /**
     * @return array
     */
    public function getClasses(): array
    {
        return $this->classes;
    }

    /**
     * @return string
     */
    public function getTarget(): string
    {
        return $this->target;
    }

    /**
     * @return string
     */
    public function getTracking(): string
    {
        return $this->tracking;
    }

    public function getAttributes()
    {
        return array_filter([
            'role' => 'tab',
            'target' => $this->target,
            'class' => implode(' ', $this->classes),
            'data-ga-event' => $this->tracking
        ]);
    }
}
