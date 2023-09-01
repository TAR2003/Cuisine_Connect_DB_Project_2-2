<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getallfriendrequests } from '../../../functions';
	import Friend from '../friend.svelte';
	let userid = Cookies.get('userid');
	let friendlist = null;
	onMount(async () => {
		friendlist = await getallfriendrequests(userid);
		console.log(friendlist);
	});
</script>

{#if friendlist}
	<h1>All Friend Requests</h1>
	{#each friendlist as f}
		<Friend friendid={f[0]} />
	{/each}
{/if}

<style>
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		cursor: pointer;
		padding: 0.5rem;
	}
</style>
