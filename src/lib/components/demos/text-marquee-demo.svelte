<script>
	import TextMarquee from '$registry/spelte/text-marquee.svelte';
</script>

{#snippet marqueeDesign()}
	<div class="text-2xl font-medium">Design</div>
{/snippet}

{#snippet marqueeMotion()}
	<div class="text-2xl font-medium">Motion</div>
{/snippet}

{#snippet marqueeComponents()}
	<div class="text-2xl font-medium">Components</div>
{/snippet}

{#snippet marqueeInterfaces()}
	<div class="text-2xl font-medium">Interfaces</div>
{/snippet}

<TextMarquee items={[marqueeDesign, marqueeMotion, marqueeComponents, marqueeInterfaces]} />
