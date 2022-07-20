<?php

use DevAnime\Producers\Video\VideoPost;
use DevAnime\Estarossa\Video\VideoThumb;

/**
 * Expected:
 * @var VideoPost $item
 * @var string    $target
 */
?>
<div class="media-carousel__selection__initial"><?= VideoThumb::createFromVideoPost($item, '#' . $target); ?></div>

