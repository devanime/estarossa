<?php


namespace DevAnime\Estarossa\FAQ;

use DevAnime\Producers\FAQ\FAQSections;
use DevAnime\View\ViewCollection;

class FAQSectionsViewCollection extends ViewCollection
{
    protected static $object_class_name = FAQSectionView::class;

    public static function create($accordion_settings = [])
    {
        $items = [];
        foreach(FAQSections::sections() as $title => $collection) {
            $items[] = new FAQSectionView($title, $collection, $accordion_settings);
        }
        return new static($items);
    }
}