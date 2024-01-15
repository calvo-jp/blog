<script lang="ts">
	import Button from '$lib/button.svelte';
	import Input from '$lib/input.svelte';
	import Textarea from '$lib/textarea.svelte';
	import TagsInput from './tags-input.svelte';

	let tags = $state<string[]>([]);
</script>

<svelte:head>
	<title>Editor | Conduit</title>
</svelte:head>

<div class="mx-auto max-w-screen-md py-8">
	<form class="space-y-4">
		<Input placeholder="Article Title" size="lg" />
		<Input placeholder="What's this article about?" />
		<Textarea rows={8} placeholder="Write your article (in markdown)" />
		<TagsInput
			value={tags}
			onchange={(value) => {
				tags = value;
			}}
		/>
		<div class="flex justify-end">
			<Button size="lg" type="submit">Publish Article</Button>
		</div>
	</form>
</div>
