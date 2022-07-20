<?php
/**
 * Class FAQSchema
 * @package DevAnime\Estarossa\Schema
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Schema\FAQ;

use DevAnime\Models\PostCollection;
use DevAnime\Producers\FAQ\FAQ;
use DevAnime\Estarossa\Schema\SchemaBase;
use DevAnime\Estarossa\Schema\SchemaDTOCollection;

class FAQSchema extends SchemaBase
{
    const TYPE = 'FAQPage';
    /**
     * @var SchemaDTOCollection
     */
    protected $collection;

    public function __construct()
    {
        parent::__construct();
        $this->collection = new SchemaDTOCollection();
    }

    public function addData($item)
    {
        $this->collection = $this->addToCollection($this->collection, $item);
    }

    protected function getData()
    {
        return $this->collection->isEmpty() ? [] : ['main_entity' => $this->collection];
    }


    public function addToCollection(SchemaDTOCollection $collection, $item): SchemaDTOCollection
    {
        // convert array of FAQ posts to PostCollection
        if (is_array($item) && ($item[0] ?? false) instanceof FAQ) {
            $item = new PostCollection($item);
        }
        if ($item instanceof PostCollection) {
            return $item->reduce([$this, 'addToCollection'], $collection);
        }
        return $collection->add(QuestionSchemaDTO::create($item));
    }
}
