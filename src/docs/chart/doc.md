## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/chart
```

## Usage

```svelte
<script>
  import Chart from '$registry/spelte/chart.svelte';

  const data = [12, 18, 15, 24, 22, 30, 28, 35, 42, 38, 48, 56];
</script>

<Chart {data} />
```

The chart auto-scales the Y axis to the data range. Hover snaps to the nearest data point.

## Examples

### With Labels

```svelte
<Chart
  {data}
  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
  name="Revenue"
/>
```

### Reveal Effect

```svelte
<Chart {data} reveal />
```

### Custom Color

```svelte
<Chart {data} color="#ff6b6b" />
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
