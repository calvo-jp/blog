<script lang="ts">
	import {themeStore} from '$lib/theme';
	import {
		Monitor02Icon,
		Moon02Icon,
		SunIcon,
	} from '@untitled-theme/icons-svelte';
</script>

{#if themeStore.theme}
	<button
		type="button"
		class="flex rounded-lg bg-gray-50 p-1 text-gray-700 dark:bg-neutral-700/20 dark:text-neutral-400"
		onclick={themeStore.toggleTheme}
	>
		{#if themeStore.theme === 'dark'}
			<Moon02Icon class="h-5 w-5" aria-hidden />
		{:else if themeStore.theme === 'light'}
			<SunIcon class="h-5 w-5" aria-hidden />
		{:else}
			<Monitor02Icon class="h-5 w-5" aria-hidden />
		{/if}

		<span class="sr-only">Change theme</span>
	</button>
{/if}
