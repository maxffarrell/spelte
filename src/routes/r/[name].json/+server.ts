import { error } from '@sveltejs/kit';
import { getRegistry, getRegistryItem } from '#lib/registry.js';
import { getRegistrySource } from '#lib/server/source-files.js';
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

	return Response.json({
		...item,
		files: item.files.map((file) => {
			const source = getRegistrySource(file.path);
			if (!source) error(500, 'Registry source not found');

			return {
				...file,
				// Use the consumer's conventional shadcn utility alias.
				content: source.replaceAll('#lib/utils.js', '$lib/utils.js')
			};
		})
	});
}
