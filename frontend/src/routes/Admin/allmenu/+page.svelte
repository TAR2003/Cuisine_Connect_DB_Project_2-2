<script>
	import { onMount } from 'svelte';
	import { getallmenu, getallrestaurants, getallusers } from '../../../functions';

	let list = null;
	onMount(async () => {
		list = await getallmenu();
	});
</script>

{#if list}
	<h1>Total Menu: {list.length}</h1>
	{#each list as l}
		<div class="container">
			<div class="col"><h2>Menu id: {l[0]}</h2></div>

			<div class="col"><h2>Menu Name: {l[2]}</h2></div>

			<div class="col"><h2>Price: {l[3]}</h2></div>

			<div class="col"><h2>Restaurant Name: {l[11]}</h2></div>
		</div>
	{/each}
{/if}

<style>
	h1 {
		text-align: center;
		font-size: 40px;
	}
	.col {
		border: 1px solid white;
		width: 380px;
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
