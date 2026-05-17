## Usage

```svelte
<script>
  import LabelInput from '$registry/spelte/label-input.svelte';
</script>

<LabelInput label="Email" type="email" />
<LabelInput label="Password" type="password" />
<LabelInput label="Name" ringColor="blue" />
```

## Examples

### Password Input

~~~svelte
<LabelInput label="Password" type="password" ringColor="blue" class="max-w-72" />
~~~

### Ring Color

~~~svelte
<div class="flex gap-4 max-md:flex-col">
  <LabelInput label="Primary" ringColor="primary" class="max-w-40" />
  <LabelInput label="Orange" ringColor="orange" class="max-w-40" />
  <LabelInput label="Blue" ringColor="blue" class="max-w-40" />
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `""` | Floating label text |
| `ringColor` | `"muted" \| "primary" \| "secondary" \| "destructive" \| "red" \| "blue" \| ...` | `"muted"` | Focus ring color |
| `type` | `string` | `"text"` | Input type |
| `placeholder` | `string` | `""` | Placeholder text |
| `containerClass` | `string` | — | CSS classes for the container |
| `class` | `string` | — | CSS classes for the input element |
