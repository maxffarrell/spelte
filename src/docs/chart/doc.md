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

~~~svelte
<Chart
  data={[1820, 1884, 1912, 1875, 1930, 2010, 1988]}
  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
  name="Revenue"
/>
~~~

### Custom Tooltip Format

~~~svelte
<Chart
  data={[1820, 1884, 1912, 1875, 1930, 2010, 1988]}
  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
  name="ETH / USD"
  formatValue={(value) =>
    value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    })}
/>
~~~

### Without Animation

~~~svelte
<Chart
  data={[1820, 1884, 1912, 1875, 1930, 2010, 1988]}
  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
  name="NVDA"
  color="#A855F7"
  animated={false}
  formatValue={(value) =>
    value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    })}
/>
~~~

### Reveal Effect

~~~svelte
<Chart data={[1820, 1884, 1912, 1875, 1930, 2010, 1988]} reveal />
~~~

### Custom Color

~~~svelte
<Chart data={[1820, 1884, 1912, 1875, 1930, 2010, 1988]} color="#ff6b6b" />
~~~

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
