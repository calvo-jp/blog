<script lang="ts">
	import Post from '$lib/post.svelte';

	let {data} = $props();
</script>

<svelte:head>
	<title>Calvo JP's Favourite | Conduit</title>
</svelte:head>

<div class="space-y-4 py-4">
	{#each data.posts as post}
		<Post
			id={post.id}
			slug={post.slug}
			title={post.title}
			description={post.description}
			content={post.content}
			tags={post.tags}
			createdAt={post.createdAt}
			authorId={post.author.id}
			authorName={post.author.name}
			authorImage={post.author.image}
			commentsCount={post._count.comments}
			favouritesCount={post._count.favourites}
		/>
	{/each}
</div>
