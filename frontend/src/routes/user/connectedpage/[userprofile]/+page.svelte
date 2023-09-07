<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getconnectedpage } from '../../../../functions';
	import User from '../../user.svelte';
	import { page } from '$app/stores';
	let userid = Cookies.get('userid');
	let userlist = null;
	let up = $page.params.userprofile;
	onMount(async () => {
		userlist = await getconnectedpage(up);
		console.log(userlist[0]);
	});
</script>

{#if userlist}
	{#each userlist as u}
		<User userprofile={u[0]} />
	{/each}
{/if}
