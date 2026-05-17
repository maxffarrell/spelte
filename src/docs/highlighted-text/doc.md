## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/highlighted-text.json
```

## Usage

```svelte
<script>
  import HighlightedText from '$registry/spelte/highlighted-text.svelte';
</script>

<p>This is <HighlightedText>highlighted</HighlightedText> text.</p>
```

## Examples

### Direction

~~~svelte
<div class="flex flex-col gap-6 text-xl font-semibold tracking-tight">
  <div><HighlightedText from="left" delay={0} inViewProp>From Left</HighlightedText></div>
  <div><HighlightedText from="right" delay={0.2} inViewProp>From Right</HighlightedText></div>
  <div><HighlightedText from="top" delay={0.4} inViewProp>From Top</HighlightedText></div>
  <div><HighlightedText from="bottom" delay={0.6} inViewProp>From Bottom</HighlightedText></div>
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `from` | `"left" \| "right" \| "top" \| "bottom"` | `"bottom"` | Direction the highlight slides in from |
| `delay` | `number` | `0` | Animation delay in seconds |
| `inViewProp` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once when `inViewProp` is true |
| `class` | `string` | — | Additional CSS classes |
