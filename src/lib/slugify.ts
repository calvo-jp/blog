export function slugify(text: string): string {
	let slug = text.toLowerCase();

	slug = slug.replace(/[^a-z0-9]+/g, '-');
	slug = slug.replace(/^-+|-+$/g, '');

	return slug;
}
