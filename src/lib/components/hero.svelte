<script lang="ts">
	import BlurReveal from '$registry/spelte/blur-reveal.svelte';
	import PerspectiveBook from '$registry/spelte/perspective-book.svelte';
	import RichButton from '$registry/spelte/rich-button.svelte';
	import LightRays from '$registry/spelte/light-rays.svelte';
	import AnimatedGradient from '$registry/spelte/animated-gradient.svelte';
	import ExplodingInputDemo from '$lib/components/demos/exploding-input-demo.svelte';
	import SpotifyCardDemo from '$lib/components/demos/spotify-card-demo.svelte';
	import PopButtonDemo from '$lib/components/demos/pop-button-demo.svelte';
	import SignatureDemo from '$lib/components/demos/signature-demo.svelte';
	import { BookOpen } from 'lucide-svelte';
</script>

<div class="flex flex-col items-center w-full pt-6 pb-12 md:pt-14 md:pb-24 gap-8 md:gap-16 px-4">
	<div class="flex flex-col items-center text-center gap-6 max-w-[700px]">
		<BlurReveal
			text="Refined UI components for Design Engineers"
			letterSpacing="-0.020em"
			class="font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight"
		/>
		<p class="text-base md:text-lg leading-6 text-muted-foreground">
			A large collection of high-quality Svelte components that
			<br />
			you can copy and paste into any project.
		</p>
		<div class="flex flex-row gap-3 mt-2 w-auto">
			<RichButton
				size="lg"
				class="transition-transform rounded-full trakcing-tight active:scale-[0.97] will-change-transform ease-out duration-150 px-4.5"
				href="/docs/introduction"
			>
				Get Started
			</RichButton>
			<RichButton
				size="lg"
				color="blue"
				class="transition-transform shadow-sm shadow-zinc-950/20 group rounded-full [&_svg]:size-4.5 trakcing-tight px-4 active:scale-[0.97] will-change-transform ease-out duration-150"
				href="/docs/components"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
				>
					<g fill="currentColor">
						<circle
							cx="14.5"
							cy="8.5"
							r="2.5"
							fill="currentColor"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
						></circle>
						<rect
							x="5"
							y="12"
							width="5"
							height="5"
							rx="1"
							ry="1"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							fill="currentColor"
						></rect>
						<path
							d="m5.1889,3.7146l-2.1169,3.5282c-.2.3333.0401.7572.4287.7572h4.2338c.3886,0,.6287-.424.4287-.7572l-2.1169-3.5282c-.1942-.3237-.6633-.3237-.8575,0Z"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							fill="currentColor"
						></path>
					</g>
				</svg>
				Components
			</RichButton>
		</div>
	</div>

	<!-- Bento Grid -->
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-4 w-full max-w-[1400px]"
	>
		<div
			class="relative col-span-1 md:col-span-2 row-span-1 md:row-span-2 rounded-2xl border shadow-inner min-h-[300px] md:min-h-[400px] overflow-hidden"
		>
			<LightRays
				backgroundColor="var(--background)"
				raysColor={{ mode: 'multi', color1: '#2060DF', color2: '#ffffff' }}
				style="z-index: 0"
			/>
			<div
				class="relative z-10 h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center"
			>
				<div class="flex flex-col items-center gap-1">
					<p class="text-4xl md:text-5xl font-semibold tracking-tighter">Beautiful</p>
					<p class="text-4xl md:text-5xl font-medium italic font-serif">Light Rays</p>
				</div>
			</div>
			<a
				href="/docs/light-rays"
				class="absolute bottom-4 left-4 z-20 text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors"
				>Light Rays</a
			>
		</div>

		<div
			class="col-span-1 row-span-1 md:row-span-2 lg:col-start-4 lg:row-start-2 rounded-2xl border shadow-inner min-h-[300px] md:min-h-[400px] flex flex-col p-4"
		>
			<div class="flex-1 flex items-center justify-center">
				<PerspectiveBook>
					{#snippet children()}
						<div class="flex flex-col gap-4">
							<h1 class="font-semibold leading-5">
								Your complete platform for the Design.
							</h1>
							<BookOpen class="size-5" />
						</div>
					{/snippet}
				</PerspectiveBook>
			</div>
			<a
				href="/docs/perspective-book"
				class="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors"
				>Perspective Book</a
			>
		</div>

		<div
			class="col-span-1 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4"
		>
			<div class="flex-1 flex items-center justify-center">
				<ExplodingInputDemo />
			</div>
			<a
				href="/docs/exploding-input"
				class="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors"
				>Exploding Input</a
			>
		</div>

		<div
			class="col-span-1 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4 overflow-hidden"
		>
			<div class="flex-1 flex items-center justify-center">
				<SpotifyCardDemo />
			</div>
			<a
				href="/docs/spotify-card"
				class="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors"
				>Spotify Card</a
			>
		</div>

		<div
			class="col-span-1 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4"
		>
			<div class="flex-1 flex items-center justify-center">
				<PopButtonDemo />
			</div>
			<a
				href="/docs/pop-button"
				class="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors"
				>Pop Button</a
			>
		</div>

		<div
			class="col-span-1 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4 overflow-hidden"
		>
			<div class="flex-1 flex items-center justify-center">
				<SignatureDemo />
			</div>
			<a
				href="/docs/signature"
				class="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors"
				>Signature</a
			>
		</div>

		<div
			class="relative col-span-1 md:col-span-2 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] overflow-hidden"
		>
			<AnimatedGradient style="z-index: 0" config={{ preset: 'Prism' }} />
			<div
				class="relative z-10 h-full min-h-[200px] md:min-h-[240px] flex items-center justify-center"
			>
				<div class="flex flex-col items-center text-white gap-1">
					<p class="text-3xl md:text-4xl font-semibold tracking-tighter">Animated</p>
					<p class="text-3xl md:text-4xl font-medium italic font-serif">Gradient</p>
				</div>
			</div>
			<a
				href="/docs/animated-gradient"
				class="absolute bottom-4 left-4 z-20 text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors"
				>Animated Gradient</a
			>
		</div>
	</div>
</div>
