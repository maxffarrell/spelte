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
		class?: string;
	}

	let { url, class: className }: Props = $props();

	let data = $state<SpotifyData | null>(null);
	let isLoading = $state(true);
	let error = $state(false);
	let isPlaying = $state(false);
	let audio: HTMLAudioElement | null = null;

	$effect(() => {
		isLoading = true;
		error = false;
		fetch(`/api/spotify?url=${encodeURIComponent(url)}`)
			.then((r) => { if (!r.ok) throw new Error('Failed'); return r.json(); })
			.then((d) => { data = d; })
			.catch(() => { error = true; })
			.finally(() => { isLoading = false; });
		return () => { audio?.pause(); };
	});

	function handlePlayPause() {
		if (!data?.audio) return;
		if (!audio) {
			audio = new Audio(data.audio);
			audio.volume = 0.3;
			audio.addEventListener('ended', () => (isPlaying = false));
		}
		if (isPlaying) { audio.pause(); isPlaying = false; }
		else { audio.play(); isPlaying = true; }
	}
</script>

{#if isLoading}
	<div class={cn('relative flex max-h-[100px] h-full w-full items-stretch justify-center overflow-hidden rounded-2xl border border-border bg-muted/50 p-3', className)}>
		<div class="aspect-square w-full max-w-[75px] animate-pulse self-center rounded-lg bg-muted"></div>
		<div class="z-10 flex w-full flex-col justify-end">
			<div class="flex flex-col items-end gap-1 pl-6">
				<div class="h-4 w-24 animate-pulse rounded bg-muted"></div>
				<div class="h-4 w-16 animate-pulse rounded bg-muted"></div>
			</div>
		</div>
	</div>
{:else if error || !data}
	<div class={cn('flex h-[100px] w-full items-center justify-center rounded-2xl border border-border bg-muted/50 p-6 text-muted-foreground', className)}>
		<p class="text-sm">Failed to load Spotify data</p>
	</div>
{:else}
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
						<mask id="vinyl-mask" width="110" height="110" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type: alpha">
							<circle cx="55" cy="55" r="55" fill="#000" />
						</mask>
						<g mask="url(#vinyl-mask)">
							<circle cx="55" cy="55" r="51.5" stroke="#fff" stroke-opacity="0.21" />
							<circle cx="55" cy="55" r="47.5" stroke="#fff" stroke-opacity="0.21" />
							<circle cx="55" cy="55" r="43.5" stroke="#fff" stroke-opacity="0.21" />
						</g>
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
{/if}
