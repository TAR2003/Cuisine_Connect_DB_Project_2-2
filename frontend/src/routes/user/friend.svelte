<script>
	let s = 0;

	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import {
		acceptrequest,
		deleterequest,
		getfriendshipstatus,
		getuserinfoid,
		giverequest,
		unfriend
	} from '../../functions';
	let userid = Cookies.get('userid');
	export let friendid;
	let friendinfo = null;
	let friendshipstatus = null;
	let friendshipstring = '';
	onMount(async () => {
		friendinfo = await getuserinfoid(friendid);
		friendshipstatus = await getfriendshipstatus(userid, friendid);
		if (friendshipstatus == 'no') friendshipstring = 'You are not friends with this user';
		else if (friendshipstatus == 'yes') friendshipstring = 'You are Friends';
		else if (friendshipstatus == 'ownrequest')
			friendshipstring = 'You have sent a friend request to this user';
		else if (friendshipstatus == 'hisrequest')
			friendshipstring = 'This user has send a friend request to you';
	});
	function gotoprofile() {
		window.location.href = `/user/profile/${friendinfo[0]}`;
	}
	async function friendinfoupdate() {
		friendshipstatus = await getfriendshipstatus(userid, friendid);
		if (friendshipstatus == 'no') friendshipstring = 'You are not friends with this user';
		else if (friendshipstatus == 'yes') friendshipstring = 'You are Friends';
		else if (friendshipstatus == 'ownrequest')
			friendshipstring = 'You have sent a friend request to this user';
		else if (friendshipstatus == 'hisrequest')
			friendshipstring = 'This user has send a friend request to you';
	}
	async function givereq() {
		if (friendshipstatus != 'no') return;
		await giverequest(userid, friendid);
		friendinfoupdate();
		//reloadpage();
	}
	async function acceptreq() {
		if (friendshipstatus != 'hisrequest') return;
		await acceptrequest(userid, friendid);
		friendinfoupdate();
		//reloadpage();
	}
	async function unfrienduser() {
		if (friendshipstatus != 'yes') return;
		await unfriend(userid, friendid);
		friendinfoupdate();
		///reloadpage();
	}
	async function deletereq() {
		if (friendshipstatus == 'yes' || friendshipstatus == 'no') return;
		await deleterequest(userid, friendid);
		friendinfoupdate();
		//reloadpage();
	}
	function reloadpage() {
		location.reload();
	}
</script>

{#if friendinfo}
	<div class="main">
		<div class="picandname">
			<img src={friendinfo[11]} alt="" class="pic" />
			<div class="superdivclass">
				<h2>{friendinfo[2]}</h2>
				<a on:click={gotoprofile}><p class="username">{friendinfo[1]}</p></a>
			</div>
		</div>

		{#if friendid != userid && Cookies.get('usertype') == 'C'}
			{#if friendshipstatus == 'no'}
				<button on:click={givereq} class="friendbutton">Send Request</button>
			{:else if friendshipstatus == 'yes'}
				<button on:click={unfrienduser} class="friendbutton"> Unfriend</button>
			{:else}
				{#if friendshipstatus == 'hisrequest'}
					<button on:click={acceptreq} class="friendbutton">Accept Request</button>{/if}
				<button on:click={deletereq} class="friendbutton">Delete Request</button>
			{/if}
		{/if}
	</div>
{/if}

<style>
	h2 {
		margin-top: 10px;
		margin-bottom: 0px;
		font-size: 30px;
		padding-left: 20px;
		text-align: left;
	}
	.friendbutton {
		width: 200px;
		height: 50px;
		font-size: 20px;
	}
	a {
		color: aqua;
	}
	.username {
		text-align: left;
		padding-left: 20px;
		font-size: 20px;
		margin-top: 0px;
	}
	.pic {
		max-width: 80px;
		max-height: 80px;
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
		height: 150px;
		align-self: center;
		margin-left: 80px;
		margin-bottom: 30px;
	}
	a {
		text-decoration: none;
		cursor: pointer;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
