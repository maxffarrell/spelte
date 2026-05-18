<script lang="ts">
    import AnimatedGradient from "$registry/spelte/animated-gradient.svelte";
    import Badge from "$registry/spelte/badge.svelte";
    import BlurReveal from "$registry/spelte/blur-reveal.svelte";
    import Chart from "$registry/spelte/chart.svelte";
    import ColorSelector from "$registry/spelte/color-selector.svelte";
    import CopyButton from "$registry/spelte/copy-button.svelte";
    import FallbackAvatar from "$registry/spelte/fallback-avatar.svelte";
    import FlowButton from "$registry/spelte/flow-button.svelte";
    import HighlightedText from "$registry/spelte/highlighted-text.svelte";
    import Kbd from "$registry/spelte/kbd.svelte";
    import LabelInput from "$registry/spelte/label-input.svelte";
    import Marquee from "$registry/spelte/marquee.svelte";
    import QRCode from "$registry/spelte/qr-code.svelte";
    import RandomizedText from "$registry/spelte/randomized-text.svelte";
    import RichButton from "$registry/spelte/rich-button.svelte";
    import ShimmerText from "$registry/spelte/shimmer-text.svelte";
    import SlideUpText from "$registry/spelte/slide-up-text.svelte";
    import SpecialText from "$registry/spelte/special-text.svelte";
    import Spinner from "$registry/spelte/spinner.svelte";
    import WordsStagger from "$registry/spelte/words-stagger.svelte";
    import ExampleShell from "$lib/components/example-shell.svelte";
    import { setContext } from "svelte";

    let {
        id,
        exampleSourceHtml = {},
    }: { id: string; exampleSourceHtml?: Record<string, string> } = $props();
    setContext("exampleSourceHtml", () => exampleSourceHtml);

    const animatedGradientPresets = [
        "Lava",
        "Prism",
        "Plasma",
        "Pulse",
        "Vortex",
        "Mist",
    ] as const;
    let activeAnimatedGradientPreset = $state<
        (typeof animatedGradientPresets)[number]
    >("Lava");
    const colors = ["red", "blue", "green", "yellow", "purple"];
    const chartData = [
        369, 438, 417, 448, 531, 673, 625, 575, 610, 701, 746, 964,
    ];
    const chartLabels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const logos = [
        { src: "/logos/vercel.svg", alt: "Vercel logo" },
        { src: "/logos/google.svg", alt: "Google logo" },
        { src: "/logos/framer.svg", alt: "Framer logo" },
        { src: "/logos/discord.svg", alt: "Discord logo" },
    ];
    const supported = $derived(
        [
            "badge",
            "flow-button",
            "color-selector",
            "spinner",
            "blur-reveal",
            "highlighted-text",
            "kbd",
            "label-input",
            "marquee",
            "fallback-avatar",
            "qr-code",
            "randomized-text",
            "rich-button",
            "shimmer-text",
            "slide-up-text",
            "special-text",
            "words-stagger",
            "chart",
            "copy-button",
            "animated-gradient",
        ].includes(id),
    );
</script>

{#if supported}
    <section class="mt-16">
        <h2
            id="examples"
            class="font-heading mt-16 scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0"
        >
            Examples
        </h2>

        {#if id === "badge"}
            <ExampleShell
                title="Color"
                source={'<Badge variant="red">Red</Badge>'}
            >
                <div class="flex flex-wrap gap-2">
                    {#each ["red", "blue", "green", "yellow", "purple", "pink", "orange", "cyan"] as variant}
                        <Badge variant={variant as any}>{variant}</Badge>
                    {/each}
                </div>
            </ExampleShell>
            <ExampleShell
                title="Size"
                source={'<Badge size="sm">Small</Badge>'}
            >
                <div class="flex items-center gap-4">
                    <Badge size="sm">Small</Badge>
                    <Badge>Default</Badge>
                </div>
            </ExampleShell>
        {:else if id === "flow-button"}
            <ExampleShell
                title="Size"
                source={'<FlowButton size="sm">Small</FlowButton>'}
            >
                <div class="flex items-center gap-3">
                    <FlowButton size="sm">Small</FlowButton>
                    <FlowButton>Default</FlowButton>
                    <FlowButton size="lg">Large</FlowButton>
                </div>
            </ExampleShell>
            <ExampleShell
                title="Color"
                source={'<FlowButton borderColor="#3b82f6">Blue</FlowButton>'}
            >
                <FlowButton borderColor="#3b82f6">Blue</FlowButton>
            </ExampleShell>
        {:else if id === "color-selector"}
            <ExampleShell title="Size" source={'<ColorSelector size="sm" />'}>
                <div class="flex items-center gap-5">
                    <ColorSelector {colors} size="sm" defaultValue="red" />
                    <ColorSelector {colors} defaultValue="blue" />
                    <ColorSelector {colors} size="lg" defaultValue="green" />
                </div>
            </ExampleShell>
            <ExampleShell
                title="Callback"
                source={"<ColorSelector onValueChange={(color) => console.log(color)} />"}
            >
                <ColorSelector {colors} defaultValue="purple" />
            </ExampleShell>
        {:else if id === "spinner"}
            <ExampleShell title="Size" source={'<Spinner size="sm" />'}>
                <div class="flex items-center gap-6">
                    <Spinner size="sm" />
                    <Spinner />
                    <Spinner size="lg" />
                </div>
            </ExampleShell>
            <ExampleShell title="Speed" source={'<Spinner speed="fast" />'}>
                <div class="flex items-center gap-6">
                    <Spinner speed="slow" />
                    <Spinner speed="fast" />
                </div>
            </ExampleShell>
        {:else if id === "blur-reveal"}
            <ExampleShell title="Speed" source={"<BlurReveal delay={0.1} />"}>
                <BlurReveal
                    text="Fast, fluid text reveals."
                    delay={0.1}
                    class="text-3xl font-medium tracking-[-.03em]"
                />
            </ExampleShell>
        {:else if id === "highlighted-text"}
            <ExampleShell
                title="Direction"
                source={'<HighlightedText from="left">Ship</HighlightedText>'}
            >
                <div class="text-3xl font-medium tracking-[-.03em]">
                    <HighlightedText from="left">Ship</HighlightedText>
                    <span> with focus.</span>
                </div>
            </ExampleShell>
        {:else if id === "kbd"}
            <ExampleShell
                title="Key Symbols"
                source={'<Kbd keys={["⌘", "K"]} />'}
            >
                <div class="flex items-center gap-3">
                    <Kbd keys={["⌘", "K"]} />
                    <Kbd keys={["Shift", "A"]} />
                    <Kbd keys={["Esc"]} />
                </div>
            </ExampleShell>
        {:else if id === "label-input"}
            <ExampleShell
                title="Password Input"
                source={'<LabelInput type="password" />'}
            >
                <LabelInput label="Password" type="password" />
            </ExampleShell>
            <ExampleShell
                title="Ring Color"
                source={'<LabelInput ringColor="blue" />'}
            >
                <LabelInput label="Email" type="email" ringColor="blue" />
            </ExampleShell>
        {:else if id === "marquee"}
            <ExampleShell
                title="Pause on Hover"
                source={"<Marquee pauseOnHover />"}
            >
                <Marquee class="flex py-4" pauseOnHover>
                    {#each logos as logo}
                        <img
                            src={logo.src}
                            alt={logo.alt}
                            class="mx-8 h-16 w-16 object-contain opacity-70 not-dark:invert-100"
                        />
                    {/each}
                </Marquee>
            </ExampleShell>
        {:else if id === "fallback-avatar"}
            <ExampleShell
                title="Sizes"
                source={'<FallbackAvatar name="max" size={40} />'}
            >
                <div class="flex items-center gap-4">
                    <FallbackAvatar name="max" size={28} />
                    <FallbackAvatar name="hugh" size={36} />
                    <FallbackAvatar name="diana" size={44} />
                </div>
            </ExampleShell>
        {:else if id === "qr-code"}
            <ExampleShell
                title="Colors"
                source={'<QRCode fgColor="#2563eb" />'}
            >
                <div
                    class="rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)]"
                >
                    <QRCode
                        value="https://spell.sh"
                        size={140}
                        fgColor="#2563eb"
                    />
                </div>
            </ExampleShell>
        {:else if id === "randomized-text"}
            <ExampleShell
                title="Split By"
                source={'<RandomizedText split="chars" />'}
            >
                <RandomizedText
                    text="Split by characters"
                    split="chars"
                    class="text-3xl font-semibold tracking-tighter"
                />
            </ExampleShell>
        {:else if id === "rich-button"}
            <ExampleShell
                title="Color"
                source={'<RichButton class="bg-blue-600">Blue</RichButton>'}
            >
                <RichButton class="bg-blue-600 text-white hover:bg-blue-600/90"
                    >Blue</RichButton
                >
            </ExampleShell>
            <ExampleShell
                title="Size"
                source={'<RichButton size="lg">Large</RichButton>'}
            >
                <div class="flex items-center gap-3">
                    <RichButton size="sm">Small</RichButton>
                    <RichButton>Default</RichButton>
                    <RichButton size="lg">Large</RichButton>
                </div>
            </ExampleShell>
        {:else if id === "shimmer-text"}
            <ExampleShell
                title="Color"
                source={'<ShimmerText class="text-blue-500">Loading</ShimmerText>'}
            >
                <ShimmerText class="font-medium text-blue-500"
                    >Loading interface</ShimmerText
                >
            </ExampleShell>
        {:else if id === "slide-up-text"}
            <ExampleShell
                title="Split By"
                source={'<SlideUpText split="characters" />'}
            >
                <SlideUpText
                    text="Split by characters"
                    split="characters"
                    class="text-3xl font-medium tracking-[-.03em]"
                />
            </ExampleShell>
        {:else if id === "special-text"}
            <ExampleShell title="Speed" source={"<SpecialText speed={35} />"}>
                <SpecialText text="SPELTE" speed={35} class="text-xl" />
            </ExampleShell>
        {:else if id === "words-stagger"}
            <ExampleShell title="Speed" source={"<WordsStagger delay={0.2} />"}>
                <WordsStagger
                    text="Ship thoughtful interfaces quickly."
                    delay={0.2}
                    class="text-3xl font-[550] tracking-tight"
                />
            </ExampleShell>
        {:else if id === "chart"}
            <ExampleShell
                title="With Labels"
                source={"<Chart data={data} labels={labels} />"}
            >
                <Chart data={chartData} labels={chartLabels} name="Revenue" />
            </ExampleShell>
            <ExampleShell
                title="Custom Color"
                source={'<Chart color="#2563eb" />'}
            >
                <Chart
                    data={chartData}
                    labels={chartLabels}
                    color="#2563eb"
                    name="Revenue"
                />
            </ExampleShell>
        {:else if id === "copy-button"}
            <ExampleShell title="Size" source={'<CopyButton value="Spell" />'}>
                <div class="flex items-center gap-3">
                    <CopyButton value="Spelte" />
                    <CopyButton value="Spelte" />
                </div>
            </ExampleShell>
        {:else if id === "animated-gradient"}
            <ExampleShell
                title="Presets"
                source={`<script>
  import AnimatedGradient from '$registry/spelte/animated-gradient.svelte';

  const presets = ['Lava', 'Prism', 'Plasma', 'Pulse', 'Vortex', 'Mist'];
  let activePreset = $state('Lava');
<\\/script>

<div class="relative min-h-[500px] w-full md:min-h-[350px] flex flex-col">
  <div class="absolute top-4 left-4 z-10 flex gap-2 flex-wrap">
    {#each presets as preset}
      <button
        class="px-3 py-1 text-sm font-medium tracking-tight cursor-pointer rounded-full transition-colors {activePreset === preset ? 'bg-white text-black' : 'bg-transparent text-white'}"
        onclick={() => (activePreset = preset)}
      >
        {preset}
      </button>
    {/each}
  </div>

  <div class="z-10 flex flex-col items-center justify-center flex-1 text-white gap-1">
    <p class="text-4xl font-semibold tracking-tighter text-white mix-blend-exclusion">
      {activePreset}
    </p>
  </div>

  <AnimatedGradient style="z-index: 0;" config={{ preset: activePreset }} />
</div>`}
            >
                <div
                    class="relative min-h-[500px] w-full md:min-h-[350px] flex flex-col"
                >
                    <div
                        class="absolute top-4 left-4 z-10 flex gap-2 flex-wrap"
                    >
                        {#each animatedGradientPresets as preset}
                            <button
                                class="px-3 py-1 text-sm font-medium tracking-tight cursor-pointer rounded-full transition-colors {activeAnimatedGradientPreset ===
                                preset
                                    ? 'bg-white text-black'
                                    : 'bg-transparent text-white'}"
                                onclick={() =>
                                    (activeAnimatedGradientPreset = preset)}
                            >
                                {preset}
                            </button>
                        {/each}
                    </div>

                    <div
                        class="z-10 flex flex-col items-center justify-center flex-1 text-white gap-1"
                    >
                        <p
                            class="text-4xl font-semibold tracking-tighter text-white mix-blend-exclusion"
                        >
                            {activeAnimatedGradientPreset}
                        </p>
                    </div>

                    <AnimatedGradient
                        style="z-index: 0;"
                        config={{ preset: activeAnimatedGradientPreset }}
                    />
                </div>
            </ExampleShell>
            <ExampleShell
                title="Custom Configuration"
                source={`<AnimatedGradient
  config={{
    preset: 'custom',
    color1: '#1a1a2e',
    color2: '#16213e',
    color3: '#0f3460',
    rotation: 45,
    speed: 25,
    swirl: 60,
  }}
/>`}
            >
                <div
                    class="relative min-h-[500px] w-full md:min-h-[350px] flex items-center justify-center"
                >
                    <div
                        class="z-10 flex flex-col items-center text-white gap-1"
                    >
                        <p class="text-4xl font-semibold tracking-tighter">
                            Custom
                        </p>
                        <p class="text-4xl font-medium italic font-serif">
                            Configuration
                        </p>
                    </div>
                    <AnimatedGradient
                        style="z-index: 0;"
                        config={{
                            preset: "custom",
                            color1: "#1a1a2e",
                            color2: "#16213e",
                            color3: "#0f3460",
                            rotation: 45,
                            speed: 25,
                            swirl: 60,
                        }}
                    />
                </div>
            </ExampleShell>
        {/if}
    </section>
{/if}
