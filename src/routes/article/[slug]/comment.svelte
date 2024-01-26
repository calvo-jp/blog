<script lang="ts">
	import {enhance} from '$app/forms';
	import {page} from '$app/stores';
	import {formatDate} from '$lib/format-date';
	import smiley from '$lib/smiley.jpeg';
	import TrashIcon from '$lib/trash-icon.svelte';

	let {...data} = $props<{
		id: string;
		content: string;
		createdAt: Date;
		authorId: string;
		authorName: string;
		authorImage: string | null;
	}>();
</script>

<div class="overflow-hidden rounded border border-gray-200">
	<p class="p-5 text-gray-600">{data.content}</p>

	<div
		class="flex items-center gap-1.5 border-t border-gray-200 bg-gray-50 px-5 py-3"
	>
		<div class="h-5 w-5 overflow-hidden rounded-full">
			<img src={data.authorImage ?? smiley} alt="" class="h-full w-full" />
		</div>
		<a
			href="/profile/{data.authorId}"
			class="text-sm leading-none text-emerald-400"
		>
			{data.authorName}
		</a>
		<div class="text-sm leading-none text-gray-400">
			{formatDate(data.createdAt)}
		</div>
		<div class="grow" />

		{#if data.authorId === $page.data.user?.id}
			<form
				method="post"
				action="/article/{$page.params.slug}?/removeComment"
				class="flex"
				use:enhance
			>
				<input type="hidden" name="id" value={data.id} />
				<button type="submit" class="text-gray-500" title="Delete Comment">
					<TrashIcon class="h-4 w-4" />
					<span class="sr-only">Delete comment</span>
				</button>
			</form>
		{/if}
	</div>
</div>
