<?php
/**
 * Class SchemaController
 * @package DevAnime\Estarossa\Schema
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Schema;

use DevAnime\Estarossa\Schema\FAQ\FAQSchema;
use DevAnime\Estarossa\Schema\Logo\LogoSchema;

class SchemaController
{
    protected $schemas = [
        FAQSchema::class,
        LogoSchema::class
    ];

    public function __construct()
    {
        foreach ($this->schemas as $schema) {
            new $schema;
        }
    }
}
