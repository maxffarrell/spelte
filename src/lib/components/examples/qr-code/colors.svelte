<script lang="ts">
	import QRCode from '$registry/spelte/qr-code.svelte';
</script>

<div
    class="rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)]"
>
    <QRCode
        value="https://spelte.dev"
        size={140}
        fgColor="#2563eb"
    />
</div>
