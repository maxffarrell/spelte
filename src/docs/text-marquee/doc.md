## Usage

The `TextMarquee` component accepts an `items` prop — an array of Svelte snippets.

```svelte
<script>
  import TextMarquee from '$registry/spelte/text-marquee.svelte';
</script>

<!-- Pass items as an array of snippets -->
<TextMarquee items={[tomato, apple, carrot, lettuce, onion]}>
  {#snippet tomato()}<p>Tomato</p>{/snippet}
  {#snippet apple()}<p>Apple</p>{/snippet}
  {#snippet carrot()}<p>Carrot</p>{/snippet}
  {#snippet lettuce()}<p>Lettuce</p>{/snippet}
  {#snippet onion()}<p>Onion</p>{/snippet}
</TextMarquee>
```

## Examples

### Prefix

~~~svelte
<script>
  import TextMarquee from '$registry/spelte/text-marquee.svelte';
</script>

<TextMarquee height={250} speed={1} prefix={prefix} items={[emily, dennis, max, michele, adgv, tomm, hugh, alex]}>
  {#snippet prefix()}<span class="text-3xl font-medium text-muted-foreground/75">spell.sh/</span>{/snippet}
  {#snippet emily()}<p class="text-3xl font-medium">emily</p>{/snippet}
  {#snippet dennis()}<p class="text-3xl font-medium">dennis</p>{/snippet}
  {#snippet max()}<p class="text-3xl font-medium">max</p>{/snippet}
  {#snippet michele()}<p class="text-3xl font-medium">michele</p>{/snippet}
  {#snippet adgv()}<p class="text-3xl font-medium">adgv</p>{/snippet}
  {#snippet tomm()}<p class="text-3xl font-medium">tomm</p>{/snippet}
  {#snippet hugh()}<p class="text-3xl font-medium">hugh</p>{/snippet}
  {#snippet alex()}<p class="text-3xl font-medium">alex</p>{/snippet}
</TextMarquee>
~~~

### Speed

~~~svelte
<div class="flex gap-8">
  <div class="space-y-2">
    <p class="text-sm text-muted-foreground">Speed: 0.5</p>
    <TextMarquee speed={0.5} items={[tomato, apple, carrot, lettuce, onion]}>
      {#snippet tomato()}<p class="text-2xl">Tomato</p>{/snippet}
      {#snippet apple()}<p class="text-2xl">Apple</p>{/snippet}
      {#snippet carrot()}<p class="text-2xl">Carrot</p>{/snippet}
      {#snippet lettuce()}<p class="text-2xl">Lettuce</p>{/snippet}
      {#snippet onion()}<p class="text-2xl">Onion</p>{/snippet}
    </TextMarquee>
  </div>
  <div class="space-y-2">
    <p class="text-sm text-muted-foreground">Speed: 1</p>
    <TextMarquee speed={1} items={[tomato, apple, carrot, lettuce, onion]}>
      {#snippet tomato()}<p class="text-2xl">Tomato</p>{/snippet}
      {#snippet apple()}<p class="text-2xl">Apple</p>{/snippet}
      {#snippet carrot()}<p class="text-2xl">Carrot</p>{/snippet}
      {#snippet lettuce()}<p class="text-2xl">Lettuce</p>{/snippet}
      {#snippet onion()}<p class="text-2xl">Onion</p>{/snippet}
    </TextMarquee>
  </div>
  <div class="space-y-2">
    <p class="text-sm text-muted-foreground">Speed: 2</p>
    <TextMarquee speed={2} items={[tomato, apple, carrot, lettuce, onion]}>
      {#snippet tomato()}<p class="text-2xl">Tomato</p>{/snippet}
      {#snippet apple()}<p class="text-2xl">Apple</p>{/snippet}
      {#snippet carrot()}<p class="text-2xl">Carrot</p>{/snippet}
      {#snippet lettuce()}<p class="text-2xl">Lettuce</p>{/snippet}
      {#snippet onion()}<p class="text-2xl">Onion</p>{/snippet}
    </TextMarquee>
  </div>
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Snippet[]` | — | Array of snippets to scroll through |
| `speed` | `number` | `1` | Speed multiplier |
| `height` | `number` | `200` | Container height in pixels |
| `prefix` | `Snippet` | — | Optional prefix element |
| `class` | `string` | — | Additional CSS classes |
