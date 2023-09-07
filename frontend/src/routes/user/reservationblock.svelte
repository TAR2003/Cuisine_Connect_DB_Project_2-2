<script>
	import jsCookie from 'js-cookie';
	import { onMount } from 'svelte';
	import { getuserinfoid, removereservation, todate } from '../../functions';
	export let userprofile;
	export let time;
	let time1 = todate(time);
	let date = time1[0] + '/' + time1[1] + '/' + time1[2];
	let userid = jsCookie.get('userid');
	let usertype = jsCookie.get('usertype');
	let info = null;
	onMount(async () => {
		info = await getuserinfoid(userprofile);
		console.log(usertype, ' si the type');
	});
	function gotopprofile() {
		window.location.href = `/user/profile/${userprofile}`;
	}
	async function remove() {
		await removereservation(userid, userprofile);
		info = null;
	}
</script>

<div class="main">
	{#if info}
		{#if usertype == 'C'}
			<p>You reserved a table on <a on:click={gotopprofile}>{info[2]}</a> at {date}</p>
			<button on:click={remove}>Cancel reservation</button>
		{:else if usertype == 'R'}
			<p><a on:click={gotopprofile}>{info[2]}</a> reserved a table in your restaurant at {date}</p>
		{/if}
	{/if}
</div>

<style>
	button {
		width: 100%;
		height: 40px;
		font-size: 25px;
	}
	p {
		font-size: 30px;
	}
	.main {
		width: 100%;
		border: 1px solid white;
		background-color: black;
		padding-bottom: 10px;
		margin-bottom: 20px;
	}
</style>
