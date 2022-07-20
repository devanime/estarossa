<?php

namespace DevAnime\Estarossa\ResponsivePicture;

use DevAnime\View\TemplateView;

/**
 * Class PictureSourceView
 * @package DevAnime\Estarossa\ResponsivePicture
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string $source_url
 * @property MediaQuery $media_query
 */
class PictureSourceView extends TemplateView
{
    const PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

    protected $default_template = __DIR__ . '/picture-source';
    protected $name = 'picture-source';

    public static function createFromSource(PictureSource $Source, $lazy = true)
    {
        return new static([
            'media_query' => $Source->getMediaQuery(),
            'source_url' => $Source->getSourceUrl(),
            'lazy' => $lazy
        ]);
    }
}
