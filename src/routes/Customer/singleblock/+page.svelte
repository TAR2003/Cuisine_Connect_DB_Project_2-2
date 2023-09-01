<script>
	import Cookies from 'js-cookie';
	import Menublock from '../menublock.svelte';
	import { get } from 'svelte/store';
	import Post from '../post.svelte';

	let userid = Cookies.get('userid');
	let blocktype = Cookies.get('blocktype');
</script>

{#if blocktype == 'menu'}
	<Menublock menuid={Cookies.get('menuid')} />
{/if}

{#if blocktype == 'post'}
	<Post postid={Cookies.get('postid')} />
{/if}
