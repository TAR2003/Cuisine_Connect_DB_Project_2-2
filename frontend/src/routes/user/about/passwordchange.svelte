<!-- src/ConfirmationModal.svelte -->
<script>
	import jsCookie from 'js-cookie';
	import { getAuthentication, updatepassword } from '../../../functions';
	import { onMount } from 'svelte';

	export let visible;
	export let onConfirm;
	export let onCancel;
	let userid = jsCookie.get('userid');
	let username = jsCookie.get('username');
	let curpass = '';
	let newpass = '';
	let newpass2 = '';
	let alerting = false;
	onMount(() => {});

	async function confirm() {
		let authentication = await getAuthentication(username.slice(1), curpass);

		console.log('the ans ' + authentication);
		if (newpass == newpass2 && authentication == 1) {
			await updatepassword(userid, newpass);
			newpass = '';
			newpass2 = '';
			curpass = '';
			alerting = false;
			onConfirm();
			close();
		} else alerting = true;
	}

	async function cancel() {
		newpass = '';
		newpass2 = '';
		curpass = '';
		alerting = false;
		onCancel();
		close();
	}

	function close() {
		$: visible = false;
	}
</script>

{#if visible}
	<div class="modal-overlay">
		<div class="modal">
			<input type="password" placeholder="Enter your current password" bind:value={curpass} />
			<input type="password" placeholder="Enter your new password" bind:value={newpass} />
			<input type="password" placeholder="Enter your new password" bind:value={newpass2} />
			{#if alerting}
				<h3>Something is wrong, your password is not updated till now</h3>
			{/if}
			<div class="b">
				<button on:click={confirm}>Confirm</button>
				<button on:click={cancel}>Cancel</button>
			</div>
		</div>
	</div>
{/if}

<style>
	h3 {
		color: red;
	}
	input {
		margin-bottom: 30px;
		height: 40px;
		font-size: 30px;
	}
	.b {
		display: flex;
		flex-direction: row;
	}
	button {
		width: 300px;
		height: 40px;
		font-size: 30px;
		border-radius: 10%;
		margin: 30px;
	}
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.modal {
		background-color: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
	}
</style>
