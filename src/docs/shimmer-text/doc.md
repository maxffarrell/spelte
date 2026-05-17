## Usage

```svelte
<script>
  import ShimmerText from '$registry/spelte/shimmer-text.svelte';
</script>

<ShimmerText>Shimmer Effect</ShimmerText>
```

## Examples

### Color

~~~svelte
<div class="flex flex-col gap-4 font-medium">
  <ShimmerText variant="blue">Thinking longer for a better answer</ShimmerText>
  <ShimmerText variant="green">Thinking longer for a better answer</ShimmerText>
  <ShimmerText variant="purple">Thinking longer for a better answer</ShimmerText>
  <ShimmerText variant="rose">Thinking longer for a better answer</ShimmerText>
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "destructive" \| "red" \| "blue" \| "green" \| ...` | `"default"` | Text color variant |
| `duration` | `number` | `1.5` | Shimmer animation duration (seconds) |
| `delay` | `number` | `1.5` | Delay before animation starts (seconds) |
| `class` | `string` | — | Additional CSS classes |
