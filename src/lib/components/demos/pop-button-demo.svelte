<script lang="ts">
	let pressed = $state(false);
</script>

<div class="flex items-center justify-center">
	<button
		onmousedown={() => (pressed = true)}
		onmouseup={() => (pressed = false)}
		onmouseleave={() => (pressed = false)}
		class="relative font-semibold px-6 py-2.5 rounded-xl text-sm select-none cursor-pointer"
		style="
			background: linear-gradient(to bottom, #f5f5f5, #e8e8e8);
			border: 1px solid rgba(0,0,0,0.12);
			box-shadow: {pressed
			? '0 0px 0px rgba(0,0,0,0.35), inset 0 1px 2px rgba(0,0,0,0.1)'
			: '0 4px 0px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.2)'};
			transform: translateY({pressed ? '4px' : '0'});
			transition: all 0.08s ease;
		"
	>
		<span class="dark:text-zinc-900">Button</span>
	</button>
</div>
