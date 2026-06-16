import { error, text } from '@sveltejs/kit';
import { allDocItems, getDoc } from '$lib/doc';
import { absoluteUrl } from '$lib/metadata';
import { getRegistryItem } from '$lib/registry';
import { getDocSource, getExamplePaths } from '$lib/server/source-files';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return allDocItems().map((item) => ({ id: item.id }));
};

function toPascalCase(value: string) {
	return value
		.split(/[-/]/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('');
}

function toTitle(value: string) {
	return value
		.split('-')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

function extractSection(content: string, title: string) {
	const pattern = new RegExp(`^##\\s+${title}\\s*$`, 'im');
	const match = pattern.exec(content);
	if (!match) return '';

	const start = match.index;
	const afterHeading = content.slice(start + match[0].length);
	const next = afterHeading.search(/\n##\s+/);
	return `${match[0]}${next === -1 ? afterHeading : afterHeading.slice(0, next)}`.trim();
}

function buildDemoCanvas(componentName: string, filePath: string) {
	return `<DemoCanvas>
  <DemoPreview>
    <${componentName} />
  </DemoPreview>
  <DemoCode>
    \`\`\`svelte file=${filePath}
    \`\`\`
  </DemoCode>
</DemoCanvas>`;
}

function buildGeneratedMarkdown(id: string, title: string, description: string, content: string) {
	const registryItem = getRegistryItem(id);
	if (!registryItem || registryItem.type !== 'registry:component') {
		return `# ${title}

> ${description}

Source: ${absoluteUrl(`/docs/${id}`)}

${content}
`;
	}

	const componentName = toPascalCase(id);
	const registryPath =
		registryItem.files.find((file) => file.type === 'registry:component')?.path ??
		`src/registry/spelte/${id}.svelte`;
	const markdownRegistryPath = registryPath.replace(/^src\//, '');
	const examplePaths = getExamplePaths(id);
	const imports = [
		`import ${componentName}Demo from './demo.svelte'`,
		...examplePaths.map((path) => {
			const name = path.split('/').pop()?.replace(/\.svelte$/, '') ?? 'example';
			return `import ${componentName}${toPascalCase(name)}Example from './${name}.svelte'`;
		})
	];
	const usage = extractSection(content, 'Usage');
	const props = extractSection(content, 'Props');
	const extraSections = ['Notes', 'Required API Route', 'Font Setup (Optional)', 'Inspiration']
		.map((section) => extractSection(content, section))
		.filter(Boolean);

	return `${imports.join('\n')}

${buildDemoCanvas(`${componentName}Demo`, './demo.svelte')}

## Installation

<InstallationTabs item="${id}">
\`\`\`svelte file=../../${markdownRegistryPath}
\`\`\`
</InstallationTabs>
${examplePaths.length > 0 ? `\n## Examples\n\n${examplePaths
	.map((path) => {
		const name = path.split('/').pop()?.replace(/\.svelte$/, '') ?? 'example';
		const title = toTitle(name);
		return `### ${title}

${buildDemoCanvas(`${componentName}${toPascalCase(name)}Example`, `./${name}.svelte`)}`;
	})
	.join('\n\n')}` : ''}
${usage ? `\n${usage}` : ''}
${extraSections.length > 0 ? `\n${extraSections.join('\n\n')}` : ''}
${props ? `\n${props}` : ''}
`;
}

export const GET: RequestHandler = async ({ params }) => {
	const item = getDoc(params.id);
	const content = getDocSource(params.id);

	if (!item || !content) {
		error(404, 'Not found');
	}

	return text(buildGeneratedMarkdown(params.id, item.title, item.description, content));
};
