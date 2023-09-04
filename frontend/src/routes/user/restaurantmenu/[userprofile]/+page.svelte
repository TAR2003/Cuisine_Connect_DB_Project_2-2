<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getmenu } from '../../../../functions';
	import Post from '../../post.svelte';
	import Menublock from '../../menublock.svelte';
	import { page } from '$app/stores';

	let userprofile = $page.params.userprofile;
	let allmenu = null;
	onMount(async () => {
		allmenu = await getmenu(userprofile);
	});
</script>

{#if allmenu}
	{#each allmenu as a}
		<Menublock menuid={a[0]} />
	{/each}
{/if}
