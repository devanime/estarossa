<?php

use DevAnime\Estarossa\ResponsivePicture\PictureSourceView;
use DevAnime\Util;

/**
 * Expected:
 * @var string $media_query
 * @var string $source_url
 * @var bool   $lazy
 */
$attr = [
    'media'  => $media_query,
    'srcset' => $source_url
];
if ($lazy) {
    $attr['srcset'] = PictureSourceView::PIXEL;
    $attr['data-srcset'] = $source_url;
}
?>

<source <?= Util::arrayToAttributes($attr); ?>>
