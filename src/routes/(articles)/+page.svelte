<script lang="ts">
	import Post from '$lib/post.svelte';

	let {data} = $props();
</script>

<svelte:head>
	<title>Calvo JP | Conduit</title>
</svelte:head>

<div class="space-y-4 py-4">
	{#each data.rows as row}
		<Post
			id={row.id}
			slug={row.slug}
			title={row.title}
			description={row.description}
			content={row.content}
			tags={row.tags}
			createdAt={row.createdAt}
			authorId={row.author.id}
			authorName={row.author.name}
			authorImage={row.author.image}
			commentsCount={row._count.comments}
			favouritesCount={row._count.favourites}
		/>
	{/each}
</div>
