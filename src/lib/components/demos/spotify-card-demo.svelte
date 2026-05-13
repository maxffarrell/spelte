<script lang="ts">
	const track = {
		name: 'Redbone',
		artist: 'Childish Gambino',
		album: 'Awaken, My Love!',
		cover: 'https://i.scdn.co/image/ab67616d0000b273f3e41fd78c34c85660f6ea0b',
	};
</script>

<div
	class="relative max-w-[325px] max-h-[100px] w-full h-[100px] rounded-2xl overflow-hidden flex items-center gap-3 px-4"
>
	<div
		class="absolute inset-0 scale-110 blur-xl"
		style="background-image: url({track.cover}); background-size: cover; background-position: center; opacity: 0.7;"
	></div>
	<div class="relative z-10 flex items-center gap-3 w-full">
		<img src={track.cover} alt={track.album} class="size-14 rounded-lg shrink-0 object-cover" />
		<div class="min-w-0">
			<p class="font-semibold text-sm text-white truncate">{track.name}</p>
			<p class="text-xs text-white/70 truncate">{track.artist}</p>
		</div>
		<svg
			class="ml-auto shrink-0 size-5 text-white/80"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
			/>
		</svg>
	</div>
</div>
