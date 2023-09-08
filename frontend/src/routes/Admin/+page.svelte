<script>
	import { onMount } from 'svelte';
	import { getadminlog, todate } from '../../functions';

	let a = 0;
	let list = null;
	onMount(async () => {
		list = await getadminlog();
		for (const l of list) {
			let d = todate(l[2]);
			l[2] = d[0] + '/' + d[1] + '/' + d[2] + ' at ' + d[3] + ':' + d[4] + ':' + d[5];
		}
	});
</script>

<h1>All Activities</h1>
{#if list}
	{#each list as l}
		<div class="b">
			<div class="container">
				<h2>
					Activity ID :- {l[0]}
				</h2>
			</div>
			<div class="container"><h2>Activity :- {l[1]}</h2></div>

			<div class="container"><h2>Time :- {l[2]}</h2></div>

			<div class="container"><h2>User ID :- {l[3]}</h2></div>

			<div class="container">
				<h2>
					{l[4]}
				</h2>
			</div>
		</div>
	{/each}
{/if}

<style>
	.container {
		width: 300px;
		display: flex;
		flex-direction: column;
		overflow: scroll;
		border-right: 1px solid white;
	}
	h2 {
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		font-weight: 100;
		text-align: center;
	}
	h1 {
		text-align: center;
	}
	.b {
		border: 5px solid white;
		display: flex;
		flex-direction: row;
	}
</style>
