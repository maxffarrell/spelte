<script lang="ts">
    import AnimatedCheckbox from "$registry/spelte/animated-checkbox.svelte";
    import AnimatedGradient from "$registry/spelte/animated-gradient.svelte";
    import Badge from "$registry/spelte/badge.svelte";
    import BarsSpinner from "$registry/spelte/bars-spinner.svelte";
    import BlurReveal from "$registry/spelte/blur-reveal.svelte";
    import Chart from "$registry/spelte/chart.svelte";
    import ColorSelector from "$registry/spelte/color-selector.svelte";
    import CopyButton from "$registry/spelte/copy-button.svelte";
    import FallbackAvatar from "$registry/spelte/fallback-avatar.svelte";
    import FlowButton from "$registry/spelte/flow-button.svelte";
    import GradientWaveText from "$registry/spelte/gradient-wave-text.svelte";
    import HighlightedText from "$registry/spelte/highlighted-text.svelte";
    import Kbd from "$registry/spelte/kbd.svelte";
    import LabelInput from "$registry/spelte/label-input.svelte";
    import LightRays from "$registry/spelte/light-rays.svelte";
    import LogosCarousel from "$registry/spelte/logos-carousel.svelte";
    import Marquee from "$registry/spelte/marquee.svelte";
    import PerspectiveBook from "$registry/spelte/perspective-book.svelte";
    import QRCode from "$registry/spelte/qr-code.svelte";
    import RandomizedText from "$registry/spelte/randomized-text.svelte";
    import RichButton from "$registry/spelte/rich-button.svelte";
    import ShimmerText from "$registry/spelte/shimmer-text.svelte";
    import SlideUpText from "$registry/spelte/slide-up-text.svelte";
    import SpecialText from "$registry/spelte/special-text.svelte";
    import Spinner from "$registry/spelte/spinner.svelte";
    import SpelteLogo from "$lib/components/spelte-logo.svelte";
    import TextMarquee from "$registry/spelte/text-marquee.svelte";
    import TiltCard from "$registry/spelte/tilt-card.svelte";
    import WordsStagger from "$registry/spelte/words-stagger.svelte";
    import ExplodingInputDemo from "$lib/components/demos/exploding-input-demo.svelte";
    import PopButtonDemo from "$lib/components/demos/pop-button-demo.svelte";
    import SignatureDemo from "$lib/components/demos/signature-demo.svelte";
    import SpotifyCardDemo from "$lib/components/demos/spotify-card-demo.svelte";
    import TweetDemo from "$lib/components/demos/tweet-demo.svelte";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import CodeBlock from "$lib/components/code-block.svelte";
    import { absoluteUrl, cn } from "$lib/utils";
    import { BookOpen } from "@lucide/svelte";

    let {
        id,
        previewSource = "",
        previewSourceHtml = "",
    }: { id: string; previewSource?: string; previewSourceHtml?: string } = $props();
    let tab = $state("preview");
    const fullBleedPreview = $derived(
        id === "light-rays" || id === "animated-gradient",
    );
    let previewKey = $state(0);
    let isRotating = $state(false);

    const v0Url = $derived(
        `https://v0.dev/chat/api/open?url=${absoluteUrl(`/r/${id}.json`)}`,
    );
    const tabTriggerClass =
        "rounded-md cursor-pointer data-[state=active]:bg-white px-2 text-center data-[state=active]:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] data-[state=active]:dark:bg-[#0B0B09]";

    function handleRefresh() {
        isRotating = true;
        previewKey += 1;
        window.setTimeout(() => {
            isRotating = false;
        }, 500);
    }

    const colors = ["red", "blue", "green", "yellow", "purple"];
    const logoItems = [
        { src: "/logos/vercel.svg", alt: "Vercel logo" },
        { src: "/logos/google.svg", alt: "Google logo" },
        { src: "/logos/framer.svg", alt: "Framer logo" },
        { src: "/logos/discord.svg", alt: "Discord logo" },
        { src: "/logos/openai.svg", alt: "OpenAI logo" },
        { src: "/logos/phantom.svg", alt: "Phantom logo" },
        { src: "/logos/descript.svg", alt: "Descript logo" },
        { src: "/logos/netflix.svg", alt: "Netflix logo" },
        { src: "/logos/linear.svg", alt: "Linear logo" },
        { src: "/logos/notion.svg", alt: "Notion logo" },
        { src: "/logos/shopify.svg", alt: "Shopify logo" },
        { src: "/logos/duolingo.svg", alt: "Duolingo logo" },
        { src: "/logos/ramp.svg", alt: "Ramp logo" },
        { src: "/logos/tesla.svg", alt: "Tesla logo" },
        { src: "/logos/opensea.svg", alt: "OpenSea logo" },
        { src: "/logos/cursor.svg", alt: "Cursor logo" },
    ];
    const chartData = [
        369, 438, 417, 448, 531, 673, 625, 575, 610, 701, 746, 964, 970, 1180,
        1072, 1348, 2286, 2481, 2875, 4703, 4339, 6468, 10234, 14156, 10221,
        10398, 6974, 9241, 7494, 6404, 7780, 7038, 6626, 6318, 4017, 3743, 3458,
        3855, 4105, 5351, 8575, 10817, 10086, 9631, 8294, 9200, 7570, 7194,
        9351, 8600, 6439, 8659, 9461, 9138, 11323, 11681, 10784, 13781, 19626,
        29002, 33114, 45138, 58919, 57750, 37333, 35041, 41626, 47167, 43791,
        61319, 57005, 46306, 38483, 43193, 45539, 37715, 31792, 19785, 23337,
        20050, 19432, 20496, 17169, 16547, 23139, 23147, 28478, 29269, 27220,
        30477, 29230, 25931, 26968, 34668, 37713, 42265, 42583, 61198, 71334,
        60637, 67491, 62678, 64619, 58970, 63330, 70215, 96449, 93429, 102405,
        84373, 82549, 94207, 104638, 107135, 115758, 108237, 114056, 109556,
        90394, 87509, 78621, 66996, 68233, 75776, 76454,
    ];
    const start = new Date(2016, 0, 1).getTime();
    const end = new Date(2026, 3, 30).getTime();
    const chartLabels = chartData.map((_, i) => {
        const d = new Date(
            start + (i / (chartData.length - 1)) * (end - start),
        );
        const month = d.toLocaleDateString("en-US", { month: "short" });
        return `${month} '${String(d.getFullYear()).slice(-2)}`;
    });
</script>

{#snippet marqueeDesign()}
    <div class="text-2xl font-medium">Design</div>
{/snippet}

{#snippet marqueeMotion()}
    <div class="text-2xl font-medium">Motion</div>
{/snippet}

{#snippet marqueeComponents()}
    <div class="text-2xl font-medium">Components</div>
{/snippet}

{#snippet marqueeInterfaces()}
    <div class="text-2xl font-medium">Interfaces</div>
{/snippet}

{#snippet visaLogo()}
    <svg
        width="50"
        height="16"
        viewBox="0 0 72 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ><path
            d="M35.6495 0.413261L30.841 22.6604H25.0219L29.8376 0.413261H35.6495ZM60.1288 14.7776L63.1897 6.42214L64.9541 14.7776H60.1288ZM66.6178 22.6604H72L67.3044 0.413261H62.3374C62.3302 0.413261 62.3206 0.413261 62.3134 0.413261C61.2115 0.413261 60.2657 1.08065 59.8672 2.02829L59.86 2.04492L51.1336 22.6604H57.2409L58.4556 19.3353H65.9192L66.6178 22.6604ZM51.4337 15.3975C51.4577 9.52396 43.2259 9.20095 43.2835 6.57652C43.3028 5.7785 44.0686 4.92823 45.749 4.7121C46.0611 4.68123 46.4212 4.66223 46.7861 4.66223C48.4929 4.66223 50.111 5.04698 51.5514 5.73575L51.4865 5.70725L52.5068 0.988022C50.8912 0.368134 49.0211 0.00712515 47.067 0H47.0646C41.3126 0 37.2675 3.02819 37.2315 7.35791C37.1955 10.5595 40.1195 12.3431 42.3257 13.4119C44.5943 14.5021 45.3553 15.2027 45.3433 16.1741C45.3289 17.6704 43.538 18.3259 41.8624 18.352C41.7855 18.3544 41.6919 18.3544 41.6007 18.3544C39.5097 18.3544 37.5412 17.8343 35.8224 16.9151L35.8872 16.946L34.8333 21.8196C36.7202 22.5677 38.9072 23 41.1974 23C41.2334 23 41.2694 23 41.3054 23H41.3006C47.4126 23 51.4097 20.0146 51.4313 15.3903L51.4337 15.3975ZM27.3361 0.413261L17.9112 22.6604H11.7607L7.1227 4.90211C7.03388 4.03759 6.49853 3.31557 5.75433 2.95456L5.73993 2.94744C4.08829 2.14467 2.16778 1.49153 0.158443 1.08065L0 1.05452L0.139237 0.410885H10.0395C11.3886 0.410885 12.5097 1.38703 12.7186 2.66243L12.721 2.67668L15.172 15.5518L21.2265 0.408509L27.3361 0.413261Z"
            fill="currentColor"
        /></svg
    >
{/snippet}

<Tabs.Root bind:value={tab}>
    <div class="flex items-center justify-between not-prose">
        <Tabs.List class="bg-transparent">
            <Tabs.Trigger value="preview" class={tabTriggerClass}>
                Preview
            </Tabs.Trigger>
            <Tabs.Trigger value="code" class={tabTriggerClass}>
                Code
            </Tabs.Trigger>
        </Tabs.List>
        <div class="flex items-center gap-1">
            <Button
                aria-label="Open in v0"
                class="h-7 gap-1 rounded-md px-3 text-xs shadow-none"
                href={v0Url}
                target="_blank"
                rel="noreferrer"
            >
                Open in
                <svg
                    viewBox="0 0 40 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-current"
                    aria-hidden="true"
                >
                    <path
                        d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
                        fill="currentColor"
                    />
                    <path
                        d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
                        fill="currentColor"
                    />
                </svg>
            </Button>
            <button
                class="cursor-pointer p-1.5 hover:bg-muted rounded-md"
                title="Refresh component"
                onclick={handleRefresh}
            >
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    class={cn(
                        "h-4 w-4 transition-transform duration-500",
                        isRotating && "rotate-180",
                    )}
                    aria-hidden="true"
                >
                    <path
                        d="M5 4V7C5 7.55228 5.44772 8 6 8H8.75M19.0118 20V17C19.0118 16.4477 18.5641 16 18.0118 16H15.0118M4 12C4 16.4183 7.58172 20 12 20C14.6362 20 17.0303 18.7249 18.5 16.7578M20 12C20 7.58172 16.4183 4 12 4C9.36378 4 6.96969 5.27512 5.5 7.24224"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    </div>
    {#key previewKey}
        <Tabs.Content value="preview" class="mt-2">
            <div
                class="flex w-full {fullBleedPreview
                    ? 'min-h-[500px] overflow-hidden p-0 md:min-h-[350px]'
                    : 'h-64 overflow-hidden p-10 md:h-80'} border rounded-sm not-prose preview justify-center items-center bg-background text-foreground {id ===
                'tweet'
                    ? 'min-h-[560px] overflow-auto md:min-h-[640px]'
                    : ''}"
            >
                {#if id === "badge"}
                    <div class="flex gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                    </div>
                {:else if id === "rich-button"}
                    <RichButton>Default</RichButton>
                {:else if id === "flow-button"}
                    <FlowButton>Learn more</FlowButton>
                {:else if id === "pop-button"}
                    <PopButtonDemo />
                {:else if id === "copy-button"}
                    <CopyButton value="Spell 🪄" />
                {:else if id === "animated-checkbox"}
                    <div class="flex flex-col gap-2">
                        <AnimatedCheckbox title="Implement Checkbox" />
                        <AnimatedCheckbox title="Write documentation" />
                        <AnimatedCheckbox title="Add tests" defaultChecked />
                    </div>
                {:else if id === "exploding-input"}
                    <ExplodingInputDemo />
                {:else if id === "label-input"}
                    <LabelInput label="Email" type="email" />
                {:else if id === "color-selector"}
                    <ColorSelector {colors} defaultValue="blue" />
                {:else if id === "spinner"}
                    <Spinner />
                {:else if id === "bars-spinner"}
                    <BarsSpinner />
                {:else if id === "light-rays"}
                    <div
                        class="relative min-h-[500px] w-full md:min-h-[350px] flex items-center justify-center"
                    >
                        <LightRays
                            backgroundColor="var(--background)"
                            style="z-index: 0"
                        />
                        <div class="z-10 flex h-full text-primary gap-2">
                            <p class="text-4xl font-semibold tracking-tighter">
                                Beautiful
                            </p>
                            <p class="text-4xl font-medium italic font-serif">
                                Light Rays
                            </p>
                        </div>
                    </div>
                {:else if id === "animated-gradient"}
                    <div
                        class="relative min-h-[500px] w-full md:min-h-[350px] flex items-center justify-center"
                    >
                        <div
                            class="z-10 flex flex-col items-center gap-1 text-white mix-blend-difference"
                        >
                            <p class="text-4xl font-semibold tracking-tighter">
                                Animated
                            </p>
                            <p class="text-4xl font-medium italic font-serif">
                                Gradient
                            </p>
                        </div>
                        <AnimatedGradient
                            style="z-index: 0"
                            config={{ preset: "Prism" }}
                        />
                    </div>
                {:else if id === "blur-reveal"}
                    <BlurReveal
                        text="You can just ship things."
                        class="text-2xl md:text-4xl font-medium tracking-[-.03em]"
                    />
                {:else if id === "shimmer-text"}
                    <ShimmerText class="font-medium"
                        >Thinking longer for a better answer</ShimmerText
                    >
                {:else if id === "highlighted-text"}
                    <div
                        class="text-2xl md:text-4xl font-medium tracking-[-.03em] flex items-center"
                    >
                        You&nbsp;<HighlightedText>can</HighlightedText
                        >&nbsp;just&nbsp;
                        <HighlightedText delay={0.4} from="left"
                            >ship things.</HighlightedText
                        >
                    </div>
                {:else if id === "slide-up-text"}
                    <SlideUpText
                        text="You can just ship things."
                        split="words"
                        class="text-2xl sm:text-4xl font-medium tracking-[-.03em]"
                    />
                {:else if id === "words-stagger"}
                    <div class="flex items-center justify-center">
                        <WordsStagger
                            text="Spelte is an open source collection of elegant, user friendly components that seamlessly integrate with frameworks and AI models."
                            class="text-2xl md:text-3xl font-[550] tracking-tight max-w-[600px]"
                        />
                    </div>
                {:else if id === "special-text"}
                    <SpecialText text="SPELTE" class="text-xl" />
                {:else if id === "randomized-text"}
                    <div class="flex justify-center items-center min-h-[200px]">
                        <div
                            class="flex flex-col items-start gap-4 max-w-2xl px-4"
                        >
                            <RandomizedText
                                text="Introducing Spelte"
                                split="chars"
                                class="text-2xl md:text-3xl font-semibold tracking-tighter"
                            />
                            <RandomizedText
                                text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi architecto soluta modi facilis fugit possimus commodi! Ipsam delectus unde repellendus."
                                class="text-base font-[550] tracking-tight text-muted-foreground"
                            />
                        </div>
                    </div>
                {:else if id === "gradient-wave-text"}
                    <GradientWaveText
                        class="text-3xl md:text-5xl font-medium tracking-[-.03em]"
                    >
                        Just ship things.
                    </GradientWaveText>
                {:else if id === "text-marquee"}
                    <TextMarquee
                        items={[
                            marqueeDesign,
                            marqueeMotion,
                            marqueeComponents,
                            marqueeInterfaces,
                        ]}
                    />
                {:else if id === "marquee"}
                    <Marquee class="flex py-4" duration={40}>
                        {#each logoItems as logo}
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                width="96"
                                height="96"
                                class="mx-8 h-24 w-24 object-contain opacity-70 not-dark:invert-100 pointer-events-none select-none"
                            />
                        {/each}
                    </Marquee>
                {:else if id === "perspective-book"}
                    <PerspectiveBook>
                        <div class="flex flex-col gap-4">
                            <h1 class="font-semibold leading-5">
                                Your complete platform for the Design.
                            </h1>
                            <BookOpen class="size-5" />
                        </div>
                    </PerspectiveBook>
                {:else if id === "tilt-card"}
                    <div class="flex items-center justify-center min-h-[320px]">
                        <TiltCard
                            tiltLimit={10}
                            scale={1.05}
                            perspective={1200}
                            class="aspect-video w-[360px] max-sm:scale-85 rounded-2xl bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 dark:from-neutral-800 dark:via-neutral-950 dark:to-neutral-900 overflow-hidden flex flex-col justify-between p-6 cursor-pointer shadow-[0px_8px_16px_rgba(0,0,0,0.08),0px_16px_32px_rgba(0,0,0,0.06),0px_24px_48px_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(0,0,0,0.06)] dark:shadow-[0px_8px_16px_rgba(0,0,0,0.3),0px_16px_32px_rgba(0,0,0,0.2),0px_24px_48px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                        >
                            <div class="flex justify-between items-start">
                                <SpelteLogo size={24} />
                                {@render visaLogo()}
                            </div>
                            <div class="flex justify-between items-end">
                                <div>
                                    <p class="text-xs text-muted-foreground">
                                        John Doe
                                    </p>
                                    <p
                                        class="text-sm font-medium tracking-tight font-mono tabular-nums"
                                    >
                                        5367 4567 8901 2345
                                    </p>
                                </div>
                                <div class="text-left">
                                    <p class="text-xs text-muted-foreground">
                                        Exp.
                                    </p>
                                    <p
                                        class="text-sm font-medium font-mono tabular-nums"
                                    >
                                        12/25
                                    </p>
                                </div>
                            </div>
                        </TiltCard>
                    </div>
                {:else if id === "logos-carousel"}
                    <LogosCarousel
                        logos={logoItems}
                        count={4}
                        class="gap-6 sm:gap-10"
                    />
                {:else if id === "fallback-avatar"}
                    <div class="flex items-center gap-3">
                        {#each ["xxtomm", "max", "hugh", "diana", "solo"] as name}
                            <div class="flex flex-col items-center gap-1">
                                <FallbackAvatar
                                    class="border"
                                    {name}
                                    size={32}
                                />
                                <span class="text-[11px] text-muted-foreground"
                                    >{name}</span
                                >
                            </div>
                        {/each}
                    </div>
                {:else if id === "qr-code"}
                    <div
                        class="w-[140px] rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] dark:border-input dark:border [&_svg]:w-full [&_svg]:h-auto"
                    >
                        <QRCode value="https://spell.sh" size={140} />
                    </div>
                {:else if id === "signature"}
                    <SignatureDemo />
                {:else if id === "spotify-card"}
                    <SpotifyCardDemo />
                {:else if id === "tweet"}
                    <TweetDemo />
                {:else if id === "kbd"}
                    <Kbd keys={["⌘", "K"]} />
                {:else if id === "chart"}
                    <Chart
                        data={chartData}
                        labels={chartLabels}
                        name="BTC / USD"
                        formatValue={(v) =>
                            v.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                            })}
                    />
                {:else}
                    <div class="text-sm text-muted-foreground">
                        Preview coming soon.
                    </div>
                {/if}
            </div>
        </Tabs.Content>
        <Tabs.Content value="code" class="not-prose mt-2 [&_pre]:h-64 md:[&_pre]:h-80">
            {#if previewSource}
                <CodeBlock source={previewSource} html={previewSourceHtml} />
            {:else}
                <div
                    class="rounded-md border bg-muted/30 p-4 font-mono text-sm text-muted-foreground"
                >
                    Preview source is not available yet.
                </div>
            {/if}
        </Tabs.Content>
    {/key}
</Tabs.Root>
