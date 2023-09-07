<script>
	import jsCookie from 'js-cookie';
	import { onMount } from 'svelte';
	import { getallnotification } from '../../../functions';
	import Notificationblock from '../notificationblock.svelte';

	let userid = jsCookie.get('userid');
	let nlist = null;
	onMount(async () => {
		nlist = await getallnotification(userid);
	});
</script>

{#if nlist}
	<div class="main">
		{#each nlist as n}
			<Notificationblock ninfo={n} />
		{/each}
	</div>
{/if}

<style>
	.main {
		display: flex;
		flex-direction: column;
	}
</style>
