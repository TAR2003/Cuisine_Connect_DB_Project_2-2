<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import ConfirmationModal from './ConfirmationModal.svelte';
	import Newpost from './newpost.svelte';
	import { findname, findusername, getprofilepicture, getuserinfoid } from '../../functions';
	import { goto } from '$app/navigation';
	let username = Cookies.get('username');
	let userid = Cookies.get('userid');
	let searchInput = '';
	let suggestions = ['John', 'Jane', 'Michael', 'Sara', 'j', 'j', 'j', 'j', 'j']; // Example suggestions

	let profilepicpath = null;
	let userinfo = null;
	onMount(async () => {
		if (userid == null) goto('/');
		userinfo = await getuserinfoid(userid);
		profilepicpath = userinfo[11];
	});
	let isLogoutModalVisible = false;
	function handleLogout() {
		isLogoutModalVisible = true;
	}
	function confirmLogout() {
		// Perform logout action here
		console.log('Logging out...');
		isLogoutModalVisible = false;
		Cookies.remove('username');
		Cookies.remove('userid');
		Cookies.remove('userid');
		goto('/');
	}
	function cancelLogout() {
		isLogoutModalVisible = false;
	}
	let isnewpostVisible = false;
	function handlenewpostclick() {
		isnewpostVisible = true;
	}
	function handleposting() {
		isnewpostVisible = false;
	}
	function handleprofilepictureclick() {
		window.location.href = `/user/profile/${userid}`;
		//location.reload();
	}
	function debug() {
		console.log(profilepicpath);
	}
	function showfriends() {
		window.location.href = `/user/myfriends/${userid}`;
	}
	function handlesearchclick(elem) {
		searchInput = '';
		window.location.href = `/user/profile/${elem[0]}`;
	}
	async function getsearchvalues() {
		if (searchInput.length > 0) {
			if (searchInput[0] == '@') {
				suggestions = await findusername(searchInput);
			} else suggestions = await findname(searchInput);
		}
	}
	async function gotofollowedrestaurants() {
		window.location.href = `/user/followedrestaurants/${userid}`;
	}
	console.log('searchinput -> ' + suggestions);
</script>

<div class="top">
	<div class="topleft">
		<div class="logo">
			<a href="/"
				><img src="/src/public/images/CuisineConnectLOGO.png" alt="no image" class="logoimage" /></a
			>
		</div>
		<div class="searchbox">
			<input
				type="search"
				class="search"
				placeholder="search for anything"
				bind:value={searchInput}
				on:input={getsearchvalues}
			/>
		</div>
	</div>

	<div class="topcenter">
		<div class="homeclass">
			<a href="/user"><p class="Home">Home</p></a>
		</div>
		{#if Cookies.get('usertype') == 'C'}<div class="homeclass">
				<a href="/user/friendrequests"><p class="Home">Friend Requests</p></a>
			</div>{/if}
		{#if Cookies.get('usertype') != 'R'}<div class="homeclass">
				<a href="/user/nearbyrestaurants"><p class="Home">Nearby Restaurants</p></a>
			</div>{/if}

		<div class="homeclass">
			<a href="/user/orders"><p class="Home">Orders</p></a>
		</div>
	</div>
	<div class="topright">
		<div class="msgclass">
			<a href="/user/notifications"><p class="msg">Notifications</p> </a>
		</div>
		<div class="msgclass">
			<a href="/user/messages"><p class="msg">Messages</p> </a>
		</div>
	</div>
</div>
<div class="r">
	{#if searchInput}
		<ul class="suggestions">
			{#each suggestions as suggestion}
				<li on:click={() => handlesearchclick(suggestion)}>
					<div class="inlist">
						<div class="leftlist">
							<img class="searchimage" src={suggestion[4]} />
						</div>
						<div class="midlist">
							<div class="t">{suggestion[2]}</div>
							<div class="l">{suggestion[1]}</div>
						</div>
						<div class="rightlist">{suggestion[3]}</div>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>
<div class="container">
	<div class="leftbar">
		<button class="mainbutton" on:click={handleprofilepictureclick}
			>{#if userinfo != null}<img class="profilephoto" src={userinfo[11]} alt="" />
				<div class="superdivclass">
					<p class="mainname">{userinfo[2]}</p>
					<p class="uname">{userinfo[1]}</p>
				</div>
			{/if}
		</button>
		{#if Cookies.get('usertype') == 'C'}<button class="samebuttons" on:click={showfriends}
				>My Friends</button
			>{/if}

		<button class="samebuttons" on:click={gotofollowedrestaurants}>My Followed Restaurants</button>
		<button class="samebuttons">My Foodie Pages</button>
		<button class="samebuttons">Reservations</button>
		<button class="samebuttons">{username}</button>
		<button class="samebuttons">{username}</button>
	</div>
	<div class="slot"><slot /></div>
	<div class="rightbar">
		<button class="samebuttonsright">Orders</button>
		<button class="samebuttonsright" on:click={handleLogout}>Log out</button>
		<button class="samebuttonsright">Deactivate</button>
		<button class="samebuttonsright">Delete Account</button>
		<button class="samebuttonsright" on:click={handlenewpostclick}>New Post</button>
	</div>
	<ConfirmationModal
		visible={isLogoutModalVisible}
		message="Are you sure you want to log out?"
		onConfirm={confirmLogout}
		onCancel={cancelLogout}
	/>
	<Newpost visible={isnewpostVisible} onConfirm={handleposting} onCancel={handleposting} />
</div>

<style>
	.uname {
		font-size: 15px;
		margin-top: 10px;
		padding-left: 20px;
	}

	.leftlist {
		width: 80px;
	}
	.midlist {
		display: flex;
		flex-direction: column;
		justify-content: left;
		width: 270px;
		margin: 0%;
	}
	.t,
	.l {
		padding-left: 20px;
		justify-content: left;
		text-align: left;
	}
	.t {
		font-size: 30px;
	}
	.l {
		color: aqua;
	}
	.rightlist {
		justify-content: center;
	}
	.inlist {
		display: flex;
		flex-direction: row;
	}
	.searchimage {
		max-width: 70px;
		max-height: 70px;
		border-radius: 100%;
	}
	.mainname {
		color: white;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
		font-size: 25px;
		padding-left: 15px;
		margin-top: 15px;
		margin-bottom: 0%;
	}
	.mainbutton {
		width: 500px;
		height: 100px;
		background-color: rgb(94, 92, 92);
		color: white;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
		font-size: 25px;
		text-align: left;
		padding-left: 40px;
		margin-bottom: 15px;
		display: flex;
	}
	.mainbutton:hover {
		border: 1px solid white;
	}
	.profilephoto {
		height: 100px;
		max-width: 100px;
		border-radius: 300px;
		display: inline-block;
	}
	.samebuttonsright {
		width: 500px;
		height: 100px;
		background-color: rgb(94, 92, 92);
		color: white;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
		font-size: 25px;
		text-align: right;
		padding-left: 100px;
		padding-right: 100px;
		margin-bottom: 15px;
	}
	.samebuttonsright:hover {
		background-color: black;
		border: 2px solid white;
	}
	.samebuttons {
		width: 500px;
		height: 100px;
		background-color: rgb(94, 92, 92);
		color: white;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
		font-size: 25px;
		text-align: left;
		padding-left: 40px;
		margin-bottom: 15px;
	}
	.samebuttons:hover {
		background-color: black;
		border: 2px solid white;
	}
	.leftbar,
	.rightbar,
	.slot {
		border: 1px solid white;
		height: 800px;
	}
	.leftbar {
		width: 500px;
		background-color: rgb(69, 68, 68);
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.rightbar {
		width: 500px;
		background-color: rgb(67, 66, 66);
		display: flex;
		flex-direction: column;
	}
	.slot {
		overflow-y: scroll;
		flex: 1;
		width: 900px;
		align-items: center;
		text-align: center;
	}

	.container {
		border: 1px solid white;
		height: 800px;
		width: 1900px;
		display: flex;
		flex-direction: row;
	}
	.msg {
		color: white;
		font-size: 28px;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		align-self: center;
		text-align: center;
		justify-content: center;
	}
	.msgclass {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 195px;
		height: 130px;
		margin: 0;
	}
	a {
		color: white;
	}
	.Home {
		color: white;
		font-size: 30px;
		align-self: center;
		text-align: center;
		justify-content: center;
		margin-top: 40px;
	}
	.homeclass {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 195px;
		height: 130px;
		margin: 0;
	}
	.search {
		width: 350px;
		justify-content: center;
		margin-top: 50px;
		height: 40px;
		background-color: rgb(63, 62, 62);
		color: white;
		border: 1px solid white;
		border-color: white;
		border-radius: 20px;
		font-size: 30px;
		font-weight: 20px;
		text-align: center;
	}
	.searchbox {
		display: inline-block;
		height: 130px;
		justify-content: center;
		text-align: center;
		width: 400px;
	}
	.logo {
		display: inline-block;
		height: 130px;
		width: 160px;
		justify-content: center;
		text-align: center;
	}
	.logoimage {
		width: 110px;
	}
	.top {
		height: 130px;
		display: flex;
		flex-direction: row;
		flex: 1;
		background-color: rgb(74, 72, 72);
	}
	.topleft {
		height: 130px;
		display: flex;
		flex-direction: row;
		width: 490px;
		margin: 0%;
		align-items: center;
	}
	.topcenter {
		height: 130px;
		width: 900px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex: 1;
		margin: 0%;
	}
	.topright {
		height: 130px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 490px;
		margin: 0%;
	}
	ul {
		list-style-type: none;
		padding: 0;
		width: 240px;
		margin-left: 110px;
		margin-top: 0%;
	}
	li {
		cursor: pointer;
		padding: 10px;
		height: 70px;
		margin-bottom: 30px;
		border: 1px solid white;
		margin: 0%;
		font-size: 25px;
	}
	.r {
		position: relative;
	}

	.suggestions {
		position: absolute;
		top: 100%; /* Position the suggestions list below the input */
		left: 0;
		width: 420px;
		max-height: 700px;
		margin-top: 0%;
		background-color: rgb(58, 57, 57);
		color: white;
		border: 1px solid #ccc;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 1; /* Ensure the suggestions appear above other content */
		text-align: center;
		font-size: 30px;
		overflow-y: scroll;
	}
	a {
		text-decoration: none;
		cursor: pointer;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
