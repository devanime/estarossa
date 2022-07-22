<?php

/*
Plugin Name: Estarossa
Description: The frontend library of reusable components for all website builds.
Version: 9999
License: GPL-2.0+
*/

use DevAnime\Estarossa\Admin\AdminController;
use DevAnime\Estarossa\NavMenu\NavMenuController;
use DevAnime\Estarossa\Schema\SchemaController;
use DevAnime\Estarossa\TagManager\TagManagerController;
use DevAnime\View\TemplateView;

define('ESTAROSSA_PLUGIN_VER', '2.0');

if (! defined('USE_COMPOSER_AUTOLOADER') || ! USE_COMPOSER_AUTOLOADER) {
    require __DIR__ . '/vendor/autoload.php';
}
new SchemaController();
add_action('after_setup_theme', function () {
    if(is_admin()) {
        new AdminController();
    }
    if (current_theme_supports('estarossa/nav-menu')) {
        new NavMenuController();
    }
    if (current_theme_supports('estarossa/tag-manager')) {
        new TagManagerController();
    }
    add_filter('meliodas/view/template', function(array $templates, TemplateView $View) {
        $templates[] = 'templates/estarossa/' . $View->getTemplateName();
        return $templates;
    }, 10, 2);
    add_filter('meliodas/defer_gform_scripts', '__return_true');
    add_action('wp_head', function () { ?>
        <script>
            (function(c, d) {
                if (c && c.supports && c.supports('(--a: 0)')) return;
                var s = d.createElement('script'); s.type = 'text/javascript'; s.onload = function() { cssVars(); }; s.setAttribute('src','https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2');
                var t = d.getElementsByTagName('script')[0]; t.parentNode.insertBefore(s, t);
            })(window.CSS, document);
        </script>
    <?php });
}, 100);
