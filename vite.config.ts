import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsx } from 'mdsx';
import { mdsxConfig } from './mdsx.config.js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			extensions: ['.svelte', '.md'],
			preprocess: [mdsx(mdsxConfig), vitePreprocess()],
			inspector: { showToggleButton: 'always', toggleButtonPos: 'top-right' },
			adapter: adapter(),
			alias: {
				$components: './src/lib/components',
				$registry: './src/registry'
			}
		})
	]
});
