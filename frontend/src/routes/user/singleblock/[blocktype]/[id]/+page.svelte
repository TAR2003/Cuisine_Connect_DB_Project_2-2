<script>
	import Cookies from 'js-cookie';
	import Menublock from '../../../menublock.svelte';
	import { get } from 'svelte/store';
	import Post from '../../../post.svelte';
	import { page } from '$app/stores';
	import Orderblock from '../../../orderblock.svelte';

	let userid = Cookies.get('userid');
	let blocktype = $page.params.blocktype;
	let id = $page.params.id;
	console.log(id);
</script>

{#if id != '[object Object]'}
	{#if blocktype == 'menu'}
		<Menublock menuid={id} />
	{/if}

	{#if blocktype == 'post'}
		<Post postid={id} />
	{/if}

	{#if blocktype == 'order'}
		<Orderblock orderid={id} />
	{/if}
{:else}
	<h1>that post or order doesnot exist right now</h1>
{/if}
