<script lang="ts">
	import {enhance} from '$app/forms';
	import {page} from '$app/stores';
	import Button from '$lib/button.svelte';
	import smiley from '$lib/smiley.jpeg';
</script>

<form
	method="post"
	action="/article/{$page.params.slug}?/addComment"
	class="overflow-hidden rounded border border-gray-200 dark:border-neutral-800"
	use:enhance
>
	<input type="hidden" name="postId" value={$page.data.post.id} />

	<textarea
		rows={5}
		name="content"
		placeholder="Write a comment..."
		class="block w-full p-5 outline-none placeholder:text-gray-400 dark:bg-neutral-800/50 dark:placeholder:text-neutral-600"
	/>

	<div
		class="flex items-center border-t border-gray-200 bg-gray-50 px-5 py-3 dark:border-neutral-800 dark:bg-neutral-800/30"
	>
		<div class="h-8 w-8 overflow-hidden rounded-full">
			<img
				src={$page.data.user?.image ?? smiley}
				alt=""
				class="h-full w-full"
			/>
		</div>
		<div class="grow" />
		<Button size="sm" type="submit" class="font-bold">Post Comment</Button>
	</div>
</form>
