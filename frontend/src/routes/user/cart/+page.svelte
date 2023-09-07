<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import {
		clearcart,
		decreaseamount,
		finalizecart,
		getcart,
		getmenublockinfo,
		getorderinfo,
		increaseamount,
		removefromcart
	} from '../../../functions';
	import Orderblock from '../orderblock.svelte';
	import Menublock from '../menublock.svelte';

	let userid = Cookies.get('userid');
	let orderlist = null;
	let orderinfo = [];
	let info = null;
	let totalcost = 0;
	onMount(async () => {
		orderlist = await getcart(userid);

		for (const r of orderlist) {
			const temp = await getorderinfo(r[0]);
			orderinfo = [...orderinfo, temp];
		}
		console.log(orderinfo.length);
		info = orderinfo;
		totalcostcalculation();
	});
	function totalcostcalculation() {
		totalcost = 0;
		for (const r of orderinfo) {
			totalcost += r[6];
		}
	}
	async function removefromthecart(orderid) {
		await removefromcart(orderid);
		orderinfo = orderinfo.filter((item) => item[0] !== orderid);
	}
	function gotomenublock(menuid) {
		window.location.href = `/user/singleblock/${'menu'}/${menuid}`;
	}
	function gotorestaurant(rid) {
		window.location.href = `/user/profile/${rid}`;
	}
	async function increase(orderid) {
		await increaseamount(orderid);
		await update(orderid);
	}
	async function decrease(orderid) {
		const indexToUpdate = orderinfo.findIndex((item) => item[0] === orderid);
		if (orderinfo[indexToUpdate][7] <= 1) return;
		await decreaseamount(orderid);
		await update(orderid);
	}
	async function update(orderid) {
		const indexToUpdate = orderinfo.findIndex((item) => item[0] === orderid);
		if (indexToUpdate !== -1) {
			orderinfo[indexToUpdate] = await getorderinfo(orderid); // Replace with your new values
		}
		totalcostcalculation();
	}
	async function clearthecart() {
		//if (orderinfo.length == 0) return;
		await clearcart(userid);
		//await location.reload();
		orderinfo = [];
		totalcost = 0;
		notificationmsg = 'Your cart has been cleared';
		shownotification();
	}
	async function confirmthecart() {
		//if (orderinfo.length == 0) return;
		await finalizecart(userid);
		//location.reload();
		orderinfo = [];
		totalcost = 0;
		notificationmsg = 'Order has been confirmed';
		shownotification();
	}
	let notificationVisible = false;
	let notificationmsg = '';
	function shownotification() {
		notificationVisible = true;
		setTimeout(() => {
			notificationVisible = false;
		}, 5000);
	}
</script>

<h1>Your Cart</h1>

<div class="t">
	{#if orderinfo.length > 0}
		{#each orderinfo as o}
			<div class="container">
				<div class="main">
					<div class="upper1">
						<h2>Menu Name: <a on:click={() => gotomenublock(o[2])}>{o[10]}</a></h2>
					</div>
					<div class="upper">
						<h1 class="amount">Amount: {o[7]}</h1>
					</div>
					<div class="change">
						<button class="same" on:click={() => increase(o[0])}>+</button>
						<button class="same" on:click={() => decrease(o[0])}>-</button>
					</div>
				</div>
				<div class="main">
					<div class="upper1">
						<h2>Restaurant Name: <a on:click={() => gotorestaurant(o[17])}> {o[19]}</a></h2>
					</div>
					<div class="upper1"><h3>Total Price: {o[6]}</h3></div>
				</div>
				<button class="remove" on:click={() => removefromthecart(o[0])}>Remove from cart</button>
			</div>
		{/each}
	{/if}
</div>
<div class="makeright">
	<h1 class="totalcost">Total Cost :- {totalcost}</h1>
</div>

{#if notificationVisible}
	<div class="notification">{notificationmsg}</div>
{/if}

<button class="confirm" on:click={confirmthecart}>Pay and Confirm your order</button>
<button class="clear" on:click={clearthecart}> Clear cart </button>

<style>
	.notification {
		position: fixed;
		bottom: 100px;
		right: 800px;
		background-color: #545654;
		color: white;
		padding: 20px;
		border-radius: 10px;
		animation: fadeOut 5s ease;
		font-size: 30px;
	}

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	.confirm,
	.clear {
		width: 400px;
		height: 60px;
		font-size: 30px;
	}
	.totalcost {
		text-align: right;
		margin-right: 60px;
	}
	.makeright {
		align-items: right;
	}
	.same {
		width: 60px;
		font-size: 40px;
	}
	.change {
		display: flex;
		flex-direction: row;
		justify-content: right;
	}
	.container {
		margin-bottom: 20px;
		background-color: black;
	}
	.t {
		margin-bottom: 20px;
		border: 3px dotted white;
		padding: 20px;
	}
	.remove {
		width: 100%;
		height: 40px;
		font-size: 20px;
	}
	.main {
		width: 850px;
		height: 80px;
		display: flex;
		flex-direction: row;
	}
	.upper {
		width: 320px;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.upper1 {
		width: 420px;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.amount {
		margin-left: 100px;
		text-align: right;
		font-family: 'Times New Roman', Times, serif;
	}
	h2,
	h3,
	h1 {
		font-family: 'Times New Roman', Times, serif;
	}
</style>
