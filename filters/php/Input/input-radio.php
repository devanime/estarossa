<?php
/**
 * @var string $group
 * @var string $field_name
 * @var string $id
 * @var string $label
 * @var string $label_plural
 * @var string $all_label
 * @var array  $config
 */
$all_label = apply_filters('estarossa/filters/radio/all-label', $all_label, $field_name, $group);

use DevAnime\Producers\Filter\Values\FilterableItem; ?>

<fieldset class="filters__item filters__item--radio" id="<?=$id ?>_field">
    <legend class="filters__label"><?= $label; ?></legend>
    <div class="filters__radio-buttons">
        <div class="filters__radio-button">
            <input class="filters__radio" type="radio" id="<?= $id ?>_all" name="<?= $field_name ?>" value="" checked="checked" />
            <label for="<?= $id ?>_all"><?= $all_label ?></label>
        </div>
        <?php foreach ($config['options'] as $item): /* @var FilterableItem $item */ ?>
            <?php
                $value = $item->getValue();
                $item_label = $item->getLabel();
                $input_id = "{$id}_{$value}"
            ?>
        <div class="filters__radio-button">
            <input class="filters__radio" type="radio" id="<?= $input_id ?>" name="<?= $field_name ?>" value="<?= $value; ?>" />
            <label for="<?= $input_id ?>"><?= $item_label; ?></label>
        </div>
        <?php endforeach; ?>
    </div>
</fieldset>
