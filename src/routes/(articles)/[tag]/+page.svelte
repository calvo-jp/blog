<script lang="ts">
	import ButtonGroup from '$lib/button-group.svelte';
	import Button from '$lib/button.svelte';
	import ChevronLeftIcon from '$lib/chevron-left-icon.svelte';
	import ChevronRightIcon from '$lib/chevron-right-icon.svelte';
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
		<Button variant="outline">
			<ChevronLeftIcon class="h-5 w-5" />
		</Button>
		{#each pages as page}
			<Button variant="outline" data-selected={dataAttr(page.selected)}>
				{page.value}
			</Button>
		{/each}
		<Button variant="outline">
			<ChevronRightIcon class="h-5 w-5" />
		</Button>
	</ButtonGroup>
{/if}
