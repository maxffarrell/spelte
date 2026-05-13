<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center min-h-dvh gap-4">
	<h1 class="text-4xl font-semibold tracking-tighter">{$page.status}</h1>
	<p class="text-muted-foreground">{$page.error?.message ?? 'Something went wrong'}</p>
	<a href="/" class="text-sm text-muted-foreground hover:text-foreground transition-colors underline">
		Go home
	</a>
</div>
