## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/kbd.json
```

## Usage

```svelte
<script>
  import Kbd from '$registry/spelte/kbd.svelte';
</script>

<Kbd keys={['cmd', 'K']} />
<Kbd keys={['ctrl', 'shift', 'P']} />
<Kbd keys={['alt', 'tab']} />
```

## Examples

### Key Symbols

~~~svelte
<div class="flex flex-wrap gap-4">
  <Kbd keys={['command']} listenToKeyboard />
  <Kbd keys={['control']} listenToKeyboard />
  <Kbd keys={['alt']} listenToKeyboard />
  <Kbd keys={['up']} listenToKeyboard />
  <Kbd keys={['down']} listenToKeyboard />
  <Kbd keys={['left']} listenToKeyboard />
  <Kbd keys={['right']} listenToKeyboard />
</div>
~~~

### Custom Display with Keyboard Listener

~~~svelte
<div class="flex flex-col items-center gap-4">
  <p class="text-sm text-muted-foreground">Press M key to activate</p>
  <Kbd keys={[{ display: 'HOLD', key: 'M' }]} listenToKeyboard />
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keys` | `(string \| { display: string; key: string })[]` | — | Array of key names to display. Supports: `command`/`cmd`, `control`/`ctrl`, `alt`/`option`, `shift`, `enter`, `space`, `arrowleft`/`left`, `arrowdown`/`down`, `arrowup`/`up`, `arrowright`/`right`, or any letter/number |
| `active` | `boolean` | — | Force the pressed visual state |
| `listenToKeyboard` | `boolean` | `false` | Show pressed state when keys are pressed |
| `class` | `string` | — | Additional CSS classes |
