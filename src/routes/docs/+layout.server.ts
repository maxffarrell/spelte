import { getDocSchema } from '#lib/doc.js';

export function load() {
	const docSchema = getDocSchema();
	return { docSchema };
}
