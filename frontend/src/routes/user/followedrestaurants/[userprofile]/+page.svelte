<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getfollowedrestaurants } from '../../../../functions';
	import { page } from '$app/stores';
	import User from '../../user.svelte';
	let userid = Cookies.get('userid');
	let userprofile = $page.params.userprofile;
	let userlist = null;
	onMount(async () => (userlist = await getfollowedrestaurants(userprofile)));
</script>

{#if userlist}
	{#each userlist as u}
		<User userprofile={u[0]} />
	{/each}
{/if}
