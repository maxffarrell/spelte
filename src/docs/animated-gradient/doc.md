<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import AnimatedGradientPresetsExample from '$lib/components/examples/animated-gradient/presets.svelte';
	import AnimatedGradientCustomConfigurationExample from '$lib/components/examples/animated-gradient/custom-configuration.svelte';
</script>

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

