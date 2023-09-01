<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import ConfirmationModal from './ConfirmationModal.svelte';
	import Newpost from './newpost.svelte';
	let username = Cookies.get('username');
	let userid = Cookies.get('userid');

	async function getprofilepicture() {
		let s = {
			title: 'getprofilepicture',
			userid: userid
		};
		try {
			const response = await fetch('http://localhost:3001/api/profilephoto', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(s)
			});

			if (response.ok) {
				const data = await response.json();
				return data;
			}
		} catch (error) {
			console.error('Error :', error);
		}
	}
	let profilepicpath = 'src/public/images/profilephoto1.jpg';
	onMount(async () => {
		if (username == '') window.location.href = '/';
		profilepicpath = await getprofilepicture();
	});
	let isLogoutModalVisible = false;
	function handleLogout() {
		isLogoutModalVisible = true;
	}
	function confirmLogout() {
		// Perform logout action here
		console.log('Logging out...');
		isLogoutModalVisible = false;
		Cookies.set('username', '');
		Cookies.set('userid', '');
		window.location.href = '/';
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
</script>

<div class="top">
	<div class="topleft">
		<div class="logo">
			<a href="/"
				><img src="src/public/images/CuisineConnectLOGO.png" alt="no image" class="logoimage" /></a
			>
		</div>
		<div class="searchbox">
			<input type="search" class="search" placeholder="search for anything" />
		</div>
	</div>
	<div class="topcenter">
		<div class="homeclass">
			<a href="/Customer"><p class="Home">Home</p></a>
		</div>
		<div class="homeclass">
			<a href="/Customer/friendrequests"><p class="Home">Friend Requests</p></a>
		</div>
		<div class="homeclass">
			<a href="/Customer/nearbyrestaurants"><p class="Home">Nearby Restaurants</p></a>
		</div>
		<div class="homeclass">
			<a href="/Customer/orders"><p class="Home">Orders</p></a>
		</div>
	</div>
	<div class="topright">
		<div class="msgclass">
			<a href="/Customer/notifications"><p class="msg">Notifications</p> </a>
		</div>
		<div class="msgclass">
			<a href="/Customer/messages"><p class="msg">Messages</p> </a>
		</div>
	</div>
</div>
<div class="container">
	<div class="leftbar">
		<button class="mainbutton"
			>{#if profilepicpath != null}<img class="profilephoto" src={profilepicpath} alt="" />
			{:else}<img class="profilephoto" src="src/public/images/null.png" alt="" />{/if}
			<p class="mainname">{username}</p></button
		>
		<button class="samebuttons">My Friends</button>
		<button class="samebuttons">My Restaurants</button>
		<button class="samebuttons">My Foodie Pages</button>
		<button class="samebuttons">Resevvations</button>
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
		<button class="samebuttonsright">New Review Post</button>
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
	.mainname {
		color: white;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
		font-size: 30px;
		padding-left: 10px;
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
		padding-left: 100px;
		margin-bottom: 15px;
		display: flex;
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
		padding-left: 100px;
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
</style>
