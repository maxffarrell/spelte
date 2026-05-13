import { error } from '@sveltejs/kit';
import { allDocItems, getDoc } from '$lib/doc';
import { getTableOfContents } from '$lib/toc';
import { readFile } from 'fs/promises';
import { join } from 'path';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	const item = getDoc(id);

	if (!item) {
		error(404, 'Not found');
	}

	const allItems = allDocItems();
	const currentIndex = allItems.findIndex((doc) => doc.id === id);
	const prevDoc = currentIndex > 0 ? allItems[currentIndex - 1] : null;
	const nextDoc = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

	let toc: { title: string; url: string; depth: number }[] = [];
	let rawContent = '';

	try {
		const docPath = join(process.cwd(), 'src', 'docs', id, 'doc.md');
		rawContent = await readFile(docPath, 'utf-8');
		toc = getTableOfContents(rawContent);
	} catch {
		// doc file may not exist yet
	}

	return { item, prevDoc, nextDoc, toc, rawContent, id };
};
