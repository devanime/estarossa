<?php
/**
 * Expected:
 * @var string $caption
 * @var WP_Image $image
 * @var array $class_modifiers
 * @var array $element_attributes
 */

use DevAnime\Util; ?>

<figure <?= Util::componentAttributes('image-caption', $class_modifiers, $element_attributes); ?>>
    <?= $image; ?>
    <?php if ($caption): ?>
        <figcaption class="image-caption__caption"><?= $caption; ?></figcaption>
    <?php endif; ?>
</figure>
