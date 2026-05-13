export function getTableOfContents(content: string): { title: string; url: string; depth: number }[] {
	const lines = content.split('\n');
	const toc: { title: string; url: string; depth: number }[] = [];

	for (const line of lines) {
		const match = line.match(/^(#{2,4})\s+(.+)/);
		if (match) {
			const depth = match[1].length;
			const title = match[2].replace(/`/g, '');
			const slug = title
				.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, '')
				.replace(/\s+/g, '-')
				.replace(/-+/g, '-')
				.trim();
			toc.push({ title, url: `#${slug}`, depth });
		}
	}

	return toc;
}
