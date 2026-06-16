<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import BlurRevealSpeedExample from '$lib/components/examples/blur-reveal/speed.svelte';
</script>

## Examples

<ExampleShell title="Speed" name="blur-reveal/speed">
	{#snippet preview()}
		<BlurRevealSpeedExample />
	{/snippet}
</ExampleShell>

## Usage

```svelte
<script>
	import BlurReveal from '$registry/spelte/blur-reveal.svelte';
</script>

<BlurReveal text="Build beautiful interfaces" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text content to animate |
| `delay` | `number` | `0` | Delay before animation starts (seconds) |
| `speedReveal` | `number` | `1.5` | Speed of the reveal animation |
| `speedSegment` | `number` | `0.5` | Speed of individual character animations |
| `trigger` | `boolean` | `true` | Controls whether animation plays |
| `inView` | `boolean` | `false` | Trigger only when element enters viewport |
| `onAnimationComplete` | `() => void` | — | Callback when animation completes |
| `onAnimationStart` | `() => void` | — | Callback when animation starts |
| `class` | `string` | — | Additional CSS classes |
