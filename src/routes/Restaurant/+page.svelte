<script>
	import Cookies from 'js-cookie';
	import Post from './post.svelte';
	import { onMount } from 'svelte';

	let allposts = [[]];
	let postids = [];
	onMount(async () => {
		allposts = await getallposts();
		for (let i = 0; i < allposts.length; i++) {
			postids.push(allposts[i][0]);
		}
	});
	async function getallposts() {
		const s = {
			title: 'getallposts'
		};
		try {
			const response = await fetch('http://localhost:3001/api/getallposts', {
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
	let username = Cookies.get('username');
	let userid = Cookies.get('userid');
</script>

{#each allposts as p}
	{#if p[0] != null}
		<Post postid={p[0]} />{/if}
{/each}
