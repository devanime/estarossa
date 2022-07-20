<?php
/**
 * Expected:
 * @var string $title
 * @var string $date_range
 * @var string $date_replacement_text
 * @var string $venue_name
 * @var string $venue_url
 * @var string $cta
 */

use DevAnime\Util;
use DevAnime\View\Link;
?>

<div <?= Util::componentAttributes('tour-city', [], ['role' => 'row']); ?>>
    <div class="tour-city__column tour-city__column--city" role="cell"><?= $title; ?></div>
    <div class="tour-city__column tour-city__column--date" role="cell"><?= $date_replacement_text ?: $date_range; ?></div>
    <div class="tour-city__column tour-city__column--venue" role="cell"><?= $venue_url ? new Link($venue_url, $venue_name, ['target' => '_blank']) : $venue_name; ?></div>
    <div class="tour-city__column tour-city__column--cta" role="cell"><?= $cta; ?></div>
</div>
