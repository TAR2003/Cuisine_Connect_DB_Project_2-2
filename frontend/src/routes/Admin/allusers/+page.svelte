<script>
	import { onMount } from 'svelte';
	import { getallusers } from '../../../functions';

	let list = null;
	onMount(async () => {
		list = await getallusers();
		for (const t of list) {
			if (t[5] == 'C') t[5] = 'Customer';
			else if (t[5] == 'R') t[5] = 'Restaurant';
			else t[5] = 'FoodiePage';
		}
	});
</script>

{#if list}
	<h1>Total Users: {list.length}</h1>
	{#each list as l}
		<div class="container">
			<div class="col"><h2>User id: {l[0]}</h2></div>

			<div class="col"><h2>username: {l[1]}</h2></div>

			<div class="col"><h2>Full name: {l[2]}</h2></div>

			<div class="col"><h2>email: {l[4]}</h2></div>

			<div class="col"><h2>Mobile: {l[6]}</h2></div>

			<div class="col"><h2>User Type: {l[5]}</h2></div>
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
