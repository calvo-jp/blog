<script lang="ts">
	import {enhance} from '$app/forms';
	import Alert from '$lib/alert.svelte';
	import Button from '$lib/button.svelte';
	import Input from '$lib/input.svelte';
	import Textarea from '$lib/textarea.svelte';
	import TagsInput from './tags-input.svelte';

	let {form} = $props();

	let tags = $state<string[]>([]);
</script>

<svelte:head>
	<title>Editor | Conduit</title>
</svelte:head>

<div class="mx-auto max-w-screen-md px-4 py-8">
	{#if form}
		{#if form.success}
			<Alert class="mb-4">{form.message}</Alert>
		{:else}
			<Alert status="error" class="mb-4">{form.message}</Alert>
		{/if}
	{/if}

	<form method="post" novalidate class="space-y-4" use:enhance>
		<Input name="title" placeholder="Article Title" size="lg" />
		<Input name="description" placeholder="What's this article about?" />
		<Textarea
			name="content"
			rows={8}
			placeholder="Write your article (in markdown)"
		/>
		<TagsInput
			name="tags"
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
