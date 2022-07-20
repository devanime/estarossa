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

use DevAnime\Producers\Filter\Values\FilterableItem;

$all_label = apply_filters('estarossa/filters/select/all-label', "-- $all_label --", $field_name, $group);
$sub_id = "{$group}_sub_{$field_name}";
?>

<fieldset class="filters__item filters__item--split" id="<?= $id ?>_field">
    <legend class="filters__label"><?= $label; ?></legend>
    <select class="filters__select" id="<?= $id; ?>" name="<?= $field_name ?>">
        <option value=""><?= $all_label ?></option>
        <?php foreach ($config['options'] as $item) : /* @var FilterableItem $item */ ?>
            <option value="<?= $item->getValue(); ?>"><?= $item->getLabel(); ?></option>
        <?php endforeach; ?>
    </select>
    <?php if($config_sub_options = $config['sub_options']): ?>
        <div class="filters__checkbox-container">
        <?php foreach ($config_sub_options as $parent_value => $items): /* @var FilterableItem[] $items */ ?>
            <?php foreach ($items as $item): ?>
                <?php
                $value = $item->getValue();
                $input_id = "{$sub_id}_{$value}";
                $sub_field_name = "sub_{$field_name}";
                ?>
                <div class="filters__checkbox filters--hide" data-parent="<?= $parent_value; ?>">
                    <input class="filters__checkbox" type="checkbox" id="<?= $input_id ?>" name="<?= $sub_field_name; ?>" value="<?= $value; ?>" />
                    <label for="<?= $input_id ?>"><?= $item->getLabel(); ?></label>
                </div>
            <?php endforeach; ?>
        <?php endforeach; ?>
        </div>
    <?php endif; ?>

</fieldset>
