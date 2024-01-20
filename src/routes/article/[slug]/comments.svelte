<script lang="ts">
	import {formatDate} from '$lib/format-date';
	import TrashIcon from '$lib/trash-icon.svelte';
</script>

<div class="overflow-hidden rounded border border-gray-200">
	<p class="p-5 text-gray-600">Testing</p>

	<div
		class="flex items-center gap-1.5 border-t border-gray-200 bg-gray-50 px-5 py-3"
	>
		<div class="h-5 w-5 overflow-hidden rounded-full">
			<img src="/smiley.jpeg" alt="" class="h-full w-full" />
		</div>
		<a href="/profile/1" class="text-sm leading-none text-emerald-400">
			JP Calvo
		</a>
		<div class="text-sm leading-none text-gray-400">
			{formatDate(new Date())}
		</div>
		<div class="grow" />

		<form class="flex">
			<button type="submit" class="text-gray-500" title="Delete Comment">
				<TrashIcon class="h-4 w-4" />
				<span class="sr-only">Delete comment</span>
			</button>
		</form>
	</div>
</div>
