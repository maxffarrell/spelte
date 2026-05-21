<script>
	import RandomizedText from '$registry/spelte/randomized-text.svelte';
</script>

<div class="flex min-h-[200px] items-center justify-center">
	<div class="flex max-w-2xl flex-col items-start gap-4 px-4">
		<RandomizedText
			text="Introducing Spelte"
			split="chars"
			class="text-2xl font-semibold tracking-tighter md:text-3xl"
		/>
		<RandomizedText
			text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi architecto soluta modi facilis fugit possimus commodi! Ipsam delectus unde repellendus."
			class="text-base font-[550] tracking-tight text-muted-foreground"
		/>
	</div>
</div>
