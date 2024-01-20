<script lang="ts">
	import Button from '$lib/button.svelte';
</script>

<form class="overflow-hidden rounded border border-gray-200">
	<textarea
		class="block w-full p-5 outline-none placeholder:text-gray-400"
		rows={5}
		placeholder="Write a comment..."
	/>

	<div class="flex items-center border-t border-gray-200 bg-gray-50 px-5 py-3">
		<div class="h-8 w-8 overflow-hidden rounded-full">
			<img src="/smiley.jpeg" alt="" class="h-full w-full" />
		</div>
		<div class="grow" />
		<Button size="sm" type="submit" class="font-bold">Post Comment</Button>
	</div>
</form>
