<!-- src/ConfirmationModal.svelte -->
<script>
	import Cookies from 'js-cookie';
	export let visible;
	export let message;
	export let onConfirm;
	export let onCancel;
	let username = Cookies.get('username');
	let userid = Cookies.get('userid');
	let postpicture = null;
	let caption = '';

	async function uploadwithphoto() {
		const formData = new FormData();
		formData.append('userid', userid);
		formData.append('caption', caption);
		formData.append('postphoto', postpicture);

		try {
			const response = await fetch('http://localhost:3001/addpostwithpicture', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				console.log('Data uploaded successfully');
			} else {
				console.error('Data upload failed');
			}
		} catch (error) {
			console.error('Error uploading data:', error);
		}
	}
	async function uploadwithoutphoto() {
		const s = {
			userid: userid,
			caption: caption
		};
		try {
			const response = await fetch('http://localhost:3001/api/addpostwithoutmedia', {
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
		console.log(caption + ' it is the caption');
		if (postpicture == null && caption == '') return false;
		else {
			if (postpicture == null) uploadwithoutphoto();
			else uploadwithphoto();
			return true;
		}
	}
	function confirm() {
		if (canupload()) {
			onConfirm();
			caption = '';
			close();
		}
	}

	function cancel() {
		onCancel();
		caption = '';
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
				<textarea
					class="caption"
					placeholder="Write the caption for your post"
					bind:value={caption}
				/>
			</div>
			<div class="picture">
				<p class="prompt">enter a picture if you want</p>
				<input class="pic" type="file" on:change={(e) => (postpicture = e.target.files[0])} />
			</div>

			<button on:click={confirm}>Post</button>
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
	.pic {
		width: 300px;
		height: 100px;
	}
	.caption {
		width: 700px;
		height: 300px;
		border-radius: 50px;
		padding: 20px;
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
