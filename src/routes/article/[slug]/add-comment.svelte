<script lang="ts">
	import Button from '$lib/button.svelte';
</script>

<form class="overflow-hidden rounded border border-neutral-200">
	<textarea
		class="block w-full p-5 outline-none placeholder:text-neutral-400"
		rows={5}
		placeholder="Write a comment..."
	/>

	<div
		class="flex items-center border-t border-neutral-200 bg-neutral-50 px-5 py-3"
	>
		<div class="h-8 w-8 overflow-hidden rounded-full">
			<img src="/smiley.jpeg" alt="" class="h-full w-full" />
		</div>
		<div class="grow" />
		<Button size="sm" type="submit" class="font-bold">Post Comment</Button>
	</div>
</form>
