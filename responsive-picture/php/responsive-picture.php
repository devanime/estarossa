<?php
/**
 * Expected:
 * @var WP_Image                $base_image
 * @var PictureSourceCollection $collection
 * @var bool                    $lazy
 * @var array                   $class_modifiers
 * @var array                   $element_attributes
 */

use DevAnime\Estarossa\ResponsivePicture\PictureSourceCollection;
use DevAnime\Estarossa\ResponsivePicture\PictureSourceView;
use DevAnime\Util;

if (! $base_image instanceof \WP_Image) {
    return;
}
if ($lazy) {
    $base_image->custom_attr('data-src', $base_image->url);
    $base_image->custom_attr('src', PictureSourceView::PIXEL);
    if (empty($element_attributes['style'])) {
        $base_image->custom_attr('style', 'padding-top: ' . $base_image->height / $base_image->width * 100 . '%');
    }
}
?>

<span <?= Util::componentAttributes('responsive-picture', $class_modifiers, $element_attributes); ?>>
    <picture>
        <?php if ($collection->count()): ?>
            <?php foreach ($collection->getAll() as $Source) : ?>
                <?= PictureSourceView::createFromSource($Source, $lazy); ?>
            <?php endforeach; ?>
        <?php endif; ?>
        <?= $base_image; ?>
    </picture>
</span>
