import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { siteConfig } from '$lib/config';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
	const base =
		typeof window !== 'undefined'
			? window.location.origin
			: (import.meta.env.VITE_APP_URL ?? siteConfig.url);
	return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}
