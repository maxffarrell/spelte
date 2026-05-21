<script lang="ts">
	import AnimatedGradient from '$registry/spelte/animated-gradient.svelte';
	const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
	const animatedGradientPresets = ['Lava', 'Prism', 'Plasma', 'Pulse', 'Vortex', 'Mist'] as const;
	let activeAnimatedGradientPreset = $state<(typeof animatedGradientPresets)[number]>('Lava');
</script>

<div
    class="relative min-h-[500px] w-full md:min-h-[350px] flex flex-col"
>
    <AnimatedGradient
        style="z-index: 0;"
        config={{ preset: activeAnimatedGradientPreset }}
    />

    <div class="relative z-10 flex gap-2 p-4 flex-wrap">
        {#each animatedGradientPresets as preset (preset)}
            <button
                class="px-3 py-1 text-sm font-medium tracking-tight cursor-pointer rounded-full transition-colors {activeAnimatedGradientPreset ===
                preset
                    ? 'bg-foreground text-background'
                    : 'bg-transparent text-foreground'}"
                onclick={() =>
                    (activeAnimatedGradientPreset = preset)}
            >
                {preset}
            </button>
        {/each}
    </div>

    <div
        class="relative z-10 flex-1 flex items-center justify-center"
    >
        <p
            class="text-4xl font-semibold tracking-tighter text-foreground"
        >
            {activeAnimatedGradientPreset}
        </p>
    </div>
</div>
