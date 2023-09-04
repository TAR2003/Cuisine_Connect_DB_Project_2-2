<script>
	import Cookies from 'js-cookie';
	import Post from '../../post.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import {
		acceptrequest,
		addconnection,
		connectionstatus,
		deleterequest,
		getallprofileposts,
		getfollowstatus,
		getfriendshipstatus,
		getrestaurantrating,
		getuserinfoid,
		giverequest,
		removeconnection,
		setfollow,
		unfollow,
		unfriend
	} from '../../../../functions';

	let allposts = null;
	let profileinfo = null;
	let postids = [];
	let userid = Cookies.get('userid');
	let userprofile = $page.params.userprofile;

	let posts = [];
	let start = 0,
		end = 19;
	let showmorebutton = false;
	let showfriendsbutton = false;
	let friendshipstatus;
	let friendsnumber = 0;
	let friendshipstring = '';
	let followstatus = 0;
	let rating = 0;
	let pageconnection = 0;

	onMount(async () => {
		allposts = await getallprofileposts(userprofile);
		profileinfo = await getuserinfoid(userprofile);
		if (profileinfo[5] == 'C' && Cookies.get('usertype') == 'C') {
			if (userprofile != userid) {
				showfriendsbutton = true;
				friendshipstatus = await getfriendshipstatus(userid, userprofile);
				console.log(friendshipstatus + ' got that');
				if (friendshipstatus == 'no') friendshipstring = 'You are not friends with this user';
				else if (friendshipstatus == 'yes') friendshipstring = 'You are Friends';
				else if (friendshipstatus == 'ownrequest')
					friendshipstring = 'You have sent a friend request to this user';
				else if (friendshipstatus == 'hisrequest')
					friendshipstring = 'This user has send a friend request to you';
			}
		}
		if (profileinfo[5] == 'R') {
			followstatus = await getfollowstatus(userid, userprofile);
			rating = await getrestaurantrating(userprofile);
		}
		if (profileinfo[5] == 'P') {
			pageconnection = await connectionstatus(userid, userprofile);
		}

		console.log('since it then');
		for (let i = 0; i < allposts.length; i++) {
			posts[i] = allposts[i][0];
			if (i >= end) {
				showmorebutton = true;
				break;
			}
		}
	});

	function increase() {
		start += 20;
		end += 20;
		for (let i = start; i < end; i++) {
			if (i >= allposts.length) {
				showmorebutton = false;
				break;
			}
			posts[i] = allposts[i][0];
		}
	}
	async function friendinfoupdate() {
		friendshipstatus = await getfriendshipstatus(userid, userprofile);
		if (friendshipstatus == 'no') friendshipstring = 'You are not friends with this user';
		else if (friendshipstatus == 'yes') friendshipstring = 'You are Friends';
		else if (friendshipstatus == 'ownrequest')
			friendshipstring = 'You have sent a friend request to this user';
		else if (friendshipstatus == 'hisrequest')
			friendshipstring = 'This user has send a friend request to you';
	}
	async function givereq() {
		if (friendshipstatus != 'no') return;
		await giverequest(userid, userprofile);
		friendinfoupdate();
	}
	async function acceptreq() {
		if (friendshipstatus != 'hisrequest') return;
		await acceptrequest(userid, userprofile);
		friendinfoupdate();
	}
	async function unfrienduser() {
		if (friendshipstatus != 'yes') return;
		await unfriend(userid, userprofile);
		friendinfoupdate();
	}
	async function deletereq() {
		if (friendshipstatus == 'yes' || friendshipstatus == 'no') return;
		await deleterequest(userid, userprofile);
		friendinfoupdate();
	}
	function gotofriends() {
		window.location.href = `/user/myfriends/${userprofile}`;
	}
	function gotochat() {
		window.location.href = `/user/chat/${userprofile}`;
	}
	function gotoreviews() {
		window.location.href = `/user/restaurantreviews/${userprofile}`;
	}
	function gotomenu() {
		window.location.href = `/user/restaurantmenu/${userprofile}`;
	}
	function unflw() {
		followstatus = 0;
		unfollow(userid, userprofile);
	}
	function setflw() {
		followstatus = 1;
		setfollow(userid, userprofile);
	}
	function gotofollowers() {
		window.location.href = `/user/followerlist/${userprofile}`;
	}
	function gotofollowedrestaurants() {
		window.location.href = `/user/followedrestaurants/${userprofile}`;
	}
	async function pageconnect() {
		pageconnection = 1;
		await addconnection(userid, userprofile);
		console.log('clicked connect');
	}
	async function removepageconnet() {
		pageconnection = 0;
		await removeconnection(userid, userprofile);
		console.log('clicked disconnect');
	}
</script>

{#if profileinfo != null}
	<div class="coverphoto">
		<img class="cover" src={profileinfo[12]} alt="No image fpund" />
	</div>
	<div class="profile-picture">
		<img class="dp" src={profileinfo[11]} alt="no image" />
		<h1 class="title">{profileinfo[2]}</h1>
	</div>
	{#if profileinfo[5] == 'C'}
		<a on:click={gotofriends}>Friends</a>
	{:else if profileinfo[5] == 'R'}
		<a on:click={gotofollowers}>Followers</a>
	{/if}
	<a on:click={gotofollowedrestaurants}>Following</a>
	<a on:click={gotochat}>Message</a>

	{#if profileinfo[5] == 'R'}
		<h2>Restaurant Rating: {rating}</h2>
		{#if followstatus == 1}
			<h2>You follow this restaurant</h2>
		{:else}
			<h2>You do not follow this restaurant</h2>
		{/if}
		<div class="restaurantclass">
			<button class="sbt" on:click={gotomenu}>Menu</button>
			<button class="sbt" on:click={gotoreviews}>Reviews</button>
			<button class="sbt">Reserve</button>
			{#if followstatus == 0}
				<button class="sbt" on:click={setflw}>Follow</button>
			{:else}
				<button class="sbt" on:click={unflw}>Unfollow</button>
			{/if}
		</div>
	{/if}
	{#if profileinfo[5] == 'P'}
		<div>
			{#if pageconnection == 0}
				<button class="sbt" on:click={pageconnect}>Connect</button>
			{:else}
				<button class="sbt" on:click={removepageconnet}>Disconnect</button>
			{/if}
		</div>
	{/if}
{:else}<div class="loading-circle" />{/if}

{#if showfriendsbutton}
	<p>Friends :</p>
	<h1>{friendshipstring} .</h1>
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
{#if posts != null}
	{#each posts as p}
		{#if p != null}
			<Post postid={p} />
			<p>{p} is that</p>{/if}
	{/each}
{/if}
{#if showmorebutton}
	<button class="showmoreposts" on:click={increase}>click to load more posts</button>
{:else}
	<h1>You're caught up for now</h1>
{/if}

<style>
	.restaurantclass {
		display: flex;
		flex-direction: row;
	}
	.sbt {
		width: 230px;
		height: 50px;
		margin-left: 13px;
		font-size: 20px;
	}
	a {
		color: aqua;
		font-size: 30px;
	}
	.friendbutton {
		width: 200px;
		height: 50px;
		font-size: 20px;
	}
	.showmoreposts {
		width: 700px;
		height: 40px;
		margin-bottom: 40px;
		background-color: rgb(61, 59, 59);
		color: white;
		font-size: 30px;
	}
	.title {
		margin-top: 70px;
		margin-left: 50px;
		font-size: 30px;
		font-family: Georgia, 'Times New Roman', Times, serif;
	}
	.dp {
		width: 200px;
		border-radius: 100%;
	}
	.profile-picture {
		display: flex;
		flex-direction: row;
		margin-bottom: 60px;
	}
	.cover {
		height: 400px;
		max-width: 700px;
	}
	.loading-circle {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid #3498db;
		border-radius: 50%;
		animation: spin 2s linear infinite;
		margin: 20px auto;
		margin-bottom: 300px;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	a {
		text-decoration: none;
		cursor: pointer;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
