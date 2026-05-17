import { json, error } from '@sveltejs/kit';
import { getRegistry, getRegistryItem } from '$lib/registry';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => [
	{ name: 'registry' },
	...getRegistry().items.map((item) => ({ name: item.name })),
];

export function GET({ params }) {
	if (params.name === 'registry') {
		return json(getRegistry());
	}

	const item = getRegistryItem(params.name);
	if (!item) {
		error(404, 'Registry item not found');
	}

	return json(item);
}
