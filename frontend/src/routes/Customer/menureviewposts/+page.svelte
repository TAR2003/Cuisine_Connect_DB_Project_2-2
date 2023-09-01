<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import Post from '../post.svelte';
	import { getmenureviewposts } from '../../../functions';

	let menuid = Cookies.get('menuid');
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
