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

$multi = !empty($config['multi']);
$all_label = apply_filters('estarossa/filters/select/all-label', "-- $all_label --", $field_name, $group);

use DevAnime\Producers\Filter\Values\FilterableItem; ?>

<div class="filters__item filters__item--select" id="<?=$id ?>_field">
    <label class="filters__label" for="<?= $id; ?>"><?= $label; ?></label>
    <select class="filters__select" id="<?= $id; ?>" name="<?= $field_name ?>"<?= $multi ? ' multiple' : ''; ?>>
        <?php if (!$multi): ?>
        <option value=""><?= $all_label ?></option>
        <?php endif; ?>
        <?php foreach ($config['options'] as $item) : /* @var FilterableItem $item */ ?>
            <option value="<?= $item->getValue(); ?>"><?= $item->getLabel(); ?></option>
        <?php endforeach; ?>
    </select>
</div>

