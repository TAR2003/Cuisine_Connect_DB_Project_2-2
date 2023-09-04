<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import Post from '../../post.svelte';
	import { getmenureviewposts } from '../../../../functions';
	import { page } from '$app/stores';

	let menuid = $page.params.menuid;
	let reviews = null;
	onMount(async () => {
		reviews = await getmenureviewposts(menuid);
	});
</script>

{#if reviews}
	{#each reviews as r}
		<Post postid={r[0]} />
	{/each}
{/if}

<style>
</style>
