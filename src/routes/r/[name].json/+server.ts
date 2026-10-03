import { error } from '@sveltejs/kit';
import { getRegistry, getRegistryItem } from '#lib/registry.js';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => [
	{ name: 'registry' },
	...getRegistry().items.map((item) => ({ name: item.name })),
];

export function GET({ params }) {
	if (params.name === 'registry') {
		return Response.json(getRegistry());
	}

	const item = getRegistryItem(params.name);
	if (!item) {
		error(404, 'Registry item not found');
	}

	return Response.json(item);
}
