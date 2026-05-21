<script lang="ts">
	import HighlightedText from '$registry/spelte/highlighted-text.svelte';
</script>

<div
    class="flex flex-col gap-6 text-xl font-semibold tracking-tight"
>
    <div>
        <HighlightedText from="left" delay={0} inView
            >From Left</HighlightedText
        >
    </div>
    <div>
        <HighlightedText from="right" delay={0.2} inView
            >From Right</HighlightedText
        >
    </div>
    <div>
        <HighlightedText from="top" delay={0.4} inView
            >From Top</HighlightedText
        >
    </div>
    <div>
        <HighlightedText from="bottom" delay={0.6} inView
            >From Bottom</HighlightedText
        >
    </div>
</div>
