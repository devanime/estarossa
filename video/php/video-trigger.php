<?php

use DevAnime\Util;

/**
 * Expected:
 * @var string $video_id
 * @var string $target_id
 * @var string $text
 * @var array  $el_attr
 */
$attr = [
    'href'          => $target_id,
    'data-video-id' => $video_id,
];
if (is_array($el_attr)) {
    $attr = array_merge($attr, $el_attr);
}
$attr = array_filter($attr);
?>
<a <?= Util::arrayToAttributes($attr); ?>><?= $text; ?></a>
