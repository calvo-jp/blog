<script lang="ts">
	import {formatDate} from '$lib/format-date';
	import smiley from '$lib/smiley.jpeg';
	import AddComment from './add-comment.svelte';
	import Comment from './comment.svelte';

	let {data} = $props();
</script>

<svelte:head>
	<title>{data.post.title} | Conduit</title>

	<meta name="title" content={data.post.title} />
	<meta name="description" content={data.post.description} />

	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.description} />
</svelte:head>

<div>
	<section class="bg-gray-700 py-10 text-white dark:bg-neutral-800/50">
		<div class="mx-auto max-w-screen-lg px-4">
			<h1 class="text-[2.8rem] font-semibold leading-[1.1] drop-shadow-md">
				{data.post.title}
			</h1>

			<div class="mt-8 flex items-center gap-2 leading-none">
				<div class="h-8 w-8 overflow-hidden rounded-full">
					<img
						src={data.post.author.image ?? smiley}
						alt=""
						class="h-full w-full"
					/>
				</div>
				<div>
					<a href="/profile/{data.post.author.id}" class="leading-none">
						{data.post.author.name}
					</a>
					<div
						class="mt-px text-sm leading-none text-gray-400 dark:text-neutral-600"
					>
						{formatDate(data.post.createdAt)}
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-screen-lg px-4">
		<div class="border-b border-gray-200 py-8 dark:border-neutral-800">
			<article
				class="prose prose-lg prose-gray max-w-none dark:prose-neutral dark:prose-invert prose-p:leading-normal"
			>
				{@html data.post.content}
			</article>

			<ul class="mt-10 flex gap-1">
				{#each data.post.tags as tag}
					<li
						class="rounded-full border border-gray-200 px-2 py-1 text-sm leading-none text-gray-400 dark:border-neutral-800 dark:text-neutral-600"
					>
						{tag}
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="mx-auto mt-12 max-w-screen-md space-y-3 px-4">
		{#if data.user}
			<AddComment />
		{/if}

		{#await data.comments then comments}
			{#each comments as comment}
				<Comment
					id={comment.id}
					content={comment.content}
					createdAt={comment.createdAt}
					authorId={comment.user.id}
					authorName={comment.user.name}
					authorImage={comment.user.image}
				/>
			{/each}
		{/await}
	</section>
</div>
