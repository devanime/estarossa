<?php
/**
 * Class SchemaDTO
 * @package DevAnime\Estarossa\Schema
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Schema;

use DevAnime\Models\DTO;

class SchemaDTO extends DTO
{
    protected $__type;

    public function getData()
    {
        $data = parent::getData();
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
