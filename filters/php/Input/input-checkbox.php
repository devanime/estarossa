<?php
/**
 * @var string $group
 * @var string $field_name
 * @var string $id
 * @var string $label
 * @var array  $config
 */

use DevAnime\Producers\Filter\Values\FilterableItem;
?>

<fieldset class="filters__item filters__item--checkbox" id="<?=$id ?>_field">
    <legend class="filters__label"><?= $label; ?></legend>
    <div class="filters__checkboxes" data-skip-nav="Skip Filters">
        <?php foreach ($config['options'] as $item): /* @var FilterableItem $item */ ?>
            <?php
                $value = $item->getValue();
                $item_label = $item->getLabel();
                $input_id = "{$id}_{$value}"
            ?>
            <div class="filters__checkbox">
                <input class="filters__checkbox" type="checkbox" id="<?= $input_id ?>" name="<?= $field_name; ?>" value="<?= $value; ?>" />
                <label for="<?= $input_id ?>"><?= $item_label; ?></label>
            </div>
        <?php endforeach; ?>
    </div>
</fieldset>
