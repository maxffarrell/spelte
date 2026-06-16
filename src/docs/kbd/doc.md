<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import KbdKeySymbolsExample from '$lib/components/examples/kbd/key-symbols.svelte';
</script>

## Examples

<ExampleShell title="Key Symbols" name="kbd/key-symbols">
	{#snippet preview()}
		<KbdKeySymbolsExample />
	{/snippet}
</ExampleShell>

## Usage

```svelte
<script>
	import Kbd from '$registry/spelte/kbd.svelte';
</script>

<Kbd keys={['command', 'k']} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keys` | `(string \| { display: string; key: string })[]` | — | Array of key names to display. Supports: `command`/`cmd`, `control`/`ctrl`, `alt`/`option`, `shift`, `enter`, `space`, `arrowleft`/`left`, `arrowdown`/`down`, `arrowup`/`up`, `arrowright`/`right`, or any letter/number |
| `active` | `boolean` | — | Force the pressed visual state |
| `listenToKeyboard` | `boolean` | `false` | Show pressed state when keys are pressed |
| `class` | `string` | — | Additional CSS classes |
