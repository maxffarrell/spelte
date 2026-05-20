<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import RichButton from '$registry/spelte/rich-button.svelte';

	let firstDigit = $state(Math.floor(Math.random() * 10));
	let secondDigit = $state(Math.floor(Math.random() * 10));
	let thirdDigit = $state(Math.floor(Math.random() * 10));

	const status = $derived(String(page.status || 404).padStart(3, '0').slice(0, 3));

	onMount(() => {
		const interval = window.setInterval(() => {
			firstDigit = (firstDigit + 1) % 10;
			secondDigit = (secondDigit + 1) % 10;
			thirdDigit = (thirdDigit + 1) % 10;
		}, 100);

		const stopTimer = window.setTimeout(() => {
			window.clearInterval(interval);

			firstDigit = Number(status[0]);
			window.setTimeout(() => {
				secondDigit = Number(status[1]);
			}, 200);
			window.setTimeout(() => {
				thirdDigit = Number(status[2]);
			}, 400);
		}, 1000);

		return () => {
			window.clearInterval(interval);
			window.clearTimeout(stopTimer);
		};
	});
</script>

<div class="flex h-svh flex-col items-center justify-center gap-6 bg-background text-foreground">
	<div class="flex flex-col items-start justify-center gap-8 px-6">
		<div class="flex max-w-[400px] flex-col gap-12">
			<div
				class="flex items-center gap-2 text-2xl font-semibold tracking-tight md:text-3xl"
				aria-label={`Error ${status}`}
			>
				Error
				<div class="flex gap-[0.5px]" aria-hidden="true">
					<span class="inline-block min-w-[0.62em] text-center tabular-nums">{firstDigit}</span>
					<span class="inline-block min-w-[0.62em] text-center tabular-nums">{secondDigit}</span>
					<span class="inline-block min-w-[0.62em] text-center tabular-nums">{thirdDigit}</span>
				</div>
			</div>
			<p class="font-lg font-medium text-muted-foreground">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure ratione sit numquam
				temporibus beatae explicabo eius quos quia voluptatum quae.
			</p>
		</div>
		<RichButton
			href="/"
			class="gap-1.5 rounded-full pl-3 duration-300 ease-out will-change-transform active:scale-[0.97]"
		>
			<ArrowLeft />
			Go Back
		</RichButton>
	</div>
</div>
