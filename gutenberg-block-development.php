<?php

/**
 * Plugin Name: Gutenberg Block Development
 * Plugin URI: https://github.com/HelloTalib/gutenberg-block-development
 * Description: Gutenberg Startup plugins for create new blocks
 * Version: 1.0.0
 * Author: TALIB
 * Author URI: https://talib.netlify.app
 * License: GPLv3
 * Text Domain: gutenberg-block-development
 * Domain Path: /languages/
 */

// Stop Direct Access
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Blocks Final Class
 */

final class GUTENBERG_BLOCK_DEVELOPMENT {
	public function __construct() {

		// define constants
		$this->gutenberg_block_define_constants();

		// block initialization
		add_action('init', [$this, 'gutenberg_block_development_init']);

		// blocks category
		if (version_compare($GLOBALS['wp_version'], '5.7', '<')) {
			add_filter('block_categories', [$this, 'gutenberg_block_register_category'], 10, 2);
		} else {
			add_filter('block_categories_all', [$this, 'gutenberg_block_register_category'], 10, 2);
		}

		// enqueue block assets
		add_action('enqueue_block_assets', [$this, 'gutenberg_block_external_libraries']);
	}

	/**
	 * Initialize the plugin
	 */

	public static function init() {
		static $instance = false;
		if (!$instance) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Define the plugin constants
	 */
	private function gutenberg_block_define_constants() {
		define('GBD_VERSION', '1.0.0');
		define('GBD_URL', plugin_dir_url(__FILE__));
		define('GBD_LIB_URL', GBD_URL . 'library/');
	}

	/**
	 * Blocks Registration
	 */

	public function gutenberg_block_register($name, $options = array()) {
		register_block_type(__DIR__ . '/build/blocks/' . $name, $options);
	}

	/**
	 * Blocks Initialization
	 */
	public function gutenberg_block_development_init() {
		// register single block
		$this->gutenberg_block_register('startup');
	}

	/**
	 * Register Block Category
	 */

	public function gutenberg_block_register_category($categories, $post) {
		return array_merge(
			array(
				array(
					'slug'  => 'gutenberg-block-development',
					'title' => __('Gutenberg Block Development', 'gutenberg-block-development'),
				),
			),
			$categories,
		);
	}

	/**
	 * Enqueue Block Assets
	 */
	public function gutenberg_block_external_libraries() {
		// enqueue JS
		wp_enqueue_script('external-js', GBD_LIB_URL . 'js/plugin.js', array(), GBD_VERSION, true);
	}
}

/**
 * tech
 */

GUTENBERG_BLOCK_DEVELOPMENT::init();
