<script lang="ts">
	import ButtonGroup from '$lib/button-group.svelte';
	import Button from '$lib/button.svelte';
	import Post from '$lib/post.svelte';
</script>

<svelte:head>
	<title>Conduit</title>
</svelte:head>

<div class="py-4">
	<Post />
	<Post />
	<Post />
</div>

<ButtonGroup class="mx-auto mt-8 w-fit">
	<Button variant="outline">1</Button>
	<Button variant="outline" data-selected>2</Button>
	<Button variant="outline">3</Button>
</ButtonGroup>
