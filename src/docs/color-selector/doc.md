## Usage

```svelte
<script>
  import ColorSelector from '$registry/spelte/color-selector.svelte';

  let selected = 'blue';
</script>

<ColorSelector
  colors={['red', 'blue', 'green']}
  defaultValue="blue"
  onColorSelect={(color) => (selected = color)}
/>
```

## Examples

### Size

~~~svelte
<div class="flex flex-col gap-6">
  <div class="flex flex-col items-start gap-2">
    <span class="font-mono text-sm text-muted-foreground">SMALL</span>
    <ColorSelector colors={['red', 'blue', 'green', 'yellow']} defaultValue="red" size="sm" />
  </div>
  <div class="flex flex-col items-start gap-2">
    <span class="font-mono text-sm text-muted-foreground">DEFAULT</span>
    <ColorSelector colors={['red', 'blue', 'green', 'yellow']} defaultValue="blue" />
  </div>
  <div class="flex flex-col items-start gap-2">
    <span class="font-mono text-sm text-muted-foreground">LARGE</span>
    <ColorSelector colors={['red', 'blue', 'green', 'yellow']} defaultValue="green" size="lg" />
  </div>
</div>
~~~

### Callback

~~~svelte
<script>
  let selectedColor = $state('purple');
</script>

<div class="flex flex-col items-center gap-4">
  <ColorSelector
    colors={['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange']}
    defaultValue={selectedColor}
    onColorSelect={(color) => (selectedColor = color)}
  />
  <p class="text-sm text-muted-foreground">
    Selected color: <span class="font-semibold">{selectedColor}</span>
  </p>
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | `string[]` | — | Array of color names or hex values |
| `defaultValue` | `string` | — | Initially selected color |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of color circles |
| `name` | `string` | — | Name for hidden form input |
| `onColorSelect` | `(color: string) => void` | — | Callback when color is selected |
| `class` | `string` | — | Additional CSS classes |
