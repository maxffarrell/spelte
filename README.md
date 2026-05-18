<h3 align="center">Spelte</h3>

<p align="center">
  Beautiful, sophisticated UI components for modern SvelteKit and Tailwind CSS applications.
</p>

<div align="center">
  <a href="https://github.com/maxffarrell/spelte/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/maxffarrell/spelte"></a>
  <a href="https://github.com/maxffarrell/spelte/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
</div>

## About

Spelte is a Svelte port of [Spell UI](https://github.com/xxtomm/spell-ui) by [Tom](https://x.com/tomm_ui) — a collection of beautiful, copy-ready UI components. All credit for the original design and component concepts goes to the Spell UI team.

**Changes from the original:**
- Ported from React/Next.js to SvelteKit with Svelte 5 runes
- Uses [shadcn-svelte](https://shadcn-svelte.com) registry format
- Uses [mdsx](https://mdsx.dev) for markdown processing
- Orange Svelte logo (`--svelte-orange`)
- No GitHub sign-in, no sponsor references

## Documentation

Visit the docs to browse all available components.

## Installation

Components are installed individually via the shadcn-svelte CLI:

```bash
pnpm dlx shadcn-svelte@latest add @spelte/<component-name>
```

## Components

| Component | Description |
|-----------|-------------|
| `blur-reveal` | Animated text reveal with blur effect |
| `perspective-book` | 3D book with hover animation |
| `badge` | Badge with multiple color variants |
| `rich-button` | Button with rich styling and color variants |
| `light-rays` | Animated light rays via WebGL |
| `animated-gradient` | Animated gradient background via WebGL |
| `spinner` | Loading spinner with size and speed variants |
| `bars-spinner` | Loading spinner with rotating bars |
| `flow-button` | Button with animated flowing dashed border |
| `pop-button` | Playful 3D-style push-down button |
| `copy-button` | Copy-to-clipboard with blur transition |
| `animated-checkbox` | Checkbox with spring transitions |
| `exploding-input` | Input with particle effects on typing |
| `label-input` | Input with floating label |
| `color-selector` | Interactive color picker |
| `shimmer-text` | Text with shimmer animation |
| `highlighted-text` | Text with sliding background highlight |
| `slide-up-text` | Text that slides up with stagger |
| `words-stagger` | Word-by-word blur and fade animation |
| `special-text` | Scramble text reveal animation |
| `randomized-text` | Randomized character reveal |
| `gradient-wave-text` | Apple-style animated gradient text |
| `text-marquee` | Vertical scrolling text marquee |
| `marquee` | Infinite scrolling marquee |
| `tilt-card` | 3D tilt card with spotlight |
| `logos-carousel` | Animated logo carousel |
| `fallback-avatar` | Unique WebGL gradient avatar from a name |
| `qr-code` | QR code with rounded finder patterns |
| `signature` | Animated handwriting signature |
| `spotify-card` | Spotify track card with audio preview |
| `kbd` | Keyboard shortcut display |
| `chart` | Interactive line chart with tooltip |

## Credits

Spelte is a port of **[Spell UI](https://github.com/xxtomm/spell-ui)** — all original design, component concepts, and visual ideas are by [Tom (@tomm_ui)](https://x.com/tomm_ui). Please star the original repo if you find this useful.

Built with:
- [SvelteKit](https://kit.svelte.dev)
- [shadcn-svelte](https://shadcn-svelte.com)
- [Tailwind CSS](https://tailwindcss.com)
- [motion](https://motion.dev)
- [mdsx](https://mdsx.dev)

## License

Licensed under the [MIT license](https://github.com/maxffarrell/spelte/blob/main/LICENSE).
