<?php
/**
 * Class SchemaDTOCollection
 * @package DevAnime\Estarossa\Schema
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Schema;

use DevAnime\Models\DTO;
use DevAnime\Models\DTOCollection;

class SchemaDTOCollection extends DTOCollection
{
    protected static $object_class_name = SchemaDTO::class;

    protected function createDTO($item): DTO
    {
        return new SchemaDTO($item);
    }
}
