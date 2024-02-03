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

		switch (theme) {
			case 'dark':
				theme = 'light';
				break;
			case 'light':
				theme = 'system';
				break;
			default:
				theme = 'dark';
				break;
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
