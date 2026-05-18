import { codeToHtml } from 'shiki';
import { readFile } from 'fs/promises';
import { join } from 'path';

const demoSourceFiles: Record<string, string> = {
	'exploding-input': 'src/lib/components/demos/exploding-input-demo.svelte',
	'pop-button': 'src/lib/components/demos/pop-button-demo.svelte',
	signature: 'src/lib/components/demos/signature-demo.svelte',
	'spotify-card': 'src/lib/components/demos/spotify-card-demo.svelte',
	tweet: 'src/lib/components/demos/tweet-demo.svelte'
};

function dedent(source: string) {
	const lines = source.replace(/\t/g, '    ').replace(/\s+$/g, '').split('\n');
	const nonEmpty = lines.filter((line) => line.trim().length > 0);
	if (nonEmpty.length === 0) return '';
	const indent = Math.min(
		...nonEmpty.map((line) => {
			const match = line.match(/^ */);
			return match?.[0].length ?? 0;
		})
	);

	return lines.map((line) => line.slice(indent)).join('\n').trim();
}

function extractBranch(source: string, id: string) {
	const branchStart = new RegExp(`\\{(?:(?:#if)|(?::else if)) id === "${id}"\\}`);
	const match = branchStart.exec(source);
	if (!match) return '';

	const start = match.index + match[0].length;
	const rest = source.slice(start);
	const nextBranch = rest.search(/\n\s*\{:(?:else if|else)\b|\n\s*\{\/if\}/);
	const branch = nextBranch === -1 ? rest : rest.slice(0, nextBranch);

	return dedent(branch);
}

export function getUsageSource(content: string) {
	const usageStart = content.search(/^##\s+Usage\s*$/im);
	if (usageStart === -1) return '';

	const usageContent = content.slice(usageStart);
	const nextSection = usageContent.slice(1).search(/\n##\s+/);
	const section = nextSection === -1 ? usageContent : usageContent.slice(0, nextSection + 1);
	const fence = section.match(/(?:```|~~~)svelte\s*\n([\s\S]*?)\n(?:```|~~~)/i);

	return dedent(fence?.[1] ?? '');
}

export async function getPreviewSource(id: string) {
	const demoSourceFile = demoSourceFiles[id];
	if (demoSourceFile) {
		const source = await readFile(join(process.cwd(), demoSourceFile), 'utf-8');
		return dedent(source);
	}

	const previewSource = await readFile(
		join(process.cwd(), 'src/lib/components/component-preview.svelte'),
		'utf-8'
	);

	return extractBranch(previewSource, id);
}

export async function highlightSvelte(source: string) {
	if (!source) return '';

	return codeToHtml(source, {
		lang: 'svelte',
		themes: {
			dark: 'github-dark',
			light: 'github-light'
		}
	});
}

function readQuoted(source: string, index: number) {
	const quote = source[index];
	let value = '';

	for (let i = index + 1; i < source.length; i += 1) {
		const char = source[i];
		if (char === '\\') {
			value += char + (source[i + 1] ?? '');
			i += 1;
			continue;
		}
		if (char === quote) {
			return { value, end: i + 1 };
		}
		value += char;
	}

	return null;
}

function readBalanced(source: string, index: number) {
	let depth = 0;
	let value = '';

	for (let i = index; i < source.length; i += 1) {
		const char = source[i];

		if (char === '"' || char === "'" || char === '`') {
			const quoted = readQuoted(source, i);
			if (!quoted) return null;
			value += source.slice(i, quoted.end);
			i = quoted.end - 1;
			continue;
		}

		if (char === '{') {
			if (depth > 0) value += char;
			depth += 1;
			continue;
		}

		if (char === '}') {
			depth -= 1;
			if (depth === 0) {
				return { value, end: i + 1 };
			}
			value += char;
			continue;
		}

		value += char;
	}

	return null;
}

function parseAttribute(tag: string, name: string) {
	const match = new RegExp(`${name}=([{"'\`])`).exec(tag);
	if (!match) return '';

	const start = match.index + match[0].length - 1;
	if (tag[start] === '{') {
		const balanced = readBalanced(tag, start);
		if (!balanced) return '';
		const expression = balanced.value.trim();
		try {
			return Function(`"use strict"; return (${expression});`)();
		} catch {
			return '';
		}
	}

	const quoted = readQuoted(tag, start);
	return quoted?.value ?? '';
}

function decodeSource(value: string) {
	return value.replace(/<\\\/script>/g, '</script>');
}

function findTagEnd(source: string, index: number) {
	for (let i = index; i < source.length; i += 1) {
		const char = source[i];
		if (char === '"' || char === "'" || char === '`') {
			const quoted = readQuoted(source, i);
			if (!quoted) return -1;
			i = quoted.end - 1;
			continue;
		}
		if (char === '{') {
			const balanced = readBalanced(source, i);
			if (!balanced) return -1;
			i = balanced.end - 1;
			continue;
		}
		if (char === '>') return i;
	}

	return -1;
}

export async function getExampleSourceHtml(id: string) {
	const source = await readFile(
		join(process.cwd(), 'src/lib/components/component-examples.svelte'),
		'utf-8'
	);
	const branch = extractBranch(source, id);
	const snippets = new Map<string, string>();

	for (const match of branch.matchAll(/<ExampleShell\b/g)) {
		const tagStart = match.index ?? 0;
		const tagEnd = findTagEnd(branch, tagStart);
		if (tagEnd === -1) continue;

		const tag = branch.slice(tagStart, tagEnd + 1);
		const title = parseAttribute(tag, 'title');
		const exampleSource = decodeSource(parseAttribute(tag, 'source'));
		if (!title || !exampleSource) continue;

		snippets.set(title, await highlightSvelte(exampleSource));
	}

	return Object.fromEntries(snippets);
}
