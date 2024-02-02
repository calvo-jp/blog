<script lang="ts">
	import {page} from '$app/stores';
	import CogIcon from '$lib/cog-icon.svelte';
	import {dataAttr} from '$lib/data-attr';
	import PenPaperIcon from '$lib/pen-paper-icon.svelte';
	import '@fontsource/source-sans-3/300.css';
	import '@fontsource/source-sans-3/400.css';
	import '@fontsource/source-sans-3/500.css';
	import '@fontsource/source-sans-3/600.css';
	import '@fontsource/source-sans-3/700.css';
	import '@fontsource/titillium-web/700.css';
	import '../app.css';

	let {children, data} = $props();
	let authenticated = $derived(Boolean(data.user));

	const links = $derived([
		{
			href: '/',
			label: 'Home',
			active: ['/', '/your-feed', `/${$page.params.tag}`].includes(
				$page.url.pathname,
			),
		},
		{
			href: '/login',
			label: 'Sign In',
			active: $page.url.pathname === '/login',
			hidden: authenticated,
		},
		{
			href: '/register',
			label: 'Sign Up',
			active: $page.url.pathname === '/register',
			hidden: authenticated,
		},
		{
			icon: PenPaperIcon,
			href: '/editor',
			label: 'New Post',
			active: $page.url.pathname === '/editor',
			hidden: !authenticated,
		},
		{
			icon: CogIcon,
			href: '/settings',
			label: 'Settings',
			active: $page.url.pathname === '/settings',
			hidden: !authenticated,
		},
		{
			href: `/profile/${data.user?.id}`,
			active: $page.url.pathname === `/profile/${data.user?.id}`,
			label: data.user?.name,
			hidden: !authenticated,
		},
	]);
</script>

<header
	class="mx-auto flex max-w-screen-lg items-center justify-between gap-5 px-4 py-3"
>
	<a href="/">
		<h2
			class="font-heading text-2xl font-bold text-emerald-500 dark:text-emerald-700"
		>
			conduit
		</h2>
	</a>

	<nav>
		<ul class="flex items-center gap-3">
			{#each links as link}
				{#if !link.hidden}
					<li>
						<a
							href={link.href}
							class="flex items-center gap-1 text-gray-500 transition-colors duration-200 hover:text-gray-600 data-selected:text-gray-700 dark:text-neutral-600 dark:hover:text-neutral-500 dark:data-selected:text-neutral-400"
							data-selected={dataAttr(link.active)}
						>
							{#if link.icon}
								<svelte:component this={link.icon} class="h-4 w-4" />
							{/if}

							<span class="leading-none">{link.label}</span>
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer class="h-16"></footer>
