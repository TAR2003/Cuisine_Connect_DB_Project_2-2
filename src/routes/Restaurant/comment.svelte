<script>
	import { onMount } from 'svelte';
	export let userid, caption;
	let arr = [0, 0, 0];
	onMount(async () => {
		arr = await getuserinfoid(userid);
	});
	async function getuserinfoid(u) {
		const s = {
			title: 'getuserinfoid',
			userid: u
		};
		try {
			const response = await fetch('http://localhost:3001/api/username', {
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
</script>

<div class="main">
	<p class="name">name: {arr[2]}</p>
	<p class="username">{arr[1]}</p>
	<p class="caption">{caption}</p>
</div>

<style>
	.username {
		color: aqua;
	}
	.name {
		font-size: 20px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
	.caption {
		font-size: 20px;
		font-family: Arial, Helvetica, sans-serif;
	}
	.main {
		background-color: rgb(47, 47, 47);
		width: 700px;
		border: 1px solid black;
		margin-bottom: 20px;
	}
</style>
