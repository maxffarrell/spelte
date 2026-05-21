import { codeToHtml } from 'shiki';
import { readFile } from 'fs/promises';
import { join } from 'path';

const demoSourceFiles: Record<string, string> = {
	'animated-checkbox': 'src/lib/components/demos/animated-checkbox-demo.svelte',
	'animated-gradient': 'src/lib/components/demos/animated-gradient-demo.svelte',
	badge: 'src/lib/components/demos/badge-demo.svelte',
	'bars-spinner': 'src/lib/components/demos/bars-spinner-demo.svelte',
	'blur-reveal': 'src/lib/components/demos/blur-reveal-demo.svelte',
	chart: 'src/lib/components/demos/chart-demo.svelte',
	'color-selector': 'src/lib/components/demos/color-selector-demo.svelte',
	'copy-button': 'src/lib/components/demos/copy-button-demo.svelte',
	'exploding-input': 'src/lib/components/demos/exploding-input-demo.svelte',
	'fallback-avatar': 'src/lib/components/demos/fallback-avatar-demo.svelte',
	'flow-button': 'src/lib/components/demos/flow-button-demo.svelte',
	'gradient-wave-text': 'src/lib/components/demos/gradient-wave-text-demo.svelte',
	'highlighted-text': 'src/lib/components/demos/highlighted-text-demo.svelte',
	kbd: 'src/lib/components/demos/kbd-demo.svelte',
	'label-input': 'src/lib/components/demos/label-input-demo.svelte',
	'light-rays': 'src/lib/components/demos/light-rays-demo.svelte',
	'logos-carousel': 'src/lib/components/demos/logos-carousel-demo.svelte',
	marquee: 'src/lib/components/demos/marquee-demo.svelte',
	'perspective-book': 'src/lib/components/demos/perspective-book-demo.svelte',
	'pop-button': 'src/lib/components/demos/pop-button-demo.svelte',
	'qr-code': 'src/lib/components/demos/qr-code-demo.svelte',
	'randomized-text': 'src/lib/components/demos/randomized-text-demo.svelte',
	'rich-button': 'src/lib/components/demos/rich-button-demo.svelte',
	'shimmer-text': 'src/lib/components/demos/shimmer-text-demo.svelte',
	signature: 'src/lib/components/demos/signature-demo.svelte',
	'slide-up-text': 'src/lib/components/demos/slide-up-text-demo.svelte',
	'special-text': 'src/lib/components/demos/special-text-demo.svelte',
	spinner: 'src/lib/components/demos/spinner-demo.svelte',
	'spotify-card': 'src/lib/components/demos/spotify-card-demo.svelte',
	'text-marquee': 'src/lib/components/demos/text-marquee-demo.svelte',
	'tilt-card': 'src/lib/components/demos/tilt-card-demo.svelte',
	tweet: 'src/lib/components/demos/tweet-demo.svelte',
	'words-stagger': 'src/lib/components/demos/words-stagger-demo.svelte'
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

	return '';
}

export async function highlightSvelte(source: string) {
	if (!source) return '';

	const html = await codeToHtml(source, {
		lang: 'svelte',
		themes: {
			dark: 'github-dark',
			light: 'github-light'
		}
	});

	return html.replace(/style="color:(#[0-9A-Fa-f]{3,8});/g, 'style="color:$1;--shiki-light:$1;');
}
