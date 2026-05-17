<script lang="ts">
	import { cn } from '$lib/utils';

	interface SpotifyData {
		title: string;
		artist: string;
		image: string;
		link: string;
		audio?: string;
	}

	interface Props {
		url: string;
		title?: string;
		artist?: string;
		image?: string;
		audio?: string;
		class?: string;
	}

	let {
		url,
		title = 'Redbone',
		artist = 'Childish Gambino',
		image = '/spotify-redbone.svg',
		audio: audioSrc,
		class: className,
	}: Props = $props();

	let data = $derived<SpotifyData>({
		title,
		artist,
		image,
		link: url,
		audio: audioSrc,
	});
	let isPlaying = $state(false);
	let audioElement: HTMLAudioElement | null = null;

	$effect(() => {
		return () => { audioElement?.pause(); };
	});

	function handlePlayPause() {
		if (!data.audio) return;
		if (!audioElement) {
			audioElement = new Audio(data.audio);
			audioElement.volume = 0.3;
			audioElement.addEventListener('ended', () => (isPlaying = false));
		}
		if (isPlaying) { audioElement.pause(); isPlaying = false; }
		else { audioElement.play(); isPlaying = true; }
	}
</script>

<div class={cn('relative flex max-h-[100px] h-full w-full items-stretch justify-center overflow-hidden rounded-2xl border border-border p-3', className)}>
		<div class="pointer-events-none absolute left-1/2 top-1/2 z-0 block aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2">
			<div class="pointer-events-none flex h-full select-none opacity-100">
				<img src={data.image} alt="" class="absolute brightness-150 left-0 top-0 block h-full w-full blur-[50px]" />
				<div class="absolute left-0 top-0 h-full w-full bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0)_0,_rgba(0,_0,_0,_.8))]"></div>
			</div>
		</div>
		<button
			onclick={data.audio ? handlePlayPause : undefined}
			class={cn('group relative z-[1] w-full max-w-[75px] self-center', data.audio && 'cursor-pointer')}
		>
			<img
				src={data.image}
				alt={data.title}
				class={cn(
					'pointer-events-none relative z-[1] min-h-[75px] min-w-[75px] w-full select-none rounded-lg object-cover shadow-md transition-transform duration-300 ease-out',
					data.audio && 'group-hover:-translate-x-0.5',
					isPlaying && '-translate-x-0.5'
				)}
			/>
			{#if data.audio}
				<div
					class={cn(
						'absolute left-1/2 top-1/2 -z-[1] size-[80%] -translate-y-1/2 transition-all duration-300',
						isPlaying ? 'translate-x-[-10%]' : 'translate-x-[-50%] group-hover:translate-x-[-10%]'
					)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110" class="size-full animate-spin" style="animation-duration: 3s; animation-play-state: {isPlaying ? 'running' : 'paused'};">
						<circle cx="55" cy="55" r="55" fill="#000" />
						<mask id="mask0_6138_16576" width="110" height="110" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type: alpha">
							<circle cx="55" cy="55" r="55" fill="#000" />
						</mask>
						<g mask="url(#mask0_6138_16576)">
							<g filter="url(#filter0_f_6138_16576)"><circle cx="55" cy="55" r="51.5" stroke="#fff" stroke-opacity="0.21" /></g>
							<g filter="url(#filter1_f_6138_16576)"><circle cx="55" cy="55" r="47.5" stroke="#fff" stroke-opacity="0.21" /></g>
							<g filter="url(#filter2_f_6138_16576)"><circle cx="55" cy="55" r="45.5" stroke="#fff" stroke-opacity="0.21" /></g>
							<g filter="url(#filter3_f_6138_16576)"><circle cx="55" cy="55" r="43.5" stroke="#fff" stroke-opacity="0.21" /></g>
							<g filter="url(#filter4_f_6138_16576)"><circle cx="55" cy="55" r="37.5" stroke="#fff" stroke-opacity="0.21" /></g>
							<g filter="url(#filter5_f_6138_16576)"><circle cx="55" cy="55" r="34.5" stroke="#fff" stroke-opacity="0.21" /></g>
							<g filter="url(#filter6_f_6138_16576)" opacity="0.4"><path fill="#fff" d="M-14 38l68 19.579L-14 74V38z" /></g>
							<g filter="url(#filter7_f_6138_16576)" opacity="0.4"><path fill="#fff" d="M123 38L55 57.579 123 74V38z" /></g>
							<g filter="url(#filter8_f_6138_16576)" opacity="0.4"><path fill="#fff" d="M36.5 124.5l19.579-68 16.421 68h-36z" /></g>
							<g filter="url(#filter9_f_6138_16576)" opacity="0.4"><path fill="#fff" d="M36.5-12.5l19.579 68 16.421-68h-36z" /></g>
						</g>
						<defs>
							<filter id="filter0_f_6138_16576" width="108" height="108" x="1" y="1" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="1" /></filter>
							<filter id="filter1_f_6138_16576" width="100" height="100" x="5" y="5" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="1" /></filter>
							<filter id="filter2_f_6138_16576" width="96" height="96" x="7" y="7" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="1" /></filter>
							<filter id="filter3_f_6138_16576" width="92" height="92" x="9" y="9" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="1" /></filter>
							<filter id="filter4_f_6138_16576" width="80" height="80" x="15" y="15" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="1" /></filter>
							<filter id="filter5_f_6138_16576" width="74" height="74" x="18" y="18" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="1" /></filter>
							<filter id="filter6_f_6138_16576" width="100" height="68" x="-30" y="22" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="8" /></filter>
							<filter id="filter7_f_6138_16576" width="100" height="68" x="39" y="22" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="8" /></filter>
							<filter id="filter8_f_6138_16576" width="68" height="100" x="20.5" y="40.5" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="8" /></filter>
							<filter id="filter9_f_6138_16576" width="68" height="100" x="20.5" y="-28.5" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_6138_16576" stdDeviation="8" /></filter>
						</defs>
					</svg>
				</div>
			{/if}
		</button>
		<div class="z-10 flex w-full flex-col justify-between">
			<div class="flex self-end">
				<a href={data.link} target="_blank" rel="noopener noreferrer" class="cursor-pointer">
					<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#BAAEBA">
						<title>Spotify</title>
						<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
					</svg>
				</a>
			</div>
			<div class="pl-6 text-end">
				<h2 class="whitespace-nowrap text-sm font-semibold tracking-[-.006em] text-[#D6D1D4]">{data.title}</h2>
				<h2 class="whitespace-nowrap text-sm font-medium tracking-[-.006em] text-[#BAAEBA]">{data.artist}</h2>
			</div>
		</div>
</div>
