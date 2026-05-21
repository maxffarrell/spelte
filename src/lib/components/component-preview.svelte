<script lang="ts">
	import AnimatedCheckboxDemo from '$lib/components/demos/animated-checkbox-demo.svelte';
	import AnimatedGradientDemo from '$lib/components/demos/animated-gradient-demo.svelte';
	import BadgeDemo from '$lib/components/demos/badge-demo.svelte';
	import BarsSpinnerDemo from '$lib/components/demos/bars-spinner-demo.svelte';
	import BlurRevealDemo from '$lib/components/demos/blur-reveal-demo.svelte';
	import ChartDemo from '$lib/components/demos/chart-demo.svelte';
	import ColorSelectorDemo from '$lib/components/demos/color-selector-demo.svelte';
	import CopyButtonDemo from '$lib/components/demos/copy-button-demo.svelte';
	import ExplodingInputDemo from '$lib/components/demos/exploding-input-demo.svelte';
	import FallbackAvatarDemo from '$lib/components/demos/fallback-avatar-demo.svelte';
	import FlowButtonDemo from '$lib/components/demos/flow-button-demo.svelte';
	import GradientWaveTextDemo from '$lib/components/demos/gradient-wave-text-demo.svelte';
	import HighlightedTextDemo from '$lib/components/demos/highlighted-text-demo.svelte';
	import KbdDemo from '$lib/components/demos/kbd-demo.svelte';
	import LabelInputDemo from '$lib/components/demos/label-input-demo.svelte';
	import LightRaysDemo from '$lib/components/demos/light-rays-demo.svelte';
	import LogosCarouselDemo from '$lib/components/demos/logos-carousel-demo.svelte';
	import MarqueeDemo from '$lib/components/demos/marquee-demo.svelte';
	import PerspectiveBookDemo from '$lib/components/demos/perspective-book-demo.svelte';
	import PopButtonDemo from '$lib/components/demos/pop-button-demo.svelte';
	import QRCodeDemo from '$lib/components/demos/qr-code-demo.svelte';
	import RandomizedTextDemo from '$lib/components/demos/randomized-text-demo.svelte';
	import RichButtonDemo from '$lib/components/demos/rich-button-demo.svelte';
	import ShimmerTextDemo from '$lib/components/demos/shimmer-text-demo.svelte';
	import SignatureDemo from '$lib/components/demos/signature-demo.svelte';
	import SlideUpTextDemo from '$lib/components/demos/slide-up-text-demo.svelte';
	import SpecialTextDemo from '$lib/components/demos/special-text-demo.svelte';
	import SpinnerDemo from '$lib/components/demos/spinner-demo.svelte';
	import SpotifyCardDemo from '$lib/components/demos/spotify-card-demo.svelte';
	import TextMarqueeDemo from '$lib/components/demos/text-marquee-demo.svelte';
	import TiltCardDemo from '$lib/components/demos/tilt-card-demo.svelte';
	import TweetDemo from '$lib/components/demos/tweet-demo.svelte';
	import WordsStaggerDemo from '$lib/components/demos/words-stagger-demo.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import CodeBlock from '$lib/components/code-block.svelte';
	import { absoluteUrl, cn } from '$lib/utils';

	let {
		id,
		previewSource = '',
		previewSourceHtml = ''
	}: { id: string; previewSource?: string; previewSourceHtml?: string } = $props();
	let tab = $state('preview');
	const fullBleedPreview = $derived(id === 'light-rays' || id === 'animated-gradient');
	let previewKey = $state(0);
	let isRotating = $state(false);

	const v0Url = $derived(`https://v0.dev/chat/api/open?url=${absoluteUrl(`/r/${id}.json`)}`);
	const tabTriggerClass =
		'rounded-md cursor-pointer data-[state=active]:bg-white px-2 text-center data-[state=active]:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] data-[state=active]:dark:bg-[#0B0B09]';

	function handleRefresh() {
		isRotating = true;
		previewKey += 1;
		window.setTimeout(() => {
			isRotating = false;
		}, 500);
	}
</script>

<Tabs.Root bind:value={tab}>
	<div class="flex items-center justify-between not-prose">
		<Tabs.List class="bg-transparent">
			<Tabs.Trigger value="preview" class={tabTriggerClass}>Preview</Tabs.Trigger>
			<Tabs.Trigger value="code" class={tabTriggerClass}>Code</Tabs.Trigger>
		</Tabs.List>
		<div class="flex items-center gap-1">
			<Button
				aria-label="Open in v0"
				class="h-7 gap-1 rounded-md px-3 text-xs shadow-none"
				href={v0Url}
				target="_blank"
				rel="noreferrer"
			>
				Open in
				<svg
					viewBox="0 0 40 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-current"
					aria-hidden="true"
				>
					<path
						d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
						fill="currentColor"
					/>
					<path
						d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
						fill="currentColor"
					/>
				</svg>
			</Button>
			<button
				class="cursor-pointer p-1.5 hover:bg-muted rounded-md"
				title="Refresh component"
				onclick={handleRefresh}
			>
				<svg
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					class={cn('h-4 w-4 transition-transform duration-500', isRotating && 'rotate-180')}
					aria-hidden="true"
				>
					<path
						d="M5 4V7C5 7.55228 5.44772 8 6 8H8.75M19.0118 20V17C19.0118 16.4477 18.5641 16 18.0118 16H15.0118M4 12C4 16.4183 7.58172 20 12 20C14.6362 20 17.0303 18.7249 18.5 16.7578M20 12C20 7.58172 16.4183 4 12 4C9.36378 4 6.96969 5.27512 5.5 7.24224"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
	</div>
	{#key previewKey}
		<Tabs.Content value="preview" class="mt-2">
			<div
				class="flex w-full {id === 'tweet'
					? 'min-h-[720px] overflow-visible p-6 md:min-h-[780px] md:p-10'
					: fullBleedPreview
						? 'min-h-[500px] overflow-hidden p-0 md:min-h-[350px]'
						: 'h-64 overflow-hidden p-10 md:h-80'} border rounded-sm not-prose preview justify-center items-center bg-background text-foreground"
			>
				{#if id === 'animated-checkbox'}
					<AnimatedCheckboxDemo />
				{:else if id === 'animated-gradient'}
					<AnimatedGradientDemo />
				{:else if id === 'badge'}
					<BadgeDemo />
				{:else if id === 'bars-spinner'}
					<BarsSpinnerDemo />
				{:else if id === 'blur-reveal'}
					<BlurRevealDemo />
				{:else if id === 'chart'}
					<ChartDemo />
				{:else if id === 'color-selector'}
					<ColorSelectorDemo />
				{:else if id === 'copy-button'}
					<CopyButtonDemo />
				{:else if id === 'exploding-input'}
					<ExplodingInputDemo />
				{:else if id === 'fallback-avatar'}
					<FallbackAvatarDemo />
				{:else if id === 'flow-button'}
					<FlowButtonDemo />
				{:else if id === 'gradient-wave-text'}
					<GradientWaveTextDemo />
				{:else if id === 'highlighted-text'}
					<HighlightedTextDemo />
				{:else if id === 'kbd'}
					<KbdDemo />
				{:else if id === 'label-input'}
					<LabelInputDemo />
				{:else if id === 'light-rays'}
					<LightRaysDemo />
				{:else if id === 'logos-carousel'}
					<LogosCarouselDemo />
				{:else if id === 'marquee'}
					<MarqueeDemo />
				{:else if id === 'perspective-book'}
					<PerspectiveBookDemo />
				{:else if id === 'pop-button'}
					<PopButtonDemo />
				{:else if id === 'qr-code'}
					<QRCodeDemo />
				{:else if id === 'randomized-text'}
					<RandomizedTextDemo />
				{:else if id === 'rich-button'}
					<RichButtonDemo />
				{:else if id === 'shimmer-text'}
					<ShimmerTextDemo />
				{:else if id === 'signature'}
					<SignatureDemo />
				{:else if id === 'slide-up-text'}
					<SlideUpTextDemo />
				{:else if id === 'special-text'}
					<SpecialTextDemo />
				{:else if id === 'spinner'}
					<SpinnerDemo />
				{:else if id === 'spotify-card'}
					<SpotifyCardDemo />
				{:else if id === 'text-marquee'}
					<TextMarqueeDemo />
				{:else if id === 'tilt-card'}
					<TiltCardDemo />
				{:else if id === 'tweet'}
					<TweetDemo />
				{:else if id === 'words-stagger'}
					<WordsStaggerDemo />
				{:else}
					<div class="text-sm text-muted-foreground">Preview coming soon.</div>
				{/if}
			</div>
		</Tabs.Content>
		<Tabs.Content value="code" class="not-prose mt-2 [&_pre]:h-64 md:[&_pre]:h-80">
			{#if previewSource}
				<CodeBlock source={previewSource} html={previewSourceHtml} />
			{:else}
				<div class="rounded-md border bg-muted/30 p-4 font-mono text-sm text-muted-foreground">
					Preview source is not available yet.
				</div>
			{/if}
		</Tabs.Content>
	{/key}
</Tabs.Root>
