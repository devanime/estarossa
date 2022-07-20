<?php
/**
 * @var string $group
 * @var string $field_name
 * @var string $id
 * @var string $label
 * @var array  $config
 */
?>

<div class="filters__item filters__item--text" id="<?=$id ?>_field">
    <label class="filters__label" for="<?= $id; ?>"><?= $label; ?></label>
    <input class="filters__text" id="<?= $id; ?>" type="text" name="<?= $field_name ?>" placeholder="<?= $config['placeholder'] ?? ''; ?>" />
</div>

