<script lang="ts">
	import {goto} from '$app/navigation';
	import ButtonGroup from '$lib/button-group.svelte';
	import Button from '$lib/button.svelte';
	import {dataAttr} from '$lib/data-attr';
	import {paginate} from '$lib/paginate';
	import Post from '$lib/post.svelte';

	let {data} = $props();
	let {pages} = $derived(
		paginate({
			page: data.page,
			size: data.size,
			count: data.count,
		}),
	);
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

{#if data.count > 0}
	<ButtonGroup class="mx-auto mt-8 w-fit">
		{#each pages as page}
			<Button
				variant="outline"
				data-selected={dataAttr(page.selected)}
				onclick={() => {
					goto(`/${data.tag}?page=${page.value}&size=${data.size}`);
				}}
			>
				{page.value}
			</Button>
		{/each}
	</ButtonGroup>
{/if}
