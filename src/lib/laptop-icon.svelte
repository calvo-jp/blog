<script lang="ts">
	import type {HTMLAttributes} from 'svelte/elements';

	let {...props} = $props<HTMLAttributes<SVGSVGElement>>();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.66667"
	stroke-linecap="round"
	stroke-linejoin="round"
	{...props}
>
	<rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
	<line x1="2" x2="22" y1="20" y2="20" />
</svg>
