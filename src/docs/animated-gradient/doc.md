<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import AnimatedGradientPresetsExample from '$lib/components/examples/animated-gradient/presets.svelte';
	import AnimatedGradientCustomConfigurationExample from '$lib/components/examples/animated-gradient/custom-configuration.svelte';
</script>

## Usage

```svelte
<script>
	import AnimatedGradient from '$registry/spelte/animated-gradient.svelte';
</script>

<div class="h-80 overflow-hidden rounded-lg">
	<AnimatedGradient config={{ preset: 'Prism' }} />
</div>
```

## Examples

<ExampleShell title="Presets" fullBleed>
	{#snippet preview()}
		<AnimatedGradientPresetsExample />
	{/snippet}
</ExampleShell>

<ExampleShell title="Custom Configuration" fullBleed>
	{#snippet preview()}
		<AnimatedGradientCustomConfigurationExample />
	{/snippet}
</ExampleShell>

