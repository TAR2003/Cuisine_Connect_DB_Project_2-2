<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getallfriends } from '../../../../functions';
	import Friend from '../../friend.svelte';
	import { page } from '$app/stores';
	let userid = Cookies.get('userid');
	let profileid = $page.params.userprofile;
	let friendlist = null;
	onMount(async () => {
		friendlist = await getallfriends(profileid);
		console.log(friendlist);
	});
</script>

{#if friendlist}
	<h1>All Friends</h1>
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
