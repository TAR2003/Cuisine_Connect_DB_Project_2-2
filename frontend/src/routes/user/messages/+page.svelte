<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getinbox } from '../../../functions';
	import Msg from '../msg.svelte';

	let userid = Cookies.get('userid');
	let msgids = null;
	onMount(async () => {
		msgids = await getinbox(userid);
		console.log(msgids);
	});
</script>

{#if msgids}
	{#each msgids as m}
		<Msg msgid={m} />
	{/each}
{/if}

<style>
</style>
