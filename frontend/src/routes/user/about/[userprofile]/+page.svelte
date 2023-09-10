<script>
	import { page } from '$app/stores';
	import jsCookie from 'js-cookie';
	import { onMount } from 'svelte';
	import {
		calculaterestaurantmenutransaction,
		calculaterestauranttransaction,
		cinfo,
		getuserinfoid,
		pinfo,
		rinfo,
		todate
	} from '../../../../functions';
	import Passwordchange from '../passwordchange.svelte';

	let userid = jsCookie.get('userid');
	let userprofile = $page.params.userprofile;
	let info = null;
	let rin = null;
	let pin = null;
	let cin = null;
	let time = '';
	let tp = 0;
	let tmp = 0;
	onMount(async () => {
		info = await getuserinfoid(userprofile);
		let t = todate(info[9]);
		time = t[0] + '/' + t[1] + '/' + t[2] + ' at ' + t[3] + ':' + t[4] + ':' + t[5];
		if (info[5] == 'C') {
			cin = await cinfo(userprofile);
			makeitdate(cin[0][2]);
		} else if (info[5] == 'R') {
			rin = await rinfo(userprofile);
			makeitdate(rin[0][2]);
			tp = await calculaterestauranttransaction(userid, userprofile);
			tmp = await calculaterestaurantmenutransaction(userid, userprofile);
		} else if (info[5] == 'P') {
			pin = await pinfo(userprofile);
			makeitdate(pin[0][2]);
		}
	});
	let date = '';
	function makeitdate(dt) {
		let d = todate(dt);
		date = d[0] + '/' + d[1] + '/' + d[2];
	}

	let isupdatepasswordvisible = false;
	function onupdateclick() {
		isupdatepasswordvisible = true;
	}
	function stopit() {
		isupdatepasswordvisible = false;
	}
</script>

{#if info}
	<div class="main">
		{#if info[5] == 'C'}
			<h1>Customer Profile</h1>
			<h2>Name: {info[2]}</h2>
			<h2>username: {info[1]}</h2>
			<h2>email: {info[4]}</h2>
			<h2>Mobile NO: {info[6]}</h2>
			<h2>location: {info[7]} {info[8]}</h2>
			<h2>Active Status: {info[10]}</h2>
			<h2>last updated on: {time}</h2>
			{#if cin}
				<h2>Date of Birth: {date}</h2>
				<h2>Friends: {cin[0][3]}</h2>
			{/if}
		{:else if info[5] == 'R'}
			<h1>Resturant profile</h1>
			<h2>Name: {info[2]}</h2>
			<h2>username: {info[1]}</h2>
			<h2>email: {info[4]}</h2>
			<h2>Mobile NO: {info[6]}</h2>
			<h2>location: {info[7]} {info[8]}</h2>
			<h2>Active Status: {info[10]}</h2>
			<h2>last updated on: {time}</h2>
			{#if rin}
				<h2>Date of opening: {date}</h2>
				<h2>Average Rating: {rin[0][3]}</h2>
				<h2>Total transaction: {tp}</h2>
				<h2>Total price of all the menu: {tmp}</h2>
			{/if}
		{:else}
			<h1>Page profile</h1>
			<h2>Name: {info[2]}</h2>
			<h2>username: {info[1]}</h2>
			<h2>email: {info[4]}</h2>
			<h2>Mobile NO: {info[6]}</h2>
			<h2>location: {info[7]} {info[8]}</h2>
			<h2>Active Status: {info[10]}</h2>
			<h2>last updated on: {time}</h2>
			{#if pin}
				<h2>Date of page creation: {date}</h2>
			{/if}
		{/if}
	</div>
{/if}
{#if userid == userprofile}
	<button on:click={onupdateclick}>Click to update your password</button>
{/if}
<Passwordchange visible={isupdatepasswordvisible} onConfirm={stopit} onCancel={stopit} />

<style>
	.main {
		display: flex;
		flex-direction: column;
		justify-content: left;
	}
</style>
