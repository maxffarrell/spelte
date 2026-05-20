import { error, text } from '@sveltejs/kit';
import { allDocItems, getDoc } from '$lib/doc';
import { absoluteUrl } from '$lib/metadata';
import { readFile } from 'fs/promises';
import { join } from 'path';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return allDocItems().map((item) => ({ id: item.id }));
};

export const GET: RequestHandler = async ({ params }) => {
	const item = getDoc(params.id);

	if (!item) {
		error(404, 'Not found');
	}

	try {
		const content = await readFile(
			join(process.cwd(), 'src', 'docs', params.id, 'doc.md'),
			'utf-8'
		);

		return text(`# ${item.title}

> ${item.description}

Source: ${absoluteUrl(`/docs/${params.id}`)}

${content}
`);
	} catch {
		error(404, 'Not found');
	}
};
