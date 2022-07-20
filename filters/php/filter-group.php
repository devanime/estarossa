<?php
/**
 * Expected:
 * @var string $group
 * @var FilterInputCollection $content
 */

use DevAnime\Estarossa\Filters\FilterInputCollection;

?>
<div class="filters" data-filter-group="<?= $group; ?>" data-gtm="filters">
    <?= $content; ?>
</div>
