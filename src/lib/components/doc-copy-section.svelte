<script lang="ts">
    import { cn } from '$lib/utils';
    import { Check, ChevronDown, Copy } from '@lucide/svelte';
    import { DropdownMenu as DropdownMenuPrimitive, Popover as PopoverPrimitive } from 'bits-ui';

    let { content, url }: { content: string; url: string } = $props();

    let copied = $state(false);

    const buttonBase = "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
    const buttonSecondary = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    const buttonOutline = "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50";
    const buttonGhost = "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";
    const buttonSm = "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5";
    const buttonIcon = "size-9";
    const dropdownContentClass = "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-[--radix-dropdown-menu-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md w-48";
    const dropdownItemClass = "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
    const popoverContentClass = "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-popover-content-transform-origin] rounded-md border p-4 shadow-md outline-hidden w-52";

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(content);
            copied = true;
            setTimeout(() => (copied = false), 1500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    function getPathname(value: string) {
        try {
            return new URL(value).pathname;
        } catch {
            return value || '/docs';
        }
    }

    function getPromptUrl(baseUrl: string, value: string) {
        return `${baseUrl}?q=${encodeURIComponent(`I'm looking at this spelte documentation: https://spelte.dev${value}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`)}`;
    }

    const pathname = $derived(getPathname(url));

    const menuItems = $derived([
        {
            key: "markdown",
            label: "View as Markdown",
            href: `${pathname}.md`,
            iconClass: "h-4 w-4",
        },
        {
            key: "v0",
            label: "Open in v0",
            href: getPromptUrl("https://v0.dev", url),
            iconClass: undefined,
        },
        {
            key: "chatgpt",
            label: "Open in ChatGPT",
            href: getPromptUrl("https://chatgpt.com", url),
            iconClass: undefined,
        },
        {
            key: "claude",
            label: "Open in Claude",
            href: getPromptUrl("https://claude.ai/new", url),
            iconClass: undefined,
        },
    ]);

    function iconSvg(key: string) {
        if (key === 'markdown') {
            return {
                viewBox: '0 0 22 16',
                path: 'M19.5 2.25H2.5C1.80964 2.25 1.25 2.80964 1.25 3.5V12.5C1.25 13.1904 1.80964 13.75 2.5 13.75H19.5C20.1904 13.75 20.75 13.1904 20.75 12.5V3.5C20.75 2.80964 20.1904 2.25 19.5 2.25ZM2.5 1C1.11929 1 0 2.11929 0 3.5V12.5C0 13.8807 1.11929 15 2.5 15H19.5C20.8807 15 22 13.8807 22 12.5V3.5C22 2.11929 20.8807 1 19.5 1H2.5ZM3 4.5H4H4.25H4.6899L4.98715 4.82428L7 7.02011L9.01285 4.82428L9.3101 4.5H9.75H10H11V5.5V11.5H9V7.79807L7.73715 9.17572L7 9.97989L6.26285 9.17572L5 7.79807V11.5H3V5.5V4.5ZM15 8V4.5H17V8H19.5L17 10.5L16 11.5L15 10.5L12.5 8H15Z',
            };
        }

        if (key === 'v0') {
            return {
                viewBox: '0 0 24 24',
                path: 'M14.066 6.028v2.22h5.729q.075-.001.148.005l-5.853 5.752a2 2 0 0 1-.024-.309V8.247h-2.353v5.45c0 2.322 1.935 4.222 4.258 4.222h5.675v-2.22h-5.675q-.03 0-.059-.003l5.729-5.629q.006.082.006.166v5.465H24v-5.465a4.204 4.204 0 0 0-4.205-4.205zM0 8.245l8.28 9.266c.839.94 2.396.346 2.396-.914V8.245H8.19v5.44l-4.86-5.44Z',
            };
        }

        if (key === 'chatgpt') {
            return {
                viewBox: '0 0 24 24',
                path: 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z',
            };
        }

        return {
            viewBox: '0 0 24 24',
            path: 'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z',
        };
    }
</script>

<PopoverPrimitive.Root>
    <div class="hidden md:inline-flex -space-x-px rounded-full shadow-none rtl:space-x-reverse mr-2">
        <button
            class={cn(buttonBase, buttonSecondary, buttonSm, "rounded-none border-r-1 shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 relative cursor-pointer")}
            onclick={handleCopy}
        >
            <div class="flex items-center gap-2">
                <div class="relative w-4 h-4">
                    <div
                        class={cn(
                            "absolute inset-0 transition-all duration-200 flex items-center justify-center",
                            copied
                                ? "scale-100 opacity-100 blur-none"
                                : "scale-70 opacity-0 blur-[2px]",
                        )}
                    >
                        <Check class="h-4 w-4 text-emerald-500" />
                    </div>
                    <div
                        class={cn(
                            "absolute inset-0 transition-all duration-200 flex items-center justify-center",
                            copied
                                ? "scale-0 opacity-0 blur-[2px]"
                                : "scale-100 opacity-100 blur-none",
                        )}
                    >
                        <Copy
                            class="h-4 w-4 text-muted-foreground dark:text-[#b5b5b5]"
                        />
                    </div>
                </div>
                <span>Copy this page</span>
            </div>
        </button>

        <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger class="hidden sm:flex">
                {#snippet child({ props })}
                    <button
                        {...props}
                        class={cn(props.class as string, buttonBase, buttonSecondary, buttonIcon, "cursor-pointer rounded-l-none size-8 shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 ")}
                        aria-label="Open options"
                    >
                        <ChevronDown size={16} aria-hidden="true" />
                    </button>
                {/snippet}
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
                <DropdownMenuPrimitive.Content align="end" sideOffset={4} class={dropdownContentClass}>
                    {#each menuItems as item}
                        {@const icon = iconSvg(item.key)}
                        <DropdownMenuPrimitive.Item class={dropdownItemClass}>
                            {#snippet child({ props })}
                                <a
                                    {...props}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class={cn(props.class as string, "flex items-center gap-2")}
                                >
                                    <svg stroke-linejoin="round" viewBox={icon.viewBox} class={item.iconClass} aria-hidden="true">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d={icon.path} fill="currentColor" />
                                    </svg>
                                    {item.label}
                                </a>
                            {/snippet}
                        </DropdownMenuPrimitive.Item>
                    {/each}
                </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>

        <PopoverPrimitive.Trigger class="flex sm:hidden">
            {#snippet child({ props })}
                <button
                    {...props}
                    class={cn(props.class as string, buttonBase, buttonOutline, buttonIcon, "rounded-none size-8 shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10")}
                    aria-label="Open options"
                >
                    <ChevronDown size={16} aria-hidden="true" />
                </button>
            {/snippet}
        </PopoverPrimitive.Trigger>
    </div>
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content class={popoverContentClass} align="start" sideOffset={4}>
            {#each menuItems as item}
                {@const icon = iconSvg(item.key)}
                <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class={cn(buttonBase, buttonGhost, buttonSm, "w-full justify-start flex items-center gap-2")}
                >
                    <svg stroke-linejoin="round" viewBox={icon.viewBox} class={item.iconClass} aria-hidden="true">
                        <path fill-rule="evenodd" clip-rule="evenodd" d={icon.path} fill="currentColor" />
                    </svg>
                    {item.label}
                </a>
            {/each}
        </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
</PopoverPrimitive.Root>
