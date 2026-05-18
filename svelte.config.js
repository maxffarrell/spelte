import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsx } from 'mdsx';
import { mdsxConfig } from './mdsx.config.js';

const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [mdsx(mdsxConfig), vitePreprocess()],
	vitePlugin: {
		inspector: {
			showToggleButton: 'always',
			toggleButtonPos: 'top-right',
		},
	},
	kit: {
		adapter: adapter(),
		alias: {
			$lib: './src/lib',
			$components: './src/lib/components',
			$registry: './src/registry',
		},
	},
};

export default config;
