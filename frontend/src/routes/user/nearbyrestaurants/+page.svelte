<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getnearbyrestaurants } from '../../../functions';
	import User from '../user.svelte';
	let userid = Cookies.get('userid');
	let userlist = null;
	let posts = [];
	let start = 0,
		end = 19;
	let showmorebutton = false;
	onMount(async () => {
		userlist = await getnearbyrestaurants(userid);
		for (let i = 0; i < userlist.length; i++) {
			posts[i] = userlist[i][0];
			if (i >= end) {
				showmorebutton = true;
				console.log('breaking');
				break;
			}
		}
	});

	function increase() {
		start += 20;
		end += 20;
		for (let i = start; i < end; i++) {
			if (i >= userlist.length) {
				showmorebutton = false;
				break;
			}
			posts[i] = userlist[i][0];
		}
	}
</script>

{#if posts}
	{#each posts as u}
		<User userprofile={u} />
	{/each}
{/if}
{#if showmorebutton}
	<button class="showmoreposts" on:click={increase}>click to load more restaurants</button>
{:else}
	<h1>You're caught up for now</h1>
{/if}

<style>
	.showmoreposts {
		width: 700px;
		height: 40px;
		margin-bottom: 40px;
		background-color: rgb(61, 59, 59);
		color: white;
		font-size: 30px;
	}
</style>
