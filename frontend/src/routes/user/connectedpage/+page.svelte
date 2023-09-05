<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getconnectedpage } from '../../../functions';
	import User from '../user.svelte';
	let userid = Cookies.get('userid');
	let userlist = null;
	onMount(async () => {
		userlist = await getconnectedpage(userid);
		console.log(userlist[0]);
	});
</script>

{#if userlist}
	{#each userlist as u}
		<User userprofile={u[0]} />
	{/each}
{/if}
