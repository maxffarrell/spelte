## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/label-input
```

## Usage

```svelte
<script>
  import LabelInput from '$registry/spelte/label-input.svelte';
</script>

<LabelInput label="Email" type="email" />
<LabelInput label="Password" type="password" />
<LabelInput label="Name" ringColor="blue" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `""` | Floating label text |
| `ringColor` | `"muted" \| "primary" \| "secondary" \| "destructive" \| "red" \| "blue" \| ...` | `"muted"` | Focus ring color |
| `type` | `string` | `"text"` | Input type |
| `placeholder` | `string` | `""` | Placeholder text |
| `containerClass` | `string` | — | CSS classes for the container |
| `class` | `string` | — | CSS classes for the input element |
