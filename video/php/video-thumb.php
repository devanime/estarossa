<?php

use DevAnime\Util;

/**
 * Expected:
 * @var string $video_id
 * @var string $thumbnail
 * @var string $target_id
 * @var bool   $match_aspect
 * @var string $thumbnail_brightness
 * @var array  $el_attr
 */
$attr = [
    'class' => implode(' ', array_filter([
        'video-thumb',
        $match_aspect ? 'video-thumb--match-aspect' : 0,
        $thumbnail_brightness ? 'video-thumb--' . $thumbnail_brightness : 0
    ])),
    'href' => $target_id,
    'data-video-thumb' => $thumbnail,
    'data-video-id' => $video_id,
    'aria-hidden' => 'true'
];
if (is_array($el_attr)) {
    if (! empty($el_attr['class'])) {
        $el_attr['class'] = implode(' ', array_unique(explode(' ', $attr['class'] . ' ' . $el_attr['class'])));
    }
    $attr = array_merge($attr, $el_attr);
}
$attr = array_filter($attr);
$svg = apply_filters('estarossa/video/play-icon/svg', '<svg class="video-thumb__arrow" viewBox="0 0 80 80"><polygon stroke-linejoin="round" stroke-width="10" points="10,10 70,40 10,70 " /></svg>');
?>
    <a <?= Util::arrayToAttributes($attr); ?>>
        <span class="video-thumb__bg"></span>
        <span class="video-thumb__icon">
            <span class="video-thumb__circle">
                <?= $svg; ?>
            </span>
        </span>
    </a>
<?php
/* Maybe someday add a pause state toggle
<svg class="video-thumb__pause" viewBox="0 0 80 80">
    <rect stroke-linejoin="round" stroke-width="10" stroke="currentColor" x="10" y="12" width="8" height="56" />
    <rect stroke-linejoin="round" stroke-width="10" stroke="currentColor" x="44" y="12" width="8" height="56" />
</svg>
*/
?>
