<script>
	import { goto } from '$app/navigation';
	import jsCookie from 'js-cookie';
	import { onMount } from 'svelte';
	import { calculatemenuprice, calculatetotaltransaction } from '../../functions';

	let username = jsCookie.get('username');

	let tt = 0;
	let tmp = 0;
	onMount(async () => {
		console.log(username);
		if (username != 'admin') goto('/');
		tt = await calculatetotaltransaction();
		tmp = await calculatemenuprice();
	});
	function logout() {
		jsCookie.remove('username');
		goto('/');
	}
	function gotousers() {
		window.location.href = '/Admin/allusers';
	}
	function gotocustomers() {
		window.location.href = '/Admin/allcustomers';
	}
	function gotorestaurants() {
		window.location.href = '/Admin/allrestaurants';
	}
	function gotomenus() {
		window.location.href = '/Admin/allmenu';
	}
	function gotopages() {
		window.location.href = '/Admin/allpages';
	}
	function gotorders() {
		window.location.href = '/Admin/allorders';
	}
</script>

<div class="upper">
	<div class="col">
		<h2>Total Transaction: ${tt}</h2>
		<h2>Total Price of all listed menu: ${tmp}</h2>
	</div>

	<h1><a href="/Admin">Admin Panel</a></h1>
	<button class="logout" on:click={logout}>Log out</button>
</div>
<div class="lower">
	<div class="left">
		<button class="same" on:click={gotousers}>All Users</button>
		<button class="same" on:click={gotocustomers}>All Customers</button>
		<button class="same" on:click={gotorestaurants}>All Restaurants</button>
		<button class="same" on:click={gotopages}>All Foodie Pages</button>
		<button class="same" on:click={gotomenus}>All Menus</button>
		<button class="same" on:click={gotorders}>All Orders</button>
	</div>
	<div class="mid">
		<slot />
	</div>
</div>

<style>
	a {
		color: white;
	}
	.same {
		height: 100px;
		margin-bottom: 20px;
		background-color: black;
		color: white;
		font-size: 30px;
	}
	.same:hover {
		background-color: white;
		border: 10px solid blue;
		color: black;
	}
	.col {
		display: flex;
		flex-direction: column;
		position: fixed;
		left: 40px;
		margin-right: 40px;
		width: 600px;
		margin-bottom: 0%;
	}
	h2 {
		left: 30px;
		font-size: 30px;
		padding: 0%;
		margin: 2%;
	}
	.logout {
		position: fixed;
		width: 200px;
		height: 70px;
		margin-top: 30px;
		right: 200px;
		font-size: 30px;
	}
	.search {
		width: 600px;
		height: 100px;
		justify-content: center;
	}
	.upper {
		width: 100%;
		height: 200px;
		border: 1px solid white;
		text-align: center;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.lower {
		display: flex;
		flex-direction: row;
	}
	.mid,
	.left,
	.right {
		display: flex;
		flex-direction: column;
		height: 720px;
		border: 1px solid white;
	}
	.left {
		width: 400px;
	}
	.mid {
		width: 1550px;
		overflow-y: scroll;
		text-align: left;
	}
	h1 {
		font-size: 80px;
	}
</style>
