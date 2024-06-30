export function debounce(func: (str: string) => void, wait: number) {
	let timeout: ReturnType<typeof setTimeout>;

	return function (this: unknown, ...args: [string]) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}
