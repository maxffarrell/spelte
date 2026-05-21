const docSources = import.meta.glob('/src/docs/*/doc.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

const registrySources = import.meta.glob('/src/registry/spelte/*.svelte', {
	query: '?raw',
	import: 'default',
	eager: true
});

const demoSources = import.meta.glob('/src/lib/components/demos/*-demo.svelte', {
	query: '?raw',
	import: 'default',
	eager: true
});

function sourceFromGlob(sources: Record<string, unknown>, path: string) {
	const source = sources[path];
	return typeof source === 'string' ? source : '';
}

export function getDocSource(id: string) {
	return sourceFromGlob(docSources, `/src/docs/${id}/doc.md`);
}

export function getRegistrySource(path: string) {
	return sourceFromGlob(registrySources, `/${path}`);
}

export function getDemoSource(path: string) {
	return sourceFromGlob(demoSources, `/${path}`);
}
