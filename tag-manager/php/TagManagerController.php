<?php
/**
 * Class TagManagerController
 * @package DevAnime\Estarossa\TagManager
 * @author  DevAnime <devanimecards@gmail.com>
 * @version 1.0
 */

namespace DevAnime\Estarossa\TagManager;

use DevAnime\Config;
use DevAnime\Settings;
use DevAnime\Util;

class TagManagerController
{
    protected $settings;
    protected $gtm_containers = [];
    protected $globalState = [];
    protected $additionalTags = [];

    public function __construct()
    {
        $this->settings = new Settings([
            'ver' => '1.0.0'
        ], __DIR__);

        new Config([
            'config_files' => [
                $this->settings->base_dir . 'config/gtm.json'
            ],
            'acf_paths'    => $this->settings->base_dir . 'config/acf'
        ]);
        add_action('template_redirect', [$this, 'init'], 20);
    }

    public function init()
    {
        $this->gtm_containers = array_filter((array)get_field('estarossa_tagmanager_ids', 'options'));
        $globalState = get_field('estarossa_tagmanager_global_state', 'options');
        if (! empty($globalState)) {
            foreach ($globalState as $state) {
                $this->globalState[Util::toCamelCase(str_replace('-', '_',
                    sanitize_title($state['key'])))] = $state['value'];
            }
        }
        $this->gtm_containers = apply_filters('tagmanager/gtm-id', $this->gtm_containers);
        if ($this->gtm_containers && apply_filters('tagmanager/enable-gtm', true)) {
            add_action('wp_head', [$this, 'addHeadSnippet'], 1);
            add_action('wp_body_open', [$this, 'addBodySnippet']);
            add_action('after_opening_body', [$this, 'addBodySnippet']);
            add_action('wp_footer', [$this, 'setState'], 1000);
        }
        $this->additionalTags =  array_filter(array_map(function($item){
            return $item['tag'];
        }, get_field('estarossa_tagmanager_additional_tags', 'options') ?: []));
    }

    public function addHeadSnippet()
    {
        foreach ($this->additionalTags as $tag) {
            echo $tag;
        }
        foreach ($this->gtm_containers as $container) {
            echo Util::getTemplateScoped('templates/head-snippet', $container, $this->settings->base_dir);
        }
    }

    public function addBodySnippet()
    {
        foreach ($this->gtm_containers as $container) {
            echo Util::getTemplateScoped('templates/body-snippet', $container, $this->settings->base_dir);
        }
    }

    public function setState()
    {
        /**
         * @var \WP_Query $wp_query
         * @var \WP_Post  $post
         */
        global $post;
        global $wp_query;
        $state = [];
        if (is_singular()) {
            $state = [
                'pageTitle' => get_the_title(),
                'pageSlug'  => $post->post_name,
                'postType'  => get_post_type(),
            ];
        }
        if (is_archive()) {
            $state = [
                'pageTitle' => get_the_archive_title(),
                'pageSlug' => 'archive',
                'postType' => $wp_query->get('post_type')
            ];
        }
        if (is_search()) {
            $state = [
                'pageTitle' => 'Search',
                'pageSlug' => 'search',
                'postType' => $wp_query->get('post_type')
            ];
        }
        if (is_home()) {
            $state = [
                'pageTitle' => 'Posts',
                'pageSlug' => 'posts',
                'postType' => 'post'
            ];
        }
        $urlparts = parse_url(home_url());
        $this->globalState = array_merge(['domain' => $urlparts['host']], $this->globalState, $state);
        $this->globalState = apply_filters('tagmanager/current-state',
            apply_filters('estarossa/gtm/current-state', $this->globalState)
        );
        if (! empty($this->globalState)) {
            echo '<script>dataLayer.push({state:' . json_encode($this->globalState) . '});</script>';
        }
    }
}
