<script>
	import Cookies from 'js-cookie';
	import { insertreservation } from '../../functions';
	export let visible;
	export let onConfirm;
	export let onCancel;
	export let rid;
	let username = Cookies.get('username');
	let userid = Cookies.get('userid');
	let postpicture = null;
	let caption = '';

	async function canupload() {
		if (selectedDate == '') return false;
		else {
			console.log(selectedDate + ' =is the date');
			await insertreservation(userid, rid, selectedDate);
			return true;
		}
	}
	async function confirm() {
		if (await canupload()) {
			onConfirm();
			caption = '';
			close();
		}
	}

	function cancel() {
		onCancel();
		selectedDate = '';
		close();
	}

	function close() {
		$: visible = false;
	}
	let selectedDate = '';

	// Function to get the current date in YYYY-MM-DD format
	function getCurrentDate() {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
		const day = String(today.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	// Set the minDate variable to the current date
	let minDate = getCurrentDate();
</script>

{#if visible}
	<div class="modal-overlay">
		<div class="modal">
			<div><p class="msg">Click cancel option to close the window</p></div>
			<div class="picture">
				<p class="prompt">enter the date</p>
				<input
					type="date"
					id="dateInput"
					bind:value={selectedDate}
					min={minDate}
					class="inputfile"
				/>
			</div>
			<button on:click={confirm}>Confirm</button>
			<button on:click={cancel}>Cancel</button>
		</div>
	</div>
{/if}

<style>
	.prompt {
		font-size: 30px;
		margin: 0%;
	}
	.picture {
		margin-bottom: 20px;
		height: 50px;
	}
	.inputfile {
		width: 200px;
		height: 30px;
		font-size: 20px;
	}

	button {
		width: 300px;
		height: 40px;
		font-size: 30px;
	}
	.msg {
		color: white;
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
		background-color: rgb(74, 72, 72);
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
