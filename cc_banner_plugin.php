<?php
/**
 * Plugin Name: Cookie consent management plugin
 * Plugin URI: http://carmenweb.com/
 * Description: This WP plugin insert a CC banner with consent mode v2
 * Version: 1.0
 * Author: devcarme
 * Author URI: http://carmenweb.com/
 * License: GPL2
 */

// avoid direct access
if (!defined('ABSPATH')) {
    exit;
}

// Adding style sheet and js functions
function add_style_and_scripts() {
    wp_enqueue_style('cc-banner-plugin-style', plugin_dir_url(__FILE__) . 'css/cc_banner_style.css');
    wp_enqueue_script('cc-banner-plugin-scripts', plugin_dir_url(__FILE__) . 'js/cc_banner_js_script.js', array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'add_style_and_scripts');

//Include cookie banner
function show_cookie_banner() {
    include plugin_dir_path(__FILE__) . 'templates/cookie_banner_template.php';
}
add_action('wp_footer', 'show_cookie_banner');