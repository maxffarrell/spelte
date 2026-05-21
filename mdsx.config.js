import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'mdsx';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

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
				/^h[2-4]$/.test(node.tagName ?? '') &&
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

function rehypeCodeBlockA11y() {
	return (tree) => {
		function visit(node) {
			if (!node || typeof node !== 'object') return;

			if (node.type === 'element' && node.tagName === 'pre' && node.properties) {
				delete node.properties.tabindex;
				delete node.properties.tabIndex;
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

function rehypeComponentExample() {
	return (tree) => {
		function visit(node) {
			if (!node || typeof node !== 'object') return;

			if (node.type === 'raw' && /^<ExampleShell\b/.test(node.value)) {
				const name = node.value.match(/\sname="([^"]+)"/)?.[1];
				if (!name || /\ssource=/.test(node.value)) return;

				const source = readExampleSource(name);
				if (!source) return;

				node.value = node.value.replace(
					/^(<ExampleShell\b[^>]*)(>)/,
					`$1 source={${JSON.stringify(escapeSvelteSource(source))}}$2`,
				);
			}

			if (Array.isArray(node.children)) {
				for (let childIndex = 0; childIndex < node.children.length; childIndex += 1) {
					visit(node.children[childIndex]);
				}
			}
		}

		visit(tree);
	};
}

function escapeSvelteSource(source) {
	return source.replaceAll('</script>', '<\\/script>');
}

function readExampleSource(name) {
	if (!/^[a-z0-9-]+\/[a-z0-9-]+$/.test(name)) return '';

	try {
		return readFileSync(
			join(process.cwd(), 'src/lib/components/examples', `${name}.svelte`),
			'utf-8',
		).trim();
	} catch {
		return '';
	}
}

export const mdsxConfig = defineConfig({
	extensions: ['.md'],
	svelteConfigPath: false,
	remarkPlugins: [remarkGfm],
	rehypePlugins: [
		rehypeComponentExample,
		rehypeHeadingIds,
		[rehypePrettyCode, prettyCodeOptions],
		rehypeCodeBlockA11y,
	],
	blueprints: {
		default: {
			path: new URL('./src/lib/blueprints/default.svelte', import.meta.url).pathname,
		},
	},
});
