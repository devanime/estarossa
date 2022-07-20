<?php
/**
 * Class LogoSchema
 * @package DevAnime\Estarossa\Schema
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Schema\Logo;

use DevAnime\Estarossa\Schema\SchemaBase;

class LogoSchema extends SchemaBase
{
    public const TYPE = 'Organization';

    protected $logo;

    public function addData($item)
    {
        $this->logo = $item;
    }

    protected function getData()
    {
        return $this->logo ? [
            'url' => home_url(),
            'logo' => $this->logo
        ] : [];
    }
}
