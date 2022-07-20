<?php
/**
 * Expected:
 * @var NavLink[] $items
 * @var array $config
 */
use DevAnime\View\Element;
use DevAnime\View\Link;
use DevAnime\Estarossa\SubNav\NavLink;

global $post;
$classes = array_map(function($class) {
    return 'sub-nav--' . $class;
}, $config); ?>

<div class="sub-nav <?= implode(' ', $classes); ?>">
    <ul class="sub-nav__list" role="tablist">
        <?php
            foreach($items as $item) {
                $content = $item->isActive() ?
                    Element::create('span', $item->title, $item->getAttributes())->attribute('aria-selected', 'true') :
                    new Link($item->url, $item->title, $item->getAttributes());
                $attrs = [
                    'class' => ['sub-nav__item'],
                    'role' => 'presentation'
                ];
                if ($item->isActive()) {
                    $attrs['class'][] = 'sub-nav__item--active';
                    $attrs['role'] = 'heading';
                    $attrs['aria-level'] = '2';
                }
                echo Element::create('li', $content, $attrs);
            }
            ?>
    </ul>
</div>
