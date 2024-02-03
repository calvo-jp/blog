type Theme = 'dark' | 'light' | 'system';

function createThemeStore() {
	let theme = $state<Theme | undefined>();

	const updateTheme = (value: Theme) => {
		theme = value;
	};

	const toggleTheme = () => {
		/*
		 * Sequence:
		 * light -> dark -> system
		 */

		switch (theme) {
			case 'light':
				theme = 'dark';
				break;
			case 'dark':
				theme = 'system';
				break;
			case 'system':
				theme = 'light';
				break;
			default:
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
