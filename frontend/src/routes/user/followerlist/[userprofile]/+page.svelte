<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getfollowlist, setfollow, unfollow } from '../../../../functions';
	import User from '../../user.svelte';
	import { page } from '$app/stores';
	let userprofile = $page.params.userprofile;
	let followlists = null;
	let followstatus = 0;
	onMount(async () => {
		followlists = await getfollowlist(userprofile);
		console.log(followlists);
	});
</script>

<p>in the folowrlist</p>
{#if followlists}
	{#each followlists as f}
		<User userprofile={f[0]} />
	{/each}
{/if}
