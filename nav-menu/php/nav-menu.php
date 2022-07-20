<?php
use DevAnime\Util;
/**
 * Expected:
 *
 * @var string $menu_name
 * @var array $menu_options
 * @var array $config
 */

$list_only = $config['list_only'];

$list = has_nav_menu($menu_name) ? wp_nav_menu($menu_options): '';

$classes = ['nav-menu'];
foreach (array_keys(array_filter($config)) as $value) {
    $classes[] = 'nav-menu--' . str_replace('_', '-', $value);
}
$nav_attr = ['class' => $classes];

if (
    (! isset($menu_options['skip_nav']) || $menu_options['skip_nav'] === true)
    && ($list_only || $config['responsive'])
) {
    $nav_attr['data-skip-nav'] = "Skip Navigation";
}
?>
<nav <?= Util::arrayToAttributes($nav_attr); ?>>
<?php do_action('estarossa/nav-menu/before-list'); ?>
<?php if (!$list_only): ?>
    <div class="nav-menu__overlay">
        <?php do_action('estarossa/nav-menu/before-list-in-overlay'); ?>
        <?= $list; ?>
        <?php do_action('estarossa/nav-menu/after-list-in-overlay'); ?>
    </div>
<?php else: ?>
    <?= $list; ?>
<?php endif; ?>
<?php do_action('estarossa/nav-menu/after-list'); ?>
<?php if (!$list_only): ?>
    <button class="nav-menu__toggle" aria-label="Toggle navigation">
        <span class="nav-menu__toggle-label">Menu</span>
        <span class="nav-menu__toggle-bar" aria-hidden="true"></span>
    </button>
<?php endif; ?>
</nav>
