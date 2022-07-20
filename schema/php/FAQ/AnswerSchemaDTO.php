<?php
/**
 * Class AnswerSchemaDTO
 * @package DevAnime\Estarossa\Schema
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Schema\FAQ;

use DevAnime\Estarossa\Schema\SchemaDTO;

class AnswerSchemaDTO extends SchemaDTO
{
    protected $__type = 'Answer';
    protected $text = '';

    public function __construct($answer)
    {
        $this->text = strip_tags($answer, '<h1><h2><h3><h4><h5><h6><br><ol><ul><li><a><p><b><strong><i><em>');
    }
}
