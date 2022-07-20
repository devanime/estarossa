<?php
/**
 * Expected:
 * @var string $headline
 * @var array $cities
 * @var array $class_modifiers
 * @var array $element_attributes
 */

use DevAnime\Estarossa\Tour\TourCityView;
use DevAnime\Util; ?>

<div <?= Util::componentAttributes('tour-list', $class_modifiers, $element_attributes); ?>>
    <?php if ($headline): ?>
        <div class="tour-list__headline">
            <?= Util::wrapElement($headline, 'h2'); ?>
        </div>
    <?php endif; ?>
    <div class="tour-list__headers" role="rowgroup">
        <div class="tour-list__row" role="row">
            <span class="tour-list__column tour-list__column--city" role="columnheader">City</span>
            <span class="tour-list__column tour-list__column--date" role="columnheader">Dates</span>
            <span class="tour-list__column tour-list__column--venue" role="columnheader">Venue</span>
            <span class="tour-list__column tour-list__column--cta" role="columnheader">Tickets</span>
        </div>
    </div>
    <div class="tour-list__list" role="rowgroup">
        <?php foreach ($cities as $TourCity) : /* TourCity $TourCity */ ?>
            <?= TourCityView::createFromTourCity($TourCity); ?>
        <?php endforeach; ?>
    </div>
</div>
