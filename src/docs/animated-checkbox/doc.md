## Usage

```svelte
<script>
	import AnimatedCheckbox from '$registry/spelte/animated-checkbox.svelte';
</script>

<AnimatedCheckbox title="Deploy preview" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Implement Checkbox"` | The label shown next to the animated check indicator. |
| `defaultChecked` | `boolean` | `false` | Initial checked state for uncontrolled usage. |
| `onCheckedChange` | `((checked: boolean) => void) \| undefined` | `undefined` | Callback fired whenever the checkbox toggles. |
| `class` | `string` | `undefined` | Custom classes merged onto the clickable button root. |
