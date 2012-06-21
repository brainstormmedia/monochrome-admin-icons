<?php
/*
Plugin Name: Monochrome Admin Icons
Description: Make third-party admin icons behave like WordPress default icons: Monochrome when inactive, color when active or hovered.
Version: 1.0
Author: Brainstorm Media
Author URI: http://brainstormmedia.com
*/

add_action('admin_init', 'storm_monochrome_admin_icons');

function storm_monochrome_admin_icons(){
	wp_enqueue_script('monochrome-admin-icons', plugin_dir_url( __FILE__ ).'monochrome.js', array('jquery'), '1.0', false);
}