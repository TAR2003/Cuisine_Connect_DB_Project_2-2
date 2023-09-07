<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import {
		allrestaurantorders,
		allrestaurantreservations,
		alluserreservations
	} from '../../../functions';
	import Reservationblock from '../reservationblock.svelte';

	let userid = Cookies.get('userid');
	let usertype = Cookies.get('usertype');
	let rlist = null;
	onMount(async () => {
		if (usertype == 'C') rlist = await alluserreservations(userid);
		else if (usertype == 'R') rlist = await allrestaurantreservations(userid);
	});
</script>

{#if rlist}
	<div class="main">
		{#each rlist as r}
			<Reservationblock userprofile={r[4]} time={r[3]} />
		{/each}
	</div>
{/if}
