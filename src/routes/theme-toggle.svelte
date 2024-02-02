<script lang="ts">
	import LaptopIcon from '$lib/laptop-icon.svelte';
	import MoonIcon from '$lib/moon-icon.svelte';
	import SunIcon from '$lib/sun-icon.svelte';
	import {themeStore} from '$lib/theme';
</script>

<button
	type="button"
	class="flex rounded-lg bg-gray-50 p-1 text-gray-700 dark:bg-neutral-700/20 dark:text-neutral-400"
	onclick={themeStore.toggleTheme}
>
	{#if themeStore.theme === 'dark'}
		<MoonIcon class="h-5 w-5" />
	{:else if themeStore.theme === 'light'}
		<SunIcon class="h-5 w-5" />
	{:else}
		<LaptopIcon class="h-5 w-5" />
	{/if}
</button>
