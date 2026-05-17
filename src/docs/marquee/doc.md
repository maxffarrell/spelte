## Usage

```svelte
<script>
  import Marquee from '$registry/spelte/marquee.svelte';

  const logos = [
    { src: '/logos/vercel.svg', alt: 'Vercel logo' },
    { src: '/logos/google.svg', alt: 'Google logo' },
    { src: '/logos/framer.svg', alt: 'Framer logo' },
    { src: '/logos/discord.svg', alt: 'Discord logo' },
    { src: '/logos/openai.svg', alt: 'OpenAI logo' },
    { src: '/logos/phantom.svg', alt: 'Phantom logo' },
    { src: '/logos/descript.svg', alt: 'Descript logo' },
    { src: '/logos/netflix.svg', alt: 'Netflix logo' },
    { src: '/logos/linear.svg', alt: 'Linear logo' },
    { src: '/logos/notion.svg', alt: 'Notion logo' },
    { src: '/logos/shopify.svg', alt: 'Shopify logo' },
    { src: '/logos/duolingo.svg', alt: 'Duolingo logo' },
    { src: '/logos/ramp.svg', alt: 'Ramp logo' },
    { src: '/logos/tesla.svg', alt: 'Tesla logo' },
    { src: '/logos/opensea.svg', alt: 'OpenSea logo' },
    { src: '/logos/cursor.svg', alt: 'Cursor logo' }
  ];
</script>

<Marquee class="flex py-4" duration={40}>
  {#each logos as logo}
    <img
      src={logo.src}
      alt={logo.alt}
      width="96"
      height="96"
      class="mx-8 h-24 w-24 object-contain opacity-70 not-dark:invert-100 pointer-events-none select-none"
    />
  {/each}
</Marquee>
```

## Examples

### Pause on Hover

```svelte
<script>
  const users = [
    { id: 'alice', name: 'Alice', role: 'Product Manager', initials: 'AL' },
    { id: 'bob', name: 'Bob', role: 'Software Engineer', initials: 'BO' },
    { id: 'carol', name: 'Carol', role: 'UX Designer', initials: 'CA' },
    { id: 'david', name: 'David', role: 'Data Scientist', initials: 'DA' }
  ];
</script>

<Marquee pauseOnHover class="py-4">
  {#each users as user}
    <div class="mx-2 border shadow-xs p-3 rounded-md flex gap-3">
      <div class="border size-9 my-auto rounded-full grid place-items-center text-xs">
        {user.initials}
      </div>
      <div class="flex flex-col justify-between">
        <h1 class="font-medium text-sm">{user.name}</h1>
        <p class="text-xs text-muted-foreground">{user.role}</p>
      </div>
    </div>
  {/each}
</Marquee>
```

### Vertical Scroll

```svelte
<script>
  const notifications = [
    { text: 'New message received', time: '2 min ago', type: 'info' },
    { text: 'Upload completed', time: '5 min ago', type: 'success' },
    { text: 'Meeting starting soon', time: '10 min ago', type: 'warning' }
  ];
</script>

<div class="h-[300px]">
  <Marquee direction="up" class="h-full">
    {#each notifications as notification}
      <div class="mx-4 my-2 flex items-center gap-3 rounded-md border bg-card p-3">
        <div class="h-2 w-2 rounded-full bg-blue-500"></div>
        <div class="flex-1">
          <p class="text-sm font-medium">{notification.text}</p>
          <p class="text-xs text-muted-foreground">{notification.time}</p>
        </div>
      </div>
    {/each}
  </Marquee>
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | `number` | `20` | Animation duration in seconds |
| `pauseOnHover` | `boolean` | `false` | Pause on hover |
| `direction` | `"left" \| "right" \| "up" \| "down"` | `"left"` | Scroll direction |
| `fade` | `boolean` | `true` | Apply fade gradient at edges |
| `fadeAmount` | `number` | `10` | Fade gradient percentage |
| `class` | `string` | — | Additional CSS classes |
