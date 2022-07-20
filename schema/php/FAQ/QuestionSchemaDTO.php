<?php
/**
 * Class QuestionSchemaDTO
 * @package DevAnime\Estarossa\Schema
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Schema\FAQ;

use DevAnime\Producers\FAQ\FAQ;
use DevAnime\Estarossa\Schema\SchemaDTO;

class QuestionSchemaDTO extends SchemaDTO
{
    protected $__type = 'Question';
    protected $name = '';
    protected $accepted_answer;

    public function __construct($question, $answer)
    {
        $this->name = $question;
        $this->accepted_answer = new AnswerSchemaDTO($answer);
    }

    public static function create($item)
    {
        if ($item instanceof FAQ) {
            return static::createFromPost($item);
        }
        return new static($item['question'], $item['answer']);
    }

    /**
     * @param FAQ $faq
     *
     * @return static
     */
    public static function createFromPost($faq)
    {
        return new static($faq->title(), $faq->content());
    }
}
