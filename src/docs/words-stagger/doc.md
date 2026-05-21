<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import WordsStaggerSpeedExample from '$lib/components/examples/words-stagger/speed.svelte';
</script>

## Examples

<ExampleShell title="Speed" name="words-stagger/speed">
	{#snippet preview()}
		<WordsStaggerSpeedExample />
	{/snippet}
</ExampleShell>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text content to animate |
| `delay` | `number` | `0` | Delay before first word animates (seconds) |
| `stagger` | `number` | `0.1` | Delay between each word (seconds) |
| `speed` | `number` | `0.5` | Duration of each word's animation (seconds) |
| `autoStart` | `boolean` | `true` | Auto-start on mount |
| `inViewProp` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once |
| `onStart` | `() => void` | — | Callback when animation starts |
| `onComplete` | `() => void` | — | Callback when animation completes |
| `class` | `string` | — | Additional CSS classes |
