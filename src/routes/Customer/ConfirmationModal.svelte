<!-- src/ConfirmationModal.svelte -->
<script>
	export let visible;
	export let message;
	export let onConfirm;
	export let onCancel;

	function confirm() {
		onConfirm();
		close();
	}

	function cancel() {
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
			<p class="msg">{message}</p>
			<button on:click={confirm}>Confirm</button>
			<button on:click={cancel}>Cancel</button>
		</div>
	</div>
{/if}

<style>
	button {
		width: 300px;
		height: 40px;
		font-size: 30px;
	}
	.msg {
		color: black;
		font-size: 40px;
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
