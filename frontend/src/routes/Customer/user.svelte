<script>
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import { getfollowstatus, getuserinfoid, setfollow, unfollow } from '../../functions';
	import Friend from './friend.svelte';
	export let userprofile;
	let userid = Cookies.get('userid');
	let info = null;
	let followstatus = 0;
	onMount(async () => {
		info = await getuserinfoid(userprofile);
		followstatus = await getfollowstatus(userid, userprofile);
	});
	function unflw() {
		followstatus = 0;
		unfollow(userid, userprofile);
	}
	function setflw() {
		followstatus = 1;
		setfollow(userid, userprofile);
	}
	function gotoprofile() {
		Cookies.set('userprofile', info[0]);
		window.location.href = '/Customer/profile';
	}
</script>

{#if info}
	{#if info[5] == 'C'}
		<Friend friendid={info[0]} />
	{:else}
		<div class="main">
			<div class="picandname">
				<img src={info[11]} alt="" class="pic" />

				<h2>{info[2]}</h2>
			</div>
			<div class="newflex">
				<a href="/Customer/profile" on:click={gotoprofile}><p class="username">{info[1]}</p></a>
				{#if followstatus == 0}
					<button class="sbt" on:click={setflw}>Follow</button>
				{:else}
					<button class="sbt" on:click={unflw}>Unfollow</button>
				{/if}
			</div>
		</div>
	{/if}
{/if}

<style>
	.sbt {
		width: 230px;
		height: 50px;
		margin-left: 80px;
		font-size: 20px;
	}
	.newflex {
		display: flex;
		flex-direction: row;
	}
	a {
		color: aqua;
	}
	.username {
		text-align: left;
		margin-left: 20px;
		font-size: 20px;
	}
	.pic {
		max-width: 100px;
		max-height: 100px;
		border-radius: 100%;
		margin-right: 20px;
	}
	.picandname {
		display: flex;
		flex-direction: row;
	}
	.main {
		border: 1px solid white;
		width: 700px;
		height: 200px;
		align-self: center;
		margin-left: 80px;
		margin-bottom: 30px;
	}
</style>
