<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
</script>

<ModeWatcher />
<button
	class="relative size-8 cursor-pointer rounded-full border border-border bg-background hover:bg-input/20 shadow-none flex items-center justify-center"
	onclick={toggleMode}
	aria-label="Switch Theme"
>
	<Sun class="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
	<Moon class="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
	<span class="sr-only">Switch Theme</span>
</button>
