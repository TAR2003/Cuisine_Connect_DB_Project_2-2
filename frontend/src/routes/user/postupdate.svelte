<!-- src/ConfirmationModal.svelte -->
<script>
	import { updatepost } from '../../functions';

	export let visible;
	export let caption;
	export let postid;
	export let onConfirm;
	export let onCancel;
	let c = caption;
	async function confirm() {
		if (c != '') {
			if (c != caption) {
				await updatepost(postid, c);
			}
			onConfirm();
			close();
		}
	}

	function cancel() {
		c = caption;
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
			<div class="maincontainer">
				<div class="upper">
					<textarea class="input" bind:value={c} />
				</div>
				<div class="lower">
					<button on:click={confirm}>Confirm</button>
					<button on:click={cancel}>Cancel</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.maincontainer {
		display: flex;
		flex-direction: column;
	}
	.lower {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.input {
		height: 500px;
		width: 800px;
		font-size: 25px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
	button {
		width: 300px;
		height: 40px;
		font-size: 30px;
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
	}

	.modal {
		background-color: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
