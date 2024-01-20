<script lang="ts">
	import {formatDate} from '$lib/format-date';
	import AddComment from './add-comment.svelte';
	import Comments from './comments.svelte';

	const markdown = `<p>Quis nesciunt ut est eos. Qui reiciendis doloribus. Est quidem ullam reprehenderit.</p><p>Est omnis eligendi quis quis quo eum officiis asperiores quis. Et sed dicta eveniet accusamus consequatur.
Ullam voluptas consequatur aut eos ducimus. Id officia est ut dicta provident beatae ipsa. Pariatur quo neque est perspiciatis non illo rerum expedita minima. Et commodi voluptas eos ex.</p><p>Unde velit delectus deleniti deleniti non in sit. Aliquid voluptatem magni. Iusto laborum aperiam neque delectus consequuntur provident est maiores explicabo. Est est sed itaque necessitatibus vitae officiis. Iusto dolores sint eveniet quasi dolore quo laborum esse laboriosam. Modi similique aut voluptates animi aut dicta dolorum. Sint explicabo autem quidem et.</p><p>Neque aspernatur assumenda fugit provident. Et fuga repellendus magnam dignissimos eius aspernatur rerum. Dolorum eius dignissimos et magnam voluptate aut voluptatem natus. Aut sint est eum molestiae consequatur officia omnis.
Quae et quam odit voluptatum itaque ducimus magni dolores ab. Dolorum sed iure voluptatem et reiciendis. Eveniet sit ipsa officiis laborum. In vel est omnis sed impedit quod magni. Dignissimos quis illum qui atque aut ut quasi sequi. Eveniet sit ipsa officiis laborum. In vel est omnis sed impedit quod magni. Dignissimos quis illum qui atque aut ut quasi sequi. Sapiente vitae culpa ut voluptatem incidunt excepturi voluptates exercitationem.</p><p>
Sed doloribus alias consectetur omnis occaecati ad placeat labore. Voluptate consequatur expedita nemo recusandae sint assumenda. Qui vel totam quia fugit saepe suscipit autem quasi qui. Et eum vel ut delectus ut nesciunt animi.</p>`;
</script>

<svelte:head>
	<title>Awesome Post | Conduit</title>
</svelte:head>

<div>
	<section class="bg-gray-700 py-10 text-white">
		<div class="mx-auto max-w-screen-lg px-4">
			<h1 class="text-[2.8rem] font-semibold leading-[1.1] drop-shadow-md">
				Try to calculate the JBOD firewall, maybe it will override the redundant
				port!
			</h1>

			<div class="mt-8 flex items-center gap-2 leading-none">
				<div class="h-8 w-8 overflow-hidden rounded-full">
					<img
						src="https://api.realworld.io/images/demo-avatar.png"
						alt=""
						class="h-full w-full"
					/>
				</div>
				<div>
					<a href="/profile/1" class="leading-none">Maksim Esteban</a>
					<div class="text-sm leading-none text-gray-400">
						{formatDate(new Date())}
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-screen-lg px-4">
		<div class="border-b border-gray-200 py-8">
			<article
				class="prose prose-lg prose-neutral max-w-none prose-p:leading-normal"
			>
				{@html markdown}
			</article>

			<ul class="mt-10 flex gap-1">
				{#each Array.from({length: 5}) as _}
					<li
						class="rounded-full border border-gray-200 px-2 py-1 text-sm leading-none text-gray-400"
					>
						lorem
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="mx-auto mt-12 max-w-screen-md space-y-3 px-4">
		<AddComment />
		<Comments />
	</section>
</div>
