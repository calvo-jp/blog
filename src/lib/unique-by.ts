export function uniqBy<T, K>(array: T[], iteratee: (item: T) => K): T[] {
	const seen = new Set<K>();

	return array.filter((item) => {
		const value = iteratee(item);

		if (seen.has(value)) {
			return false;
		} else {
			seen.add(value);
			return true;
		}
	});
}
