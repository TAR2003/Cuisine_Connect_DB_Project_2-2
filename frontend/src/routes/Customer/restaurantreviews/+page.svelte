<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getrestaurantreviewposts } from '../../../functions';
	import Post from '../post.svelte';

	let userprofile = Cookies.get('userprofile');
	let allposts = null;
	onMount(async () => {
		allposts = await getrestaurantreviewposts(userprofile);
	});
</script>

{#if allposts}
	{#each allposts as a}
		<Post postid={a[0]} />
	{/each}
{/if}
