import { defineConfig } from 'mdsx';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
	theme: {
		dark: 'github-dark',
		light: 'github-light',
	},
};

function getNodeText(node) {
	if (!node) return '';
	if (node.type === 'text') return node.value ?? '';
	if (!Array.isArray(node.children)) return '';

	return node.children.map(getNodeText).join('');
}

function slugify(value) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}

function rehypeHeadingIds() {
	return (tree) => {
		const slugs = new Map();

		function visit(node) {
			if (!node || typeof node !== 'object') return;

			if (
				node.type === 'element' &&
				/^h[2-4]$/.test(node.tagName) &&
				!node.properties?.id
			) {
				const baseSlug = slugify(getNodeText(node));

				if (baseSlug) {
					const count = slugs.get(baseSlug) ?? 0;
					slugs.set(baseSlug, count + 1);
					node.properties = {
						...node.properties,
						id: count === 0 ? baseSlug : `${baseSlug}-${count}`,
					};
				}
			}

			if (Array.isArray(node.children)) {
				for (const child of node.children) {
					visit(child);
				}
			}
		}

		visit(tree);
	};
}

export const mdsxConfig = defineConfig({
	extensions: ['.md'],
	rehypePlugins: [rehypeHeadingIds, [rehypePrettyCode, prettyCodeOptions]],
	blueprints: {
		default: {
			path: new URL('./src/lib/blueprints/default.svelte', import.meta.url).pathname,
		},
	},
});
