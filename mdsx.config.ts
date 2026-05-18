import { defineConfig } from 'mdsx';
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

type HastNode = {
	type?: string;
	value?: string;
	tagName?: string;
	properties?: Record<string, unknown>;
	children?: HastNode[];
};

const prettyCodeOptions: RehypePrettyCodeOptions = {
	theme: {
		dark: 'github-dark',
		light: 'github-light',
	},
};

function getNodeText(node: HastNode | undefined): string {
	if (!node) return '';
	if (node.type === 'text') return node.value ?? '';
	if (!Array.isArray(node.children)) return '';

	return node.children.map(getNodeText).join('');
}

function slugify(value: string): string {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}

function rehypeHeadingIds() {
	return (tree: HastNode) => {
		const slugs = new Map<string, number>();

		function visit(node: HastNode | undefined) {
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
	return (tree: HastNode) => {
		function visit(node: HastNode | undefined) {
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

function rehypeRemoveExamplesSection() {
	const supported = new Set([
		'badge',
		'flow-button',
		'color-selector',
		'spinner',
		'blur-reveal',
		'highlighted-text',
		'kbd',
		'label-input',
		'marquee',
		'fallback-avatar',
		'qr-code',
		'randomized-text',
		'rich-button',
		'shimmer-text',
		'slide-up-text',
		'special-text',
		'words-stagger',
		'chart',
		'copy-button',
	]);

	return (tree: HastNode, file: { path?: string; history?: string[] }) => {
		const path = file.path ?? file.history?.[0] ?? '';
		const match = path.match(/src\/docs\/([^/]+)\/doc\.md$/);
		if (!match || !supported.has(match[1])) return;
		if (!Array.isArray(tree.children)) return;

		const children = tree.children;
		const nextChildren: HastNode[] = [];
		let skipping = false;

		for (const child of children) {
			if (child.type === 'element' && child.tagName === 'h2') {
				const text = getNodeText(child).trim().toLowerCase();
				if (text === 'examples') {
					skipping = true;
					continue;
				}
				skipping = false;
			}

			if (!skipping) {
				nextChildren.push(child);
			}
		}

		tree.children = nextChildren;
	};
}

export const mdsxConfig = defineConfig({
	extensions: ['.md'],
	svelteConfigPath: false,
	remarkPlugins: [remarkGfm],
	rehypePlugins: [
		rehypeRemoveExamplesSection,
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
