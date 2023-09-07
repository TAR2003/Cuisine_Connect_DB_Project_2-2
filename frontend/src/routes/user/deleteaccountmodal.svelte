<script>
	import Cookies from 'js-cookie';
	import { insertreservation } from '../../functions';
	export let visible;
	export let onConfirm;
	export let onCancel;
	export let rid;
	let username = Cookies.get('username');
	let userid = Cookies.get('userid');

	async function confirm() {
		onConfirm();
		close();
	}
	function cancel() {
		onCancel();
		selectedDate = '';
		close();
	}
	function close() {
		$: visible = false;
	}
</script>

{#if visible}
	<div class="modal-overlay">
		<div class="modal">
			<div>
				<p class="msg">Do you really want to delete your account (this action is irreversible)</p>
			</div>

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
		color: white;
		font-size: 50px;
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
		background-color: rgb(74, 72, 72);
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
