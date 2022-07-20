<?php
/**
 * Expected:
 * @var array $tabs
 * @var string $subnav_styles
 * @var array $grids
 * @var array $css_modifiers
 * @var array $data_attributes
 */

use DevAnime\Producers\Talent\TalentGrid;
use DevAnime\Estarossa\Talent\TalentCardWrapperView;
use DevAnime\Estarossa\SubNav\SubNavView;
use DevAnime\Util;

if (empty($tabs)) {
    return;
} ?>

<div <?= Util::componentAttributes('talent-container', $css_modifiers, $data_attributes); ?>>
    <div class="talent-container__tabs">
        <?= SubNavView::create($tabs, [$subnav_styles]); ?>
    </div>
    <div class="talent-container__grids">
        <?php foreach ($grids as $key => $TalentGrid): /* @var TalentGrid $TalentGrid */ ?>
            <?php if ($TalentGrid->hasRows()) : ?>
                <?php
                    $type = $TalentGrid->getTalentTypeSlug();
                    $attributes = [
                        'class' => Util::componentClasses('talent-container__grid', [$type]),
                        'data-toggle-target' => $type
                    ];
                    if ($key == 0 ) {
                        $attributes['data-toggle-default'] = null;
                    }
                ?>
                <!-- TODO: In the future (when the need arises), we can add support to make this more flexible.
                Right now it is exclusively used as sr-only text with no override support -->
                <h2 class="sr-only">Talent Card Grid</h2>
                <div <?= Util::arrayToAttributes($attributes); ?>>
                    <?php foreach ($TalentGrid->getRows() as $TalentRow) : ?>
                        <?php if ($TalentRow->hasColumns()): ?>
                            <div class="<?=Util::componentClasses('talent-container__row', $TalentRow->getOptions()); ?>">
                                <?php foreach ($TalentRow->getColumns() as $TalentPost) : ?>
                                    <?= new TalentCardWrapperView($TalentPost, 'talent-container__card'); ?>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        <?php endforeach; ?>
    </div>
</div>
