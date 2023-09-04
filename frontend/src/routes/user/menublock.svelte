<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getmenublockinfo } from '../../functions';
	import Newreviewpost from './newreviewpost.svelte';
	export let menuid;
	//let menuid = Cookies.get('menuid');
	let menuinfo = null;
	onMount(async () => {
		menuinfo = await getmenublockinfo(menuid);
	});

	function gotorestaurantprofile() {
		window.location.href = `/user/profile/${menuinfo[0][6]}`;
	}
	function gotoreviews() {
		window.location.href = `/user/menureviewposts/${menuid}`;
	}
	let newreviewpostvisible = false;
	function handlenewreviewpostclick() {
		newreviewpostvisible = true;
	}
	async function handleclose() {
		menuinfo = await getmenublockinfo(menuid);
		newreviewpostvisible = false;
	}
</script>

<div class="main">
	{#if menuinfo}
		<h1>{menuinfo[0][2]}</h1>
		<h2>From the Restaurant</h2>
		<div class="picandname">
			<img src={menuinfo[0][20]} class="posterpic" alt="failed image" />
			<div class="superdivlcass">
				<p class="personname">{menuinfo[0][11]}</p>
				<a on:click={gotorestaurantprofile}><p class="personusername">{menuinfo[0][10]}</p></a>
			</div>
		</div>

		<div class="lower">
			<p class="t">Average Rating: {menuinfo[0][4]}</p>
			<p class="t">Price: ${menuinfo[0][3]}</p>
		</div>
		<div class="lower">
			<button>Order item</button>
			<button on:click={handlenewreviewpostclick}>Give a review</button>
			<button on:click={gotoreviews}>See reviews</button>
		</div>
	{/if}
	<Newreviewpost
		visible={newreviewpostvisible}
		onConfirm={handleclose}
		onCancel={handleclose}
		{menuid}
	/>
</div>

<style>
	button {
		width: 200px;
		height: 40px;
		margin-left: 10px;
		margin-right: 12px;
		font-size: 30px;
	}
	.t {
		font-size: 30px;
		margin-left: 30px;
		margin-right: 100px;
	}
	.lower {
		display: flex;
		flex-direction: row;
	}
	h1 {
		padding-top: 20px;
	}
	.posterpic {
		max-width: 100px;
		max-height: 100px;
		border-radius: 100%;
	}
	.picandname {
		display: flex;
		flex-direction: row;
		margin-left: 20px;
	}
	.main {
		width: 700px;
		height: 450px;
		background-color: black;
		border-radius: 30px;
		margin-left: 80px;
		justify-content: left;
		align-items: left;
	}
	.personusername {
		font-family: Arial, Helvetica, sans-serif;
		margin-left: 20px;
		color: aqua;
		justify-content: left;
		text-align: left;
		margin-top: 0px;
	}
	.personname {
		font-size: 33px;
		font-family: 'Courier New', Courier, monospace;
		font-weight: 800;
		margin-left: 20px;
		margin-bottom: 0px;
	}
	a {
		text-decoration: none;
		cursor: pointer;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
