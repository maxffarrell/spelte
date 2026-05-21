<script>
    import QRCode from "$registry/spelte/qr-code.svelte";
</script>

<div
    class="w-[140px] rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] dark:border-input dark:border [&_svg]:h-auto [&_svg]:w-full"
>
    <QRCode value="https://spelte.dev" size={140} />
</div>
