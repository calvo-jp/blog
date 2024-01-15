<script lang="ts">
	import {enhance} from '$app/forms';
	import HeartIcon from '$lib/heart-icon.svelte';
</script>

<div class="border-b border-b-neutral-200 py-4 last:border-b-0">
	<div class="flex items-start">
		<div class="flex items-center gap-2 leading-none">
			<div class="h-8 w-8 overflow-hidden rounded-full">
				<img
					src="https://api.realworld.io/images/demo-avatar.png"
					alt=""
					class="h-full w-full"
				/>
			</div>
			<div>
				<a href="/profile/1" class="leading-none text-emerald-500">
					Maksim Esteban
				</a>
				<div class="text-sm leading-none text-neutral-400">Thu Jan 01 2024</div>
			</div>
		</div>
		<div class="grow" />

		<form method="post" use:enhance class="flex">
			<button
				type="submit"
				class="flex items-center gap-1 rounded border border-emerald-400 px-1.5 py-1 text-emerald-500 transition-colors duration-200 hover:bg-emerald-50/50"
			>
				<span class="sr-only">Add to favourites</span>
				<HeartIcon class="h-3 w-3" />
				<span class="text-sm leading-none">1</span>
			</button>
		</form>
	</div>

	<h2 class="mt-4 text-2xl font-semibold leading-tight">
		Ill quantify the redundant TCP bus, that should hard drive the ADP
		bandwidth!
	</h2>
	<p class="leading-tight text-neutral-400">
		Aut facilis qui. Cupiditate sit ratione eum sunt rerum impedit. Qui suscipit
		debitis et et voluptates voluptatem voluptatibus. Quas voluptatum quae
		corporis corporis possimus.
	</p>

	<div class="mt-4 flex items-center">
		<a
			href="/article/awesome-post"
			class="text-sm leading-none text-neutral-400 transition-colors duration-200 hover:text-emerald-500"
		>
			Read more...
		</a>
		<div class="grow" />
		<nav>
			<ul class="flex gap-1">
				{#each Array.from({length: 5}) as _}
					<li>
						<a
							href="/lorem"
							class="rounded-full border border-neutral-200 px-2 py-0.5 text-xs leading-none text-emerald-500"
						>
							lorem
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</div>
