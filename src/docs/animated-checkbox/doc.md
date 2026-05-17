## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/animated-checkbox.json
```

## Usage

```svelte
<script>
  import AnimatedCheckbox from '$registry/spelte/animated-checkbox.svelte';
</script>

<AnimatedCheckbox title="Task to complete" />
<AnimatedCheckbox title="Already done" defaultChecked />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Implement Checkbox"` | Label text |
| `defaultChecked` | `boolean` | `false` | Initial checked state |
| `onCheckedChange` | `(checked: boolean) => void` | — | Callback when state changes |
| `class` | `string` | — | Additional CSS classes |
