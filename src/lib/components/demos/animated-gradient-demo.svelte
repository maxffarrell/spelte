<script>
	import AnimatedGradient from '$registry/spelte/animated-gradient.svelte';
</script>

<div class="relative flex min-h-[500px] w-full items-center justify-center md:min-h-[350px]">
	<div class="z-10 flex flex-col items-center gap-1 text-foreground">
		<p class="text-4xl font-semibold tracking-tighter">Animated</p>
		<p class="font-serif text-4xl font-medium italic">Gradient</p>
	</div>
	<AnimatedGradient style="z-index: 0" config={{ preset: 'Prism' }} />
</div>
