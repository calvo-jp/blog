<script lang="ts">
	import {enhance} from '$app/forms';
	import {page} from '$app/stores';
	import CogIcon from '$lib/cog-icon.svelte';
	import {dataAttr} from '$lib/data-attr';
	import RssIcon from '$lib/rss-icon.svelte';
	import smiley from '$lib/smiley.jpeg';

	const {data, children} = $props();
	const ownProfile = $derived(data.user?.id === data.profile.id);
	const followed = $derived(
		data.user ? data.profile.followers.includes(data.user.id) : false,
	);

	const links = $derived([
		{
			href: `/profile/${data.profile.id}`,
			label: 'Articles',
		},
		{
			href: `/profile/${data.profile.id}/favourites`,
			label: 'Favourites',
		},
	]);
</script>

<svelte:head>
	<title>{data.profile.name} | Conduit</title>

	<meta name="title" content={data.profile.name} />
	<meta property="og:title" content={data.profile.name} />

	{#if data.profile.bio}
		<meta name="description" content={data.profile.bio} />
		<meta property="og:description" content={data.profile.bio} />
	{/if}

	{#if data.profile.image}
		<meta property="og:image" content={data.profile.image} />
	{/if}
</svelte:head>

<div>
	<section class="bg-gray-100 px-4 dark:bg-neutral-800/50">
		<div
			class="mx-auto flex max-w-screen-md flex-col items-center justify-center pb-6 pt-10"
		>
			<div class="h-24 w-24 overflow-hidden rounded-full">
				<img src={data.profile.image ?? smiley} alt="" class="h-full w-full" />
			</div>

			<h2 class="mt-5 text-3xl font-bold text-gray-700 dark:text-neutral-200">
				{data.profile.name}
			</h2>

			{#if ownProfile}
				<a
					href="/settings"
					class="flex items-center gap-1 self-end rounded border border-gray-400 px-2 py-1.5 text-gray-500 transition-colors duration-200 hover:bg-gray-200/50 dark:border-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-700/25"
				>
					<CogIcon class="h-4 w-4" />
					<span class="text-sm leading-none">Edit Profile Settings</span>
				</a>
			{:else}
				<form
					method="post"
					action={followed
						? `/profile/${data.profile.id}?/unfollow`
						: `/profile/${data.profile.id}?/follow`}
					class="flex items-start self-end"
					use:enhance
				>
					<button
						type="submit"
						class="flex items-center gap-1 rounded border border-gray-400 px-2 py-1.5 text-gray-500 transition-colors duration-200 hover:bg-gray-200/50 disabled:cursor-not-allowed data-selected:border-emerald-400 data-selected:hover:bg-emerald-50/50"
						disabled={!data.user}
						data-selected={dataAttr(followed)}
					>
						<RssIcon class="h-4 w-4" />
						<span class="text-sm leading-none">
							{followed ? 'Unfollow' : 'Follow'}
						</span>
					</button>
				</form>
			{/if}
		</div>
	</section>

	<section class="mx-auto mt-10 max-w-screen-md px-4">
		<nav>
			<ul
				class="relative flex border-b border-gray-200 dark:border-neutral-800"
			>
				{#each links as link}
					<li>
						<a
							href={link.href}
							class="dark:data-selected:hover:text-emeral -mb-px flex cursor-pointer items-center gap-0.5 border-b-2 border-transparent px-3 py-2 text-gray-500 transition-colors duration-200 hover:text-gray-600 data-selected:border-b-emerald-400 dark:text-neutral-600 dark:hover:text-neutral-500 dark:data-selected:border-b-emerald-600 dark:data-selected:text-emerald-600"
							data-selected={dataAttr(link.href === $page.url.pathname)}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		{@render children()}
	</section>
</div>
