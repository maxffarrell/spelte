## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/kbd
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

### Keyboard Listener

```svelte
<Kbd keys={['cmd', 'K']} listenToKeyboard />
```

### Forced Active State

```svelte
<Kbd keys={['enter']} active />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keys` | `(string \| { display: string; key: string })[]` | — | Array of key names to display. Supports: `command`/`cmd`, `control`/`ctrl`, `alt`/`option`, `shift`, `enter`, `space`, `arrowleft`/`left`, `arrowdown`/`down`, `arrowup`/`up`, `arrowright`/`right`, or any letter/number |
| `active` | `boolean` | — | Force the pressed visual state |
| `listenToKeyboard` | `boolean` | `false` | Show pressed state when keys are pressed |
| `class` | `string` | — | Additional CSS classes |
