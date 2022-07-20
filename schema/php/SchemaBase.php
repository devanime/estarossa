<?php
/**
 * Class SchemaBase
 * @package DevAnime\Estarossa\Schema
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Schema;

use DevAnime\View\Element;

abstract class SchemaBase
{
    /* Set TYPE in sub-class */
    const TYPE = null;

    public function __construct()
    {
        add_action(static::hook(), [$this, 'addData']);
        add_action('wp_footer', [$this, 'outputSchema']);
    }

    /**
     * @param mixed $item
     * @return void
     */
    public abstract function addData($item);

    /**
     * @return array
     */
    protected abstract function getData();

    public function outputSchema()
    {
        $data = $this->getData();
        if (!empty($data)) {
            echo Element::create('script', new RootSchemaDTO(static::TYPE, $data), ['type' => 'application/ld+json']);
        }
    }

    public static function hook()
    {
        return 'estarossa/schema/register/' . strtolower(static::TYPE);
    }

    public static function register($item)
    {
        do_action(static::hook(), $item);
    }
}
