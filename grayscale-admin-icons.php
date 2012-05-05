<?php
/*
Plugin Name: Grayscale Admin Icons
Description: Make third-party admin icons behave like WordPress default icons: Grayscale when inactive, color when active or hovered over.
Version: 1.0
Author: Brainstorm Media
Author URI: http://brainstormmedia.com
*/

add_action('admin_init', 'storm_grayscale_admin_icons');

function storm_grayscale_admin_icons(){
	wp_enqueue_script('grayscale', plugin_dir_url( __FILE__ ).'grayscale.js', array('jquery'), '1.0', true);
}