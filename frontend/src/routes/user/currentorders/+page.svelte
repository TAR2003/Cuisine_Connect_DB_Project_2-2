<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getallorders, getcurrentorders, pendingorders } from '../../../functions';
	import Orderblock from '../orderblock.svelte';
	let userid = Cookies.get('userid');
	let usertype = Cookies.get('usertype');
	let orderlist = null;
	onMount(async () => {
		if (usertype == 'C') orderlist = await getcurrentorders(userid);
		else if (usertype == 'R') orderlist = await pendingorders(userid);
	});
</script>

{#if orderlist}
	{#each orderlist as o}
		<Orderblock orderid={o[0]} />
	{/each}
{/if}
