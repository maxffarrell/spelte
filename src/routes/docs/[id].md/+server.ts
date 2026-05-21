import { error, text } from '@sveltejs/kit';
import { allDocItems, getDoc } from '$lib/doc';
import { absoluteUrl } from '$lib/metadata';
import { getDocSource } from '$lib/server/source-files';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return allDocItems().map((item) => ({ id: item.id }));
};

export const GET: RequestHandler = async ({ params }) => {
	const item = getDoc(params.id);
	const content = getDocSource(params.id);

	if (!item || !content) {
		error(404, 'Not found');
	}

	return text(`# ${item.title}

> ${item.description}

Source: ${absoluteUrl(`/docs/${params.id}`)}

${content}
`);
};
