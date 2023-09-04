<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getnearbyrestaurants } from '../../../functions';
	import User from '../user.svelte';
	let userid = Cookies.get('userid');
	let userlist = null;
	onMount(async () => {
		userlist = await getnearbyrestaurants(userid);
	});
</script>

{#if userlist}
	{#each userlist as u}
		<User userprofile={u[0]} />
	{/each}
{/if}
