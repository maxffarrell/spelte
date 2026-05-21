<script>
	import SpelteLogo from '$lib/components/spelte-logo.svelte';
	import TiltCard from '$registry/spelte/tilt-card.svelte';
</script>

{#snippet visaLogo()}
	<svg width="50" height="16" viewBox="0 0 72 23" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M35.6495 0.413261L30.841 22.6604H25.0219L29.8376 0.413261H35.6495ZM60.1288 14.7776L63.1897 6.42214L64.9541 14.7776H60.1288ZM66.6178 22.6604H72L67.3044 0.413261H62.3374C62.3302 0.413261 62.3206 0.413261 62.3134 0.413261C61.2115 0.413261 60.2657 1.08065 59.8672 2.02829L59.86 2.04492L51.1336 22.6604H57.2409L58.4556 19.3353H65.9192L66.6178 22.6604ZM51.4337 15.3975C51.4577 9.52396 43.2259 9.20095 43.2835 6.57652C43.3028 5.7785 44.0686 4.92823 45.749 4.7121C46.0611 4.68123 46.4212 4.66223 46.7861 4.66223C48.4929 4.66223 50.111 5.04698 51.5514 5.73575L51.4865 5.70725L52.5068 0.988022C50.8912 0.368134 49.0211 0.00712515 47.067 0H47.0646C41.3126 0 37.2675 3.02819 37.2315 7.35791C37.1955 10.5595 40.1195 12.3431 42.3257 13.4119C44.5943 14.5021 45.3553 15.2027 45.3433 16.1741C45.3289 17.6704 43.538 18.3259 41.8624 18.352C41.7855 18.3544 41.6919 18.3544 41.6007 18.3544C39.5097 18.3544 37.5412 17.8343 35.8224 16.9151L35.8872 16.946L34.8333 21.8196C36.7202 22.5677 38.9072 23 41.1974 23C41.2334 23 41.2694 23 41.3054 23H41.3006C47.4126 23 51.4097 20.0146 51.4313 15.3903L51.4337 15.3975ZM27.3361 0.413261L17.9112 22.6604H11.7607L7.1227 4.90211C7.03388 4.03759 6.49853 3.31557 5.75433 2.95456L5.73993 2.94744C4.08829 2.14467 2.16778 1.49153 0.158443 1.08065L0 1.05452L0.139237 0.410885H10.0395C11.3886 0.410885 12.5097 1.38703 12.7186 2.66243L12.721 2.67668L15.172 15.5518L21.2265 0.408509L27.3361 0.413261Z"
			fill="currentColor"
		/>
	</svg>
{/snippet}

<div class="flex min-h-[320px] items-center justify-center">
	<TiltCard
		tiltLimit={10}
		scale={1.05}
		perspective={1200}
		class="aspect-video w-[360px] max-sm:scale-85 rounded-2xl bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 dark:from-neutral-800 dark:via-neutral-950 dark:to-neutral-900 overflow-hidden flex flex-col justify-between p-6 cursor-pointer shadow-[0px_8px_16px_rgba(0,0,0,0.08),0px_16px_32px_rgba(0,0,0,0.06),0px_24px_48px_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(0,0,0,0.06)] dark:shadow-[0px_8px_16px_rgba(0,0,0,0.3),0px_16px_32px_rgba(0,0,0,0.2),0px_24px_48px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]"
	>
		<div class="flex items-start justify-between">
			<SpelteLogo size={24} />
			{@render visaLogo()}
		</div>
		<div class="flex items-end justify-between">
			<div>
				<p class="text-xs text-muted-foreground">John Doe</p>
				<p class="font-mono text-sm font-medium tracking-tight tabular-nums">5367 4567 8901 2345</p>
			</div>
			<div class="text-left">
				<p class="text-xs text-muted-foreground">Exp.</p>
				<p class="font-mono text-sm font-medium tabular-nums">12/25</p>
			</div>
		</div>
	</TiltCard>
</div>
