import { basicDoc } from '$lib/basic-doc';
import { getRegistry } from '$lib/registry';
import type { DocItem, DocSchema, RegistryItem } from '$lib/types';

const COMPONENTS_CATEGORIES = ['components', 'other', 'display'] as const;
const COMPONENTS_ORDER = [
	'chart',
	'perspective-book',
	'badge',
	'kbd',
	'marquee',
	'tweet',
	'spotify-card',
	'logos-carousel',
	'qr-code',
	'fallback-avatar',
];
const CATEGORY_ITEM_ORDER: Record<string, string[]> = {
	animation: [
		'blur-reveal',
		'special-text',
		'shimmer-text',
		'highlighted-text',
		'slide-up-text',
		'text-marquee',
		'words-stagger',
		'signature',
		'randomized-text',
		'gradient-wave-text',
	],
	button: ['rich-button', 'flow-button', 'copy-button', 'pop-button'],
	input: ['color-selector', 'label-input', 'animated-checkbox', 'exploding-input'],
	feedback: ['spinner', 'bars-spinner'],
	background: ['light-rays', 'animated-gradient'],
	interactive: ['tilt-card'],
};

const CATEGORY_LABELS: Record<string, string> = {
	animation: 'Text Animations',
	input: 'Inputs',
	button: 'Buttons',
	feedback: 'Feedback',
	background: 'Backgrounds',
	interactive: 'Interactive',
};

const CATEGORY_ORDER = ['animation', 'button', 'input', 'feedback', 'background', 'interactive'];

function toDocItem(item: RegistryItem): DocItem {
	return {
		id: item.name,
		title: item.title,
		description: item.description,
		meta: item.meta,
	};
}

function groupByCategory(items: RegistryItem[]) {
	const groups = new Map<string, DocItem[]>();
	for (const item of items) {
		const key = item.category ?? 'other';
		const doc = toDocItem(item);
		groups.set(key, [...(groups.get(key) ?? []), doc]);
	}
	return groups;
}

function sortDocs(items: DocItem[], order: string[]) {
	return [...items].sort((a, b) => {
		const aIndex = order.indexOf(a.id);
		const bIndex = order.indexOf(b.id);
		if (aIndex === -1 && bIndex === -1) return 0;
		if (aIndex === -1) return 1;
		if (bIndex === -1) return -1;
		return aIndex - bIndex;
	});
}

export const getDocSchema = (): DocSchema => {
	const { items } = getRegistry();
	const components = items.filter((i) => i.type === 'registry:component');
	const byCategory = groupByCategory(components);

	const componentsItems = (COMPONENTS_CATEGORIES as readonly string[]).flatMap(
		(key) => byCategory.get(key) ?? []
	);
	const orderedKeys = CATEGORY_ORDER.filter((k) => byCategory.has(k));
	const extraKeys = [...byCategory.keys()].filter(
		(k) =>
			!(COMPONENTS_CATEGORIES as readonly string[]).includes(k) &&
			!CATEGORY_ORDER.includes(k)
	);

	const componentGroups: DocSchema = [
		{ title: 'Components', items: sortDocs(componentsItems, COMPONENTS_ORDER) },
		...orderedKeys
			.concat(extraKeys)
			.map((key) => ({
				title: CATEGORY_LABELS[key] ?? key,
				items: sortDocs(byCategory.get(key) ?? [], CATEGORY_ITEM_ORDER[key] ?? []),
			}))
			.filter((g) => g.items.length > 0),
	];

	return [...basicDoc, ...componentGroups];
};

export const allDocItems = (): DocItem[] => {
	const schema = getDocSchema();
	return schema.flatMap((section) => section.items);
};

export const getDoc = (id: string): DocItem | undefined => {
	return allDocItems().find((item) => item.id === id);
};
