import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Run against `pnpm preview` after building the app.
const base = process.argv[2] ?? 'http://127.0.0.1:4173';
const registry = JSON.parse(await readFile(new URL('../registry.json', import.meta.url), 'utf8'));
const docs = ['introduction', 'components', ...registry.items.map((item) => item.name)];
const paths = [
	'/',
	...docs.flatMap((id) => [`/docs/${id}/`, `/docs/${id}.md`]),
	'/r/registry.json',
	...registry.items.map((item) => `/r/${item.name}.json`)
];

for (const path of paths) {
	const response = await fetch(new URL(path, base));
	assert.equal(response.status, 200, path);
	const body = await response.text();
	assert.ok(body.length, `${path}: empty response`);
	if (!path.startsWith('/r/') || path === '/r/registry.json') continue;

	const item = JSON.parse(body);
	const expected = registry.items.find((entry) => entry.name === item.name);
	assert.equal(item.files.length, expected.files.length, `${path}: missing files`);
	for (const file of item.files) {
		const source = await readFile(new URL(`../${file.path}`, import.meta.url), 'utf8');
		assert.equal(file.content, source.replaceAll('#lib/utils.js', '$lib/utils.js'), file.path);
		assert.ok(!file.content.includes('#lib/'), `${path}: repository-specific import`);
		if (file.type === 'registry:file') assert.ok(file.target, `${path}: missing install target`);
	}
}

for (const path of ['/docs/nonexistent/', '/r/nonexistent.json']) {
	assert.equal((await fetch(new URL(path, base))).status, 404, path);
}
console.log(`${paths.length} production routes passed; unknown IDs return 404`);
