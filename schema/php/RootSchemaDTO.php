<?php
/**
 * Class RootSchemaDTO
 * @package DevAnime\Estarossa\Schema
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Schema;

class RootSchemaDTO extends SchemaDTO
{
    const CONTEXT = 'https://schema.org';

    protected $entity_data;

    public function __construct($type, $entity_data)
    {
        $this->__type = $type;
        $this->entity_data = $entity_data;
    }

    public function getData()
    {
        $data = array_merge(
            ['__context' => self::CONTEXT, '__type' => $this->__type],
            $this->entity_data);
        $keys = array_map([$this, 'translateKey'], array_keys($data));
        $values = array_values($data);
        return array_filter(array_combine($keys, $values));
    }

    private function translateKey($key)
    {
        if (0 === strpos($key, '__')) {
            $key = '@' . substr($key, 2);
        }
        return $key;
    }
}
