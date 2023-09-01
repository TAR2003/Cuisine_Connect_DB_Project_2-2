<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import Comment from './comment.svelte';
	export let postid;
	let username = Cookies.get('username');
	let userid = Cookies.get('userid');
	let reacted = false;
	let showcomment = false;
	let comments = [[]];
	let caption = '';
	async function handlepostcomment() {
		if (caption == '') return;
		else {
			await addcomment();
			caption = '';
		}
		updatecomment();
	}
	async function addcomment() {
		const s = {
			postid: postid,
			userid: userid,
			caption: caption
		};
		try {
			const response = await fetch('http://localhost:3001/api/addcomment', {
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

	async function getcomments(postid) {
		const s = {
			postid: postid
		};
		try {
			const response = await fetch('http://localhost:3001/api/getcomment', {
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

	async function getpostinfo() {
		postinfo = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		const s = {
			title: 'getpostinfo',
			postid: postid
		};
		try {
			const response = await fetch('http://localhost:3001/api/postinfo', {
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
	async function getuserinfoid(u) {
		posterinfo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
	let postinfo = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	let posterinfo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	onMount(async () => {
		postinfo = await getpostinfo();
		posterinfo = await getuserinfoid(postinfo[1]);
		comments = await getcomments(postid);
		console.log('onmount calls');
	});
	async function updatecomment() {
		comments = await getcomments(postid);
		postinfo = await getpostinfo();
	}
	async function handletotalclick() {}
	function handlereactclick() {
		if (reacted) reacted = false;
		else reacted = true;
	}
	function handleshowcommentclick() {
		if (showcomment == true) {
			showcomment = false;
		} else showcomment = true;
		updatecomment();
	}
	function f() {}
</script>

<div class="main">
	<div class="topbar">
		<p class="personname">{posterinfo[2]}</p>
		<p class="personusername">{posterinfo[1]}</p>
		<p>Last Updated on: {postinfo[7]}</p>
		{#if userid == postinfo[1]} <button>click to edit post</button> {/if}
	</div>
	<div class="captionbar">
		<p class="caption">
			{postinfo[6]}
		</p>
	</div>
	{#if postinfo[5] != null}
		<div class="imagebar">
			<img class="postimage" src={postinfo[5]} alt="no image found{postinfo[5]}" />
		</div>{/if}
	<div class="reaction">
		{#if reacted}<button class="reacted" on:click={handlereactclick}>React {postinfo[2]}</button>
		{:else}<button class="react" on:click={handlereactclick}>React {postinfo[2]}</button>{/if}
		<button class="comment">Comment {postinfo[3]}</button>
		<button class="share">Share {postinfo[4]}</button>
	</div>
	<div class="comments">
		<div class="makecomment">
			<textarea class="commenting" placeholder="Enter your comment" bind:value={caption} />
			<button on:click={handlepostcomment} class="postcomment">Post</button>
		</div>
		<div><button class="showcomment" on:click={handleshowcommentclick}>show comments</button></div>

		{#if showcomment == true}<div>
				{#each comments as c}
					<Comment userid={c[2]} caption={c[3]} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.showcomment {
		width: 700px;
		height: 30px;
	}
	.makecomment {
		display: flex;
	}
	.postcomment {
		display: flex;
		flex-direction: row;
		width: 110px;
		height: 55px;
		text-align: center;
		font-size: 30px;
		justify-content: center;
		padding-top: 10px;
	}
	.commenting {
		width: 580px;
		height: 50px;
		background-color: rgb(58, 57, 57);
		color: white;
		font-size: 30px;
		display: flex;
		flex-direction: row;
	}
	.comments {
		width: 700px;
		display: flex;
		flex-direction: column;
	}
	.reacted {
		width: 234px;
		height: 60px;
		margin: 0%;
		background-color: rgb(8, 75, 246);
		color: white;
		font-size: 20px;
		border: 0px solid black;
	}
	.reacted:hover {
		width: 234px;
		height: 60px;
		margin: 0%;
		background-color: rgb(255, 230, 8);
		color: black;
		font-size: 20px;
		border: 2px solid white;
	}
	.react,
	.comment,
	.share {
		width: 234px;
		height: 60px;
		margin: 0%;
		background-color: rgb(74, 72, 72);
		color: white;
		font-size: 20px;
	}
	.react:hover,
	.comment:hover,
	.share:hover {
		width: 234px;
		height: 60px;
		margin: 0%;
		background-color: rgb(255, 230, 8);
		color: black;
		font-size: 20px;
	}
	.reaction {
		display: flex;
	}
	.imagebar {
		width: 700px;
		align-items: center;
		text-align: center;
	}
	.postimage {
		max-width: 700px;
		align-items: center;
		text-align: center;
	}
	.captionbar {
		display: flex;
		flex-direction: column;
		background-color: rgb(81, 83, 83);
	}
	.caption {
		font-size: 22px;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
	}
	.personusername {
		font-family: Arial, Helvetica, sans-serif;
		margin-left: 10px;
		color: aqua;
	}
	.personname {
		font-size: 25px;
		font-family: 'Courier New', Courier, monospace;
		font-weight: 800;
		margin-top: 30px;
		margin-left: 10px;
	}
	.main {
		width: 700px;
		align-self: center;
		text-align: left;
		margin-left: 90px;
		margin-bottom: 60px;
		display: flex;
		flex-direction: column;
		background-color: black;
		border-radius: 30px;
	}
	.topbar {
		color: white;
	}
</style>
