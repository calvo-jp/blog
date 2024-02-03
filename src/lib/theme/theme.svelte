<script lang="ts">
	import {themeStore} from './theme-store.svelte';

	const darkModeQuery = '(prefers-color-scheme: dark)';

	$effect.pre(function assignCorrectTheme() {
		const localStorageValue = localStorage.getItem('theme');

		if (localStorageValue === 'dark') {
			themeStore.updateTheme('dark');
		} else if (localStorageValue === 'light') {
			themeStore.updateTheme('light');
		} else {
			themeStore.updateTheme('system');
		}
	});

	$effect(function handleThemeChange() {
		const html = document.documentElement;
		const localStorageKey = 'theme';

		if (themeStore.theme === 'dark') {
			html.classList.add('dark');
			html.style.colorScheme = 'dark';
			localStorage.setItem(localStorageKey, 'dark');
		} else if (themeStore.theme === 'light') {
			html.classList.remove('dark');
			html.style.colorScheme = 'light';
			localStorage.setItem(localStorageKey, 'light');
		} else {
			localStorage.setItem(localStorageKey, 'system');

			if (window.matchMedia(darkModeQuery).matches) {
				html.classList.add('dark');
				html.style.colorScheme = 'dark';
			} else {
				html.classList.remove('dark');
				html.style.colorScheme = 'light';
			}
		}
	});

	$effect(function watchThemeChanges() {
		const html = document.documentElement;
		const mediaQueryList = window.matchMedia(darkModeQuery);

		const handler = (e: MediaQueryListEvent) => {
			if (themeStore.theme === 'system') {
				if (e.matches) {
					html.classList.add('dark');
					html.style.colorScheme = 'dark';
				} else {
					html.classList.remove('dark');
					html.style.colorScheme = 'light';
				}
			}
		};

		mediaQueryList.addEventListener('change', handler);

		return () => {
			mediaQueryList.removeEventListener('change', handler);
		};
	});
</script>

<svelte:head>
	<script>
		(function (w, d, l, k, q) {
			const t = l.getItem(k);

			if (t === 'dark') {
				d.classList.add('dark');
			} else if (t === 'light') {
				d.classList.remove('dark');
			} else {
				if (w.matchMedia(q).matches) {
					d.classList.add('dark');
					d.style.colorScheme = 'dark';

					if (t !== 'system') {
						l.setItem(k, 'dark');
					}
				} else {
					d.classList.remove('dark');
					d.style.colorScheme = 'light';

					if (t !== 'system') {
						l.setItem(k, 'light');
					}
				}
			}
		})(
			window,
			document.documentElement,
			localStorage,
			'theme',
			'(prefers-color-scheme: dark)',
		);
	</script>
</svelte:head>
