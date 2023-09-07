<script>
	import jsCookie from 'js-cookie';
	import { onMount } from 'svelte';
	import { getordernotification, getpostnotification, seen } from '../../functions';

	let userid = jsCookie.get('userid');
	export let ninfo;
	let type = ninfo[4];
	onMount(async () => {});

	async function clicked() {
		await seen(ninfo[0]);
		if (type == 'O') {
			let id = await getordernotification(ninfo[0]);
			window.location.href = `/user/singleblock/${'order'}/${id}`;
		} else if (type == 'P') {
			let id = await getpostnotification(ninfo[0]);
			window.location.href = `/user/singleblock/${'post'}/${id}`;
		}
	}
</script>

{#if ninfo[3] == 'R'}
	<button class="rmain" on:click={clicked}>
		<h1>{ninfo[5]}</h1>
		<h3>seen</h3>
	</button>
{:else}
	<button class="umain" on:click={clicked}>
		<h1>{ninfo[5]}</h1>
		<h3>unread notification</h3>
	</button>
{/if}

<style>
	.umain {
		background-color: white;
		color: black;
	}
	.rmain {
		background-color: black;
		color: white;
	}
	button:hover {
		border: 10px solid rgb(19, 171, 254);
		margin-bottom: 5px;
	}
</style>
