import { siteConfig } from '$lib/config';

export function absoluteUrl(path: string) {
	const base = siteConfig.url.replace(/\/$/, '');
	return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildOgUrl(params?: { title?: string; description?: string }) {
	const url = new URL(absoluteUrl('/og'));
	if (params?.title) url.searchParams.set('title', params.title);
	if (params?.description) url.searchParams.set('description', params.description);
	return url.toString();
}

export function pageTitle(title = siteConfig.name) {
	return title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
}
