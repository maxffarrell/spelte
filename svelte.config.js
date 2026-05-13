import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsx } from 'mdsx';
import { mdsxConfig } from './mdsx.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [mdsx(mdsxConfig), vitePreprocess()],
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
