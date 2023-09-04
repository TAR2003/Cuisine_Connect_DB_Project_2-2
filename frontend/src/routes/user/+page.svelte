<script>
	import Cookies from 'js-cookie';
	import Post from './post.svelte';
	import { onMount } from 'svelte';
	import { getallposts } from '../../functions';

	let allposts = [[]];
	let posts = [];
	let start = 0,
		end = 19;
	let showmorebutton = false;
	onMount(async () => {
		allposts = await getallposts();
		for (let i = 0; i < allposts.length; i++) {
			posts[i] = allposts[i][0];
			if (i >= end) {
				showmorebutton = true;
				break;
			}
		}
		//posts[0] = 1;
	});

	let username = Cookies.get('username');
	let userid = Cookies.get('userid');

	function increase() {
		start += 20;
		end += 20;
		for (let i = start; i < end; i++) {
			if (i >= allposts.length) {
				showmorebutton = false;
				break;
			}
			posts[i] = allposts[i][0];
		}
	}
</script>

{#if posts != null}
	{#each posts as p}
		{#if p != null}
			<Post postid={p} />{/if}
	{/each}
{/if}
{#if showmorebutton}
	<button class="showmoreposts" on:click={increase}>click to load more posts</button>
{:else}
	<h1>You're caught up for now</h1>
{/if}

<style>
	.showmoreposts {
		width: 700px;
		height: 40px;
		margin-bottom: 40px;
		background-color: rgb(61, 59, 59);
		color: white;
		font-size: 30px;
	}
	a {
		text-decoration: none;
		cursor: pointer;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
