import { error } from '@sveltejs/kit';
import { allDocItems, getDoc, getDocSchema } from '$lib/doc';
import { getRegistryItem } from '$lib/registry';
import { getTableOfContents } from '$lib/toc';
import { readFile } from 'fs/promises';
import { join } from 'path';
import type { EntryGenerator, PageServerLoad } from './$types';

function removeExamplesSection(content: string) {
	const lines = content.split('\n');
	const nextLines: string[] = [];
	let skipping = false;

	for (const line of lines) {
		if (line.trim().toLowerCase() === '## examples') {
			skipping = true;
			continue;
		}
		if (skipping && /^##\s+/.test(line)) {
			skipping = false;
		}
		if (!skipping) nextLines.push(line);
	}

	return nextLines.join('\n');
}

const renderedExampleDocs = new Set([
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
	'animated-gradient',
]);

export const entries: EntryGenerator = () => {
	return allDocItems().map((item) => ({ id: item.id }));
};

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
	let registrySource = '';

	try {
		const docPath = join(process.cwd(), 'src', 'docs', id, 'doc.md');
		rawContent = await readFile(docPath, 'utf-8');
		toc = getTableOfContents(
			renderedExampleDocs.has(id) ? removeExamplesSection(rawContent) : rawContent
		);
	} catch {
		// doc file may not exist yet
	}

	const registryItem = getRegistryItem(id);
	const componentFile = registryItem?.files.find((file) => file.type === 'registry:component');
	if (componentFile) {
		try {
			registrySource = await readFile(join(process.cwd(), componentFile.path), 'utf-8');
		} catch {
			registrySource = '';
		}
	}

	const schema = getDocSchema();
	const gettingStarted = schema.find((s) => s.title === 'Getting Started');
	const isGettingStarted = gettingStarted?.items.some((i) => i.id === id) ?? false;
	if (!isGettingStarted) {
		toc = [{ title: 'Installation', url: '#installation', depth: 2 }, ...toc];
	}

	return { item, prevDoc, nextDoc, toc, rawContent, registrySource, id, isGettingStarted };
};
