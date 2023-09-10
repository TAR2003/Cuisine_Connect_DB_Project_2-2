<script>
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import {
		addconnection,
		connectionstatus,
		getfollowstatus,
		getuserinfoid,
		haversine,
		removeconnection,
		setfollow,
		unfollow
	} from '../../functions';
	import Friend from './friend.svelte';
	export let userprofile;
	let userid = Cookies.get('userid');
	let info = null;
	let followstatus = 0;
	let pageconnectionstatus = 0;
	let distance = null;
	onMount(async () => {
		info = await getuserinfoid(userprofile);
		let tempu = await getuserinfoid(userid);
		distance = haversine(tempu[7], tempu[8], info[7], info[8]);
		distance = distance.toFixed(2);
		if (info[5] == 'R') followstatus = await getfollowstatus(userid, userprofile);
		if (info[5] == 'P') pageconnectionstatus = await connectionstatus(userid, userprofile);
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
		window.location.href = `/user/profile/${info[0]}`;
	}
	async function pageconnect() {
		pageconnectionstatus = 1;
		await addconnection(userid, userprofile);
		console.log('clicked connect');
	}
	async function removepageconnet() {
		pageconnectionstatus = 0;
		await removeconnection(userid, userprofile);
		console.log('clicked disconnect');
	}
</script>

{#if info}
	{#if info[5] == 'C'}
		<Friend friendid={info[0]} />
	{:else if info[5] == 'R'}
		<div class="main">
			<div class="picandname">
				<img src={info[11]} alt="" class="pic" />
				<div class="superdivclass">
					<h2>{info[2]}</h2>
					<a on:click={gotoprofile}><p class="username">{info[1]}</p></a>
				</div>
			</div>
			<div class="newflex">
				{#if followstatus == 0}
					<button class="sbt" on:click={setflw}>Follow</button>
				{:else}
					<button class="sbt" on:click={unflw}>Unfollow</button>
				{/if}
			</div>
			{#if distance}
				<p>distance from your address: {distance} km</p>
			{/if}
		</div>
	{:else}
		<div class="main">
			<div class="picandname">
				<img src={info[11]} alt="" class="pic" />
				<div class="superdivclass">
					<h2>{info[2]}</h2>
					<a on:click={gotoprofile}><p class="username">{info[1]}</p></a>
				</div>
			</div>
			<div class="newflex">
				{#if pageconnectionstatus == 0}
					<button class="sbt" on:click={pageconnect}>Connect</button>
				{:else}
					<button class="sbt" on:click={removepageconnet}>Disconnect</button>
				{/if}
			</div>
			{#if distance}
				<p>distance from your address: {distance} km</p>
			{/if}
		</div>
	{/if}
{/if}

<style>
	h2 {
		margin-bottom: 0%;
		margin-left: 20px;
		text-align: left;
		font-size: 30px;
	}
	a {
		text-decoration: none;
		cursor: pointer;
	}

	a:hover {
		text-decoration: underline;
	}
	.sbt {
		width: 230px;
		height: 50px;
		margin-left: 80px;
		font-size: 20px;
		align-self: center;
		justify-content: center;
		text-align: center;
	}
	.newflex {
		display: flex;
		flex-direction: row;
		text-align: center;
		justify-content: center;
	}
	a {
		color: aqua;
	}
	.username {
		text-align: left;
		font-size: 20px;
		margin-left: 20px;
		margin-top: 0px;
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
		height: 170px;
		margin-left: 80px;
		margin-bottom: 30px;
	}
</style>
