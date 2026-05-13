import { defineConfig } from 'mdsx';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
	theme: {
		dark: 'github-dark',
		light: 'github-light',
	},
};

export const mdsxConfig = defineConfig({
	extensions: ['.md'],
	rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
	blueprints: {
		default: {
			path: new URL('./src/lib/blueprints/default.svelte', import.meta.url).pathname,
		},
	},
});
