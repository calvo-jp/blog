<script lang="ts">
	import {themeStore} from './theme-store.svelte';

	const localStorageKey = 'theme';

	$effect.pre(() => {
		const theme = localStorage.getItem(localStorageKey);

		if (theme === 'dark') {
			themeStore.updateTheme('dark');
		} else if (theme === 'light') {
			themeStore.updateTheme('light');
		} else {
			themeStore.updateTheme('system');
		}
	});

	$effect(() => {
		if (themeStore.theme === 'dark') {
			document.documentElement.classList.add('dark');
			localStorage.setItem(localStorageKey, 'dark');
		} else if (themeStore.theme === 'light') {
			document.documentElement.classList.remove('dark');
			localStorage.setItem(localStorageKey, 'light');
		} else {
			localStorage.setItem(localStorageKey, 'system');

			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	});
</script>

<svelte:head>
	<script>
		(function (w, d, l, k) {
			const t = l.getItem(k);

			if (t === 'dark') {
				d.classList.add('dark');
			} else if (t === 'light') {
				d.classList.remove('dark');
			} else {
				if (w.matchMedia('(prefers-color-scheme: dark)').matches) {
					d.classList.add('dark');

					if (t !== 'system') {
						l.setItem(k, 'dark');
					}
				} else {
					d.classList.remove('dark');

					if (t !== 'system') {
						l.setItem(k, 'light');
					}
				}
			}
		})(window, document.documentElement, localStorage, 'theme');
	</script>
</svelte:head>
