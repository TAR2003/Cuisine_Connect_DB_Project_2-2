<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { delivered, getorderinfo, ontheway, preparing, todate } from '../../functions';

	let userid = Cookies.get('userid');
	let usertype = Cookies.get('usertype');
	let time = '';
	export let orderid;
	let status = '';
	let orderinfo = null;
	onMount(async () => {
		orderinfo = await getorderinfo(orderid);
		det(orderinfo[5]);
		let t = todate(orderinfo[4]);

		time = t[0] + '/' + t[1] + '/' + t[2] + ' at ' + t[3] + ':' + t[4] + ':' + t[5];
	});
	function det(o) {
		if (o == 'O') status = 'Order placed';
		else if (o == 'P') status = 'Order is in preparation';
		else if (o == 'I') status = 'Order is on the way';
		else if (o == 'D') status = 'Order has been delivered';
	}
	function gotocustomerprofile() {
		window.location.href = `/user/profile/${orderinfo[34]}`;
	}
	function gotorestaurantprofile() {
		window.location.href = `/user/profile/${orderinfo[17]}`;
	}
	function gotomenu() {
		window.location.href = `/user/singleblock/${'menu'}/${orderinfo[2]}`;
	}
	async function p() {
		await preparing(orderid);
		det('P');
		update();
	}
	async function i() {
		await ontheway(orderid);
		det('I');
		update();
	}
	async function d() {
		await delivered(orderid);
		det('D');
		update();
	}
	async function update() {
		orderinfo = await getorderinfo(orderid);
	}
</script>

{#if orderinfo}
	<div class="m">
		<div class="main">
			<div class="col">
				<div class="row">
					<h3>Customer: <a on:click={gotocustomerprofile}>{orderinfo[36]}</a></h3>
				</div>
				<div class="row">
					<h3>Restaurant: <a on:click={gotorestaurantprofile}>{orderinfo[19]}</a></h3>
				</div>
				<div class="row">
					<h3>Status: {status}</h3>
				</div>
			</div>
			<div class="col">
				<div class="row">
					<h3>Menu: <a on:click={gotomenu}>{orderinfo[10]}</a></h3>
				</div>
				<div class="row">
					<h3>Amount: {orderinfo[7]}</h3>
				</div>
				<div class="row">
					<h3>Total Price: {orderinfo[6]}</h3>
				</div>
				<div class="row">
					<h3>Ordered on: {time}</h3>
				</div>
			</div>
		</div>

		{#if usertype == 'R'}
			{#if orderinfo[5] == 'O'}
				<button on:click={p}>Preparing</button>
			{:else if orderinfo[5] == 'P'}
				<button on:click={i}>On the way</button>
			{/if}
		{:else if usertype == 'C'}
			{#if orderinfo[5] == 'I'}
				<button on:click={d}>Delivered</button>
			{/if}
		{/if}
	</div>
{/if}

<style>
	.m {
		margin-bottom: 20px;
	}
	button {
		width: 100%;
		font-size: 30px;
		height: 40px;
	}
	.main {
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: black;
		margin-bottom: 0px;
	}
	.col {
		display: flex;
		flex-direction: column;
		width: 400px;
		border: 1px solid white;
		padding: 10px;
	}
	.row {
		display: flex;
		flex-direction: row;
	}
</style>
