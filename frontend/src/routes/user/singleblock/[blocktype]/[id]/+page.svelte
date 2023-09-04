<script>
	import Cookies from 'js-cookie';
	import Menublock from '../../../menublock.svelte';
	import { get } from 'svelte/store';
	import Post from '../../../post.svelte';
	import { page } from '$app/stores';

	let userid = Cookies.get('userid');
	let blocktype = $page.params.blocktype;
	let id = $page.params.id;
</script>

{#if blocktype == 'menu'}
	<Menublock menuid={id} />
{/if}

{#if blocktype == 'post'}
	<Post postid={id} />
{/if}
