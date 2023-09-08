<script>
	import { onMount } from 'svelte';
	import { getallpages, getallrestaurants, getallusers } from '../../../functions';

	let list = null;
	onMount(async () => {
		list = await getallpages();
	});
</script>

{#if list}
	<h1>Total Foodie Pages: {list.length}</h1>
	{#each list as l}
		<div class="container">
			<div class="col"><h2>Page id: {l[0]}</h2></div>

			<div class="col"><h2>Date of creation: {l[2]}</h2></div>

			<div class="col"><h2>Full name: {l[5]}</h2></div>

			<div class="col"><h2>username: {l[4]}</h2></div>
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
