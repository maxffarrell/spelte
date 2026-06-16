<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import ChartWithLabelsExample from '$lib/components/examples/chart/with-labels.svelte';
	import ChartCustomColorExample from '$lib/components/examples/chart/custom-color.svelte';
</script>

## Examples

<ExampleShell title="With Labels" name="chart/with-labels">
	{#snippet preview()}
		<ChartWithLabelsExample />
	{/snippet}
</ExampleShell>

<ExampleShell title="Custom Color" name="chart/custom-color">
	{#snippet preview()}
		<ChartCustomColorExample />
	{/snippet}
</ExampleShell>

## Usage

```svelte
<script>
	import Chart from '$registry/spelte/chart.svelte';

	const data = [1200, 1800, 1600, 2400, 3200, 4100];
	const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
</script>

<Chart {data} {labels} name="Revenue" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `number[]` | — | Numeric values to plot |
| `labels` | `string[]` | — | Label for each data point |
| `name` | `string` | — | Series name shown in tooltip |
| `color` | `string` | `"#0090FD"` | Line and dot color |
| `width` | `number` | `640` | Maximum chart width in pixels |
| `formatValue` | `(value: number, index: number) => string` | `v.toLocaleString()` | Format tooltip value |
| `defaultIndex` | `number` | `data.length - 1` | Initial active point index |
| `showXAxis` | `boolean` | `true` | Show X-axis tick labels |
| `tickCount` | `number` | `6` | Target number of X-axis ticks |
| `reveal` | `boolean` | `false` | Gray line until cursor passes over it |
| `showFill` | `boolean` | `true` | Show gradient fill under line |
| `showDot` | `boolean` | `true` | Show colored dot at active point |
| `animated` | `boolean` | `true` | Animate cursor, dot, and tooltip |
| `class` | `string` | — | Additional CSS classes |
