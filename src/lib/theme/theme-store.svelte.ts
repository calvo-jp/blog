export type Theme = 'dark' | 'light' | 'system';

function createThemeStore() {
	let theme = $state<Theme | undefined>();

	const updateTheme = (value: Theme) => {
		theme = value;
	};

	const toggleTheme = () => {
		/*
		 * Sequence:
		 * dark -> light -> system
		 */

		if (theme === 'dark') {
			theme = 'light';
		} else if (theme === 'light') {
			theme = 'system';
		} else {
			theme = 'dark';
		}
	};

	return {
		get theme() {
			return theme;
		},
		toggleTheme,
		updateTheme,
	};
}

export const themeStore = createThemeStore();
