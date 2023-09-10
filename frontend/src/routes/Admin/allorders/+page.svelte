<script>
	import { onMount } from 'svelte';
	import { getallorders1, getallusers } from '../../../functions';

	let list = null;
	onMount(async () => {
		list = await getallorders1();
	});
</script>

{#if list}
	<h1>Total Orders: {list.length}</h1>
	{#each list as l}
		<div class="container">
			<div class="col"><h2>Order id: {l[0]}</h2></div>

			<div class="col"><h2>Menu: {l[44]}</h2></div>

			<div class="col"><h2>Amount: {l[7]}</h2></div>

			<div class="col"><h2>Time: {l[4]}</h2></div>

			<div class="col"><h2>Customer Name: {l[14]}</h2></div>

			<div class="col"><h2>Restaurant Name: {l[31]}</h2></div>
		</div>
	{/each}
{:else}<div class="loading-circle" />
{/if}

<style>
	h1 {
		text-align: center;
		font-size: 40px;
	}
	.col {
		border: 1px solid white;
		width: 280px;
		display: flex;
		flex-direction: column;
		text-align: center;
		overflow: scroll;
	}
	.container {
		display: flex;
		flex-direction: row;
		border: 2px solid white;
	}
</style>
