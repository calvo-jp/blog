<script lang="ts">
	import {enhance} from '$app/forms';
	import {page} from '$app/stores';
	import HeartIcon from '$lib/heart-icon.svelte';
	import {formatDate} from './format-date';
	import HeartFilledIcon from './heart-filled-icon.svelte';

	let {...data} = $props<{
		id: string;
		slug: string;
		title: string;
		description: string;
		tags: string[];
		createdAt: Date;
		authorId: string;
		authorName: string;
		authorImage: string | null;
		commentsCount: number;
		favrouritedBy: string[];
		favouritesCount: number;
	}>();

	let favourited = $derived(data.favrouritedBy.includes($page.data.user?.id));
</script>

<div class="border-b border-b-gray-200 py-4 last:border-b-0">
	<div class="flex items-start">
		<div class="flex items-center gap-2 leading-none">
			<div class="h-8 w-8 overflow-hidden rounded-full">
				<img
					src={data.authorImage ?? '/smiley.jpeg'}
					alt=""
					class="h-full w-full"
				/>
			</div>
			<div>
				<a
					href="/profile/{data.authorId}"
					class="leading-none text-emerald-500"
				>
					{data.authorName}
				</a>
				<div class="text-sm leading-none text-gray-400">
					{formatDate(data.createdAt)}
				</div>
			</div>
		</div>
		<div class="grow" />

		<form
			method="post"
			action={favourited ? '/?/removeFromFavourites' : '/?/addToFavourites'}
			use:enhance
			class="flex"
		>
			<input type="hidden" name="postId" value={data.id} />
			<button
				type="submit"
				disabled={!$page.data.user}
				class="flex items-center gap-1 rounded border border-emerald-400 px-1.5 py-1 text-emerald-500 transition-colors duration-200 hover:bg-emerald-50/50 disabled:cursor-not-allowed"
			>
				{#if favourited}
					<span class="sr-only">Remove from favourites</span>
					<HeartFilledIcon class="h-3 w-3" />
				{:else}
					<span class="sr-only">Add to favourites</span>
					<HeartIcon class="h-3 w-3" />
				{/if}

				<span class="text-sm leading-none">
					{data.favouritesCount}
				</span>
			</button>
		</form>
	</div>

	<h2 class="mt-4 text-2xl font-semibold leading-tight">
		{data.title}
	</h2>
	<p class="leading-tight text-gray-400">
		{data.description}
	</p>

	<div class="mt-4 flex items-center">
		<a
			href="/article/{data.slug}"
			class="text-sm leading-none text-gray-400 transition-colors duration-200 hover:text-emerald-500"
		>
			Read more...
		</a>
		<div class="grow" />
		<nav>
			<ul class="flex gap-1">
				{#each data.tags as tag}
					<li>
						<a
							href="/{tag}"
							class="rounded-full border border-gray-200 px-2 py-0.5 text-xs leading-none text-emerald-500"
						>
							{tag}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</div>
