import { error } from '@sveltejs/kit';
import { allDocItems, getDoc, getDocSchema } from '$lib/doc';
import { getRegistryItem } from '$lib/registry';
import { getPreviewSource, getUsageSource, highlightSvelte } from '$lib/server/preview-source';
import { getDocSource, getRegistrySource } from '$lib/server/source-files';
import { getTableOfContents } from '$lib/toc';
import type { EntryGenerator, PageServerLoad } from './$types';

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
	let registrySourceHtml = '';
	let previewSource = '';
	let previewSourceHtml = '';

	rawContent = getDocSource(id);
	if (rawContent) {
		toc = getTableOfContents(rawContent);
	}

	const registryItem = getRegistryItem(id);
	const componentFile = registryItem?.files.find((file) => file.type === 'registry:component');
	if (componentFile) {
		try {
			registrySource = getRegistrySource(componentFile.path);
			registrySourceHtml = await highlightSvelte(registrySource);
		} catch {
			registrySource = '';
			registrySourceHtml = '';
		}
	}

	try {
		previewSource = (await getPreviewSource(id)) || getUsageSource(rawContent);
		previewSourceHtml = await highlightSvelte(previewSource);
	} catch {
		previewSource = '';
		previewSourceHtml = '';
	}

	const schema = getDocSchema();
	const gettingStarted = schema.find((s) => s.title === 'Getting Started');
	const isGettingStarted = gettingStarted?.items.some((i) => i.id === id) ?? false;
	if (!isGettingStarted) {
		toc = [{ title: 'Installation', url: '#installation', depth: 2 }, ...toc];
	}
	if (id === 'animated-gradient') {
		toc = [
			...toc,
			{ title: 'Props', url: '#props', depth: 2 },
			{ title: 'Custom Config Options', url: '#custom-config-options', depth: 3 }
		];
	}

	return {
		item,
		prevDoc,
		nextDoc,
		toc,
		rawContent,
		registrySource,
		registrySourceHtml,
		previewSource,
		previewSourceHtml,
		id,
		isGettingStarted
	};
};
