<script lang="ts">
	import { Check, Link2 } from 'lucide-svelte';
	import { cn } from '$lib/utils';

	type TweetEntity = {
		type: 'text' | 'url' | 'hashtag' | 'mention' | 'symbol';
		text: string;
		href?: string;
	};

	type TweetPhoto = {
		url: string;
	};

	type TweetVideoVariant = {
		src: string;
		type: string;
	};

	type TweetVideo = {
		poster?: string;
		variants?: TweetVideoVariant[];
	};

	type TweetData = {
		id_str: string;
		url: string;
		created_at: string;
		favorite_count: number;
		user: {
			name: string;
			screen_name: string;
			profile_image_url_https: string;
			verified?: boolean;
			is_blue_verified?: boolean;
		};
		entities: TweetEntity[];
		photos?: TweetPhoto[];
		video?: TweetVideo;
	};

	interface Props {
		id: string;
		class?: string;
		showDate?: boolean;
		showLikeButton?: boolean;
		showCopyLink?: boolean;
	}

	let {
		id,
		class: className,
		showDate = true,
		showLikeButton = true,
		showCopyLink = true
	}: Props = $props();

	let tweet = $state<TweetData | null>(null);
	let isLoading = $state(true);
	let error = $state(false);
	let isCopied = $state(false);

	const fallbackTweets: Record<string, TweetData> = {
		'1994155465488670828': {
			id_str: '1994155465488670828',
			url: 'https://x.com/spell_ui/status/1994155465488670828',
			created_at: '2025-11-27T17:08:00.000Z',
			favorite_count: 128,
			user: {
				name: 'Spell',
				screen_name: 'spell_ui',
				profile_image_url_https: '/icon.svg',
				is_blue_verified: true
			},
			entities: [
				{
					type: 'text',
					text: 'Beautiful, animated components for modern interfaces.'
				}
			]
		}
	};

	$effect(() => {
		let cancelled = false;
		isLoading = true;
		error = false;

		fetch(`https://cdn.syndication.twimg.com/tweet-result?id=${id}&lang=en`)
			.then((response) => {
				if (!response.ok) throw new Error('Failed to fetch tweet');
				return response.json();
			})
			.then((data) => {
				if (!cancelled) tweet = normalizeTweet(data, id);
			})
			.catch(() => {
				if (!cancelled) {
					tweet = fallbackTweets[id] ?? null;
					error = !tweet;
				}
			})
			.finally(() => {
				if (!cancelled) isLoading = false;
			});

		return () => {
			cancelled = true;
		};
	});

	function normalizeTweet(data: Record<string, any>, tweetId: string): TweetData {
		const permalink = data.permalink ?? `https://x.com/${data.user?.screen_name}/status/${tweetId}`;
		return {
			id_str: tweetId,
			url: permalink.startsWith('http') ? permalink : `https://x.com${permalink}`,
			created_at: data.created_at ?? new Date().toISOString(),
			favorite_count: data.favorite_count ?? 0,
			user: {
				name: data.user?.name ?? 'X',
				screen_name: data.user?.screen_name ?? 'x',
				profile_image_url_https: data.user?.profile_image_url_https ?? '/icon.svg',
				verified: data.user?.verified,
				is_blue_verified: data.user?.is_blue_verified
			},
			entities: buildEntities(data),
			photos: data.photos?.map((photo: Record<string, string>) => ({ url: photo.url })),
			video: data.video
				? {
						poster: data.video.poster,
						variants: data.video.variants?.map((variant: Record<string, string>) => ({
							src: variant.src,
							type: variant.type
						}))
					}
				: undefined
		};
	}

	function buildEntities(data: Record<string, any>): TweetEntity[] {
		if (Array.isArray(data.entities) && data.entities.length > 0) {
			return data.entities.map((entity: Record<string, string>) => ({
				type: (entity.type as TweetEntity['type']) ?? 'text',
				text: entity.text ?? '',
				href: entity.href
			}));
		}

		return [{ type: 'text', text: data.text ?? '' }];
	}

	function formatNumber(num: number): string {
		if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
		if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
		return num.toString();
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const ampm = hours >= 12 ? 'PM' : 'AM';
		const hour12 = hours % 12 || 12;
		const month = date.toLocaleString('en-US', { month: 'short' });
		return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm} · ${month} ${date.getDate()}, ${date.getFullYear()}`;
	}

	function videoSource(video?: TweetVideo) {
		if (!video?.variants) return null;
		const getResolution = (url: string) => {
			const match = url.match(/\/(\d+)x(\d+)\//);
			return match ? Number.parseInt(match[1]) * Number.parseInt(match[2]) : 0;
		};
		const mp4Variants = video.variants
			.filter((variant) => variant.type === 'video/mp4')
			.sort((a, b) => getResolution(b.src) - getResolution(a.src));
		return mp4Variants[0] ?? video.variants[0] ?? null;
	}

	function handleCopyLink() {
		if (!tweet) return;
		navigator.clipboard.writeText(tweet.url).catch(() => {});
		isCopied = true;
		window.setTimeout(() => {
			isCopied = false;
		}, 1500);
	}
</script>

{#snippet verifiedBadge(className?: string)}
	<svg
		viewBox="0 0 22 22"
		class={className}
		fill="currentColor"
		aria-label="Verified account"
		role="img"
	>
		<path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
	</svg>
{/snippet}

{#snippet xIcon()}
	<svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
	</svg>
{/snippet}

{#if isLoading}
	<div class={cn('block w-full max-w-[590px] rounded-xl p-4 dark:border dark:border-muted not-dark:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)]', className)}>
		<div class="flex items-center gap-2">
			<div class="size-[38px] shrink-0 animate-pulse rounded-full bg-muted"></div>
			<div class="flex flex-col gap-1">
				<div class="h-4 w-24 animate-pulse rounded bg-muted"></div>
				<div class="h-3 w-16 animate-pulse rounded bg-muted"></div>
			</div>
		</div>
		<div class="mt-4 space-y-2">
			<div class="h-4 w-full animate-pulse rounded bg-muted"></div>
			<div class="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
		</div>
	</div>
{:else if error || !tweet}
	<div class={cn('flex w-full max-w-[590px] flex-col items-center justify-center gap-2 rounded-xl p-6 text-muted-foreground dark:border dark:border-muted not-dark:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)]', className)}>
		<p class="text-sm">Tweet not found</p>
	</div>
{:else}
	<div class={cn('w-full max-w-[590px] rounded-xl p-4 dark:border dark:border-muted not-dark:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)]', className)}>
		<div class="flex items-start justify-between">
			<div class="flex items-center gap-2">
				<img
					src={tweet.user.profile_image_url_https}
					alt={tweet.user.name}
					loading="lazy"
					width="38"
					height="38"
					class="rounded-full"
				/>
				<div class="flex flex-col">
					<span class="flex items-center gap-1 text-[15px] font-semibold text-primary">
						{tweet.user.name}
						{#if tweet.user.verified || tweet.user.is_blue_verified}
							{@render verifiedBadge('size-4 text-[#1C9BF1]')}
						{/if}
					</span>
					<span class="-mt-0.5 text-[13px] text-muted-foreground">
						@{tweet.user.screen_name}
					</span>
				</div>
			</div>
			<a href={tweet.url} target="_blank" rel="noopener noreferrer">
				{@render xIcon()}
			</a>
		</div>

		<p class="mt-3 leading-6 text-primary">
			{#each tweet.entities as entity, idx (`${entity.type}-${idx}-${entity.text}`)}
				{#if entity.type === 'url' || entity.type === 'symbol' || entity.type === 'hashtag' || entity.type === 'mention'}
					<a href={entity.href} target="_blank" rel="noopener noreferrer" class="text-[#1C9BF1] hover:underline">
						{entity.text}
					</a>
				{:else}
					<span>{entity.text}</span>
				{/if}
			{/each}
		</p>

		{#if tweet.video && videoSource(tweet.video)}
			<div class="mt-4">
				<video
					poster={tweet.video.poster}
					autoplay
					loop
					muted
					playsinline
					class="w-full rounded-lg"
				>
					<source src={videoSource(tweet.video)?.src} type={videoSource(tweet.video)?.type} />
				</video>
			</div>
		{:else if tweet.photos}
			<div class="mt-4">
				<div
					class={cn(
						'grid gap-1',
						tweet.photos.length === 1 && 'grid-cols-1',
						tweet.photos.length >= 2 && 'grid-cols-2'
					)}
				>
					{#each tweet.photos as photo, idx (photo.url)}
						<img
							src={photo.url}
							alt="Tweet media"
							loading="lazy"
							class={cn(
								'w-full rounded-lg object-cover',
								tweet.photos.length === 3 && idx === 0 && 'row-span-2'
							)}
						/>
					{/each}
				</div>
			</div>
		{/if}

		{#if showDate}
			<div class="mt-4">
				<time class="text-sm text-muted-foreground" datetime={tweet.created_at}>
					{formatDate(tweet.created_at)}
				</time>
			</div>
		{/if}

		{#if showLikeButton || showCopyLink}
			<div class="mt-2.5 flex gap-4 border-t border-muted pt-3.5">
				{#if showLikeButton}
					<a
						href={`https://x.com/intent/like?tweet_id=${tweet.id_str}`}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-1.5 text-muted-foreground"
					>
						<svg class="text-pink-600" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
							<g fill="currentColor">
								<path d="M12.164,2c-1.195,.015-2.324,.49-3.164,1.306-.84-.815-1.972-1.291-3.178-1.306-2.53,.015-4.582,2.084-4.572,4.609,0,5.253,5.306,8.429,6.932,9.278,.256,.133,.537,.2,.818,.2s.562-.067,.817-.2c1.626-.848,6.933-4.024,6.933-9.275,.009-2.528-2.042-4.597-4.586-4.612Z" fill="currentColor" />
							</g>
						</svg>
						<span class="text-sm text-medium transition-colors hover:text-pink-600">
							{formatNumber(tweet.favorite_count)}
						</span>
					</a>
				{/if}
				{#if showCopyLink}
					<button
						type="button"
						onclick={handleCopyLink}
						class="flex cursor-pointer items-center gap-1.5 text-muted-foreground"
					>
						{#if isCopied}
							<Check class="size-4 text-emerald-500" />
						{:else}
							<Link2 class="size-4" />
						{/if}
						<span class="text-sm text-medium">Copy link</span>
					</button>
				{/if}
			</div>
		{/if}
	</div>
{/if}
