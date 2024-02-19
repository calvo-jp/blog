<script lang="ts">
	import {page} from '$app/stores';
	import {dataAttr} from '$lib/data-attr';
	import {Hash02Icon} from '@untitled-theme/icons-svelte';

	let {data, children} = $props();
	let authenticated = $derived(Boolean(data.user));

	let links = $derived([
		{
			href: '/',
			label: 'Global Feed',
		},
		{
			href: '/your-feed',
			label: 'Your Feed',
			hidden: !authenticated,
		},
		{
			href: '/login',
			label: 'Sign in to see Your Feed',
			hidden: authenticated,
		},
		{
			icon: Hash02Icon,
			href: `/${$page.params.tag}`,
			label: $page.params.tag,
			hidden: !$page.params.tag,
		},
	]);
</script>

<svelte:head>
	<title>Conduit</title>
</svelte:head>

<div>
	{#if !authenticated}
		<div
			class="flex flex-col items-center bg-emerald-500 px-4 py-10 text-white dark:bg-emerald-600"
		>
			<h1 class="font-heading text-5xl leading-none drop-shadow-md">conduit</h1>
			<p class="mt-3 text-2xl font-light leading-none">
				A place to share your knowledge
			</p>
		</div>
	{/if}

	<div
		class="mx-auto flex max-w-screen-lg flex-col items-start gap-8 px-4 py-6 lg:flex-row"
	>
		<section class="lg:order-0 order-1 grow">
			<nav>
				<ul
					class="relative flex border-b border-gray-200 dark:border-neutral-800"
				>
					{#each links as link}
						{#if !link.hidden}
							<li>
								<a
									href={link.href}
									class="-mb-px flex cursor-pointer items-center gap-0.5 border-b-2 border-transparent px-3 py-2 text-gray-500 transition-colors duration-200 hover:text-gray-600 data-selected:border-b-emerald-400 data-selected:text-emerald-500 dark:text-neutral-600 dark:hover:text-neutral-500 dark:data-selected:border-b-emerald-500 dark:data-selected:text-emerald-600"
									data-selected={dataAttr(link.href === $page.url.pathname)}
								>
									{#if link.icon}
										<svelte:component this={link.icon} class="h-4 w-4" />
									{/if}

									<span>{link.label}</span>
								</a>
							</li>
						{/if}
					{/each}
				</ul>
			</nav>

			{@render children()}
		</section>

		<section
			class="order-0 w-full shrink-0 rounded bg-gray-100 p-4 dark:bg-neutral-800/50 lg:order-1 lg:w-64"
		>
			<h2 class="tracking-wide">Popular Tags</h2>

			<ul class="mt-2.5 flex flex-wrap gap-1">
				{#each data.tags as { tag }}
					<li>
						<a
							href="/{tag}"
							class="block rounded-full bg-gray-500 px-2 py-1 text-sm leading-none text-white transition-colors duration-200 hover:bg-gray-600 dark:bg-neutral-700/30 dark:hover:bg-neutral-700/60"
						>
							{tag}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</div>
