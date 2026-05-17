## Usage

```svelte
<script>
  import Spinner from '$registry/spelte/spinner.svelte';
</script>

<Spinner />
```

## Examples

### Size

~~~svelte
<div class="flex items-center gap-4">
  <Spinner size={16} />
  <Spinner size={24} />
  <Spinner size={32} />
  <Spinner size={48} />
</div>
~~~

### Speed

~~~svelte
<div class="flex items-center gap-4">
  <Spinner speed={0.5} />
  <Spinner speed={1} />
  <Spinner speed={2} />
</div>
~~~

### Color

~~~svelte
<div class="flex items-center gap-4">
  <Spinner class="text-blue-600" />
  <Spinner class="text-green-600" />
  <Spinner class="text-red-600" />
  <Spinner class="text-purple-600" />
  <Spinner class="text-orange-600" />
  <Spinner class="text-pink-600" />
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "default" \| "md" \| "lg"` | `"md"` | Size variant of the spinner |
| `speed` | `"slow" \| "normal" \| "fast"` | `"normal"` | Animation speed |
| `class` | `string` | — | Additional CSS classes |
