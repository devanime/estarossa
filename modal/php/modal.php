<?php
/**
 * Expected:
 *
 * @var string $id
 * @var string|array $type
 * @var string|\DevAnime\View\View $content
 * @var string $label
 */

use DevAnime\Util;

$type = is_array($type) ? $type : [$type];

if (!isset($content)) {
    $content = '';
}

$attributes = [
    'id' => $id,
    'tabindex' => -1,
    'role' => 'dialog',
    'aria-modal' => 'true',
    'aria-labelledby' => $id . '-label'
];
$insert_heading = !empty($label) || strpos((string) $content, '<h') === false;
$label = $label ?: str_replace('-', ' ', $id);

?>
<div <?=Util::componentAttributes('modal', $type, $attributes) ?>>
    <div class="modal__container">
        <?php if($insert_heading): ?>
            <h2 class="sr-only" id="<?= $id . '-label'; ?>"><?= $label; ?></h2>
        <?php endif; ?>
        <div class="modal__content">
            <?=$content ?>
        </div>
        <button class="modal__close" type="button" aria-label="Close modal"><?= apply_filters('estarossa/close', '&#10005;', $id, $type); ?></button>
    </div>
</div>
