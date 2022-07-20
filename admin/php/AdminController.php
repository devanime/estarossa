<?php
/**
 * Class AdminController
 * @package DevAnime\Estarossa\Admin
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\Admin;

class AdminController
{
    const VER = "1.0.1";

    public function __construct()
    {
        add_action('admin_enqueue_scripts', [$this, 'enqueueScript']);
    }

    public function enqueueScript()
    {
        wp_enqueue_script('estarossa/admin', plugin_dir_url(__DIR__) . 'dist/admin.min.js', [], self::VER, true);
        wp_enqueue_style('estarossa/seo', plugin_dir_url(__DIR__) . 'css/seo-preview.css', [], self::VER);
    }
}
