<script>
	import Cookies from 'js-cookie';
	export let visible;
	export let message;
	export let onConfirm;
	export let onCancel;
	let username = Cookies.get('username');
	let userid = Cookies.get('userid');

	let menuname = '';
	let price = 0;

	export async function addmenu(userid1, menuname, price) {
		console.log('called addmenu');
		const s = {
			userid1: userid1,
			menuname: menuname,
			price: price
		};
		try {
			const response = await fetch('http://localhost:3001/api/addmenu', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(s)
			});

			if (response.ok) {
				const data = await response.json();
				return data;
			}
		} catch (error) {
			console.error('Error :', error);
		}
	}

	function canupload() {
		if (menuname == '' || price == 0) return false;
		else {
			addmenu(userid, menuname, price);
			return true;
		}
	}
	function confirm() {
		if (canupload()) {
			onConfirm();
			menuname = '';
			price = 0;
			close();
		}
	}

	function cancel() {
		onCancel();
		menuname = '';
		price = 0;
		close();
	}

	function close() {
		$: visible = false;
	}
</script>

{#if visible}
	<div class="modal-overlay">
		<div class="modal">
			<div><p class="msg">Click cancel option to close the window</p></div>
			<div>
				<p class="prompt">Enter the Name of the Menu:</p>
				<input class="name" type="text" placeholder="Name of the Menu" bind:value={menuname} />
			</div>
			<div>
				<p class="prompt">Enter the Price:</p>
				<input class="dam" type="number" bind:value={price} />
			</div>

			<button on:click={confirm}>Add menu</button>
			<button on:click={cancel}>Cancel</button>
		</div>
	</div>
{/if}

<style>
	.dam {
		width: 400px;
		height: 40px;
		align-items: center;
		margin-bottom: 40px;
		font-size: 30px;
	}
	.prompt {
		font-size: 40px;
		margin: 1%;
	}
	.name {
		width: 800px;
		height: 50px;
		margin-bottom: 40px;
		font-size: 40px;
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
