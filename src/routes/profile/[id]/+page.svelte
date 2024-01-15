<script lang="ts">
	import CogIcon from '$lib/cog-icon.svelte';
	import {dataAttr} from '$lib/data-attr';
	import Post from '$lib/post.svelte';

	const links = $derived([
		{
			href: '/profile/1?tab=articles',
			label: 'Articles',
			active: true,
		},
		{
			href: '/profile/1?tab=favourites',
			label: 'Favourites',
			active: false,
		},
	]);
</script>

<svelte:head>
	<title>Calvo JP | Conduit</title>
</svelte:head>

<div>
	<section class="bg-neutral-100">
		<div
			class="mx-auto flex max-w-screen-md flex-col items-center justify-center pb-6 pt-10"
		>
			<div class="h-24 w-24 overflow-hidden rounded-full">
				<img src="/smiley.jpeg" alt="" class="h-full w-full" />
			</div>

			<h2 class="mt-5 text-3xl font-bold text-neutral-700">JP Calvo</h2>

			<a
				href="/settings"
				class="flex items-center gap-1 self-end rounded border border-neutral-400 px-2 py-1.5 text-neutral-500 transition-colors duration-200 hover:bg-neutral-200/50"
			>
				<CogIcon class="h-4 w-4" />
				<span class="text-sm leading-none">Edit Profile Settings</span>
			</a>
		</div>
	</section>

	<section class="mx-auto mt-10 max-w-screen-md">
		<nav>
			<ul class="relative flex border-b border-neutral-200">
				{#each links as link}
					<li>
						<a
							href={link.href}
							class="-mb-px flex cursor-pointer items-center gap-0.5 border-b-2 border-transparent px-3 py-2 text-neutral-500 transition-colors duration-200 hover:text-neutral-600 data-selected:border-b-emerald-400 data-selected:text-emerald-500"
							data-selected={dataAttr(link.active)}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="space-y-4 py-4">
			<Post />
			<Post />
			<Post />
		</div>
	</section>
</div>
