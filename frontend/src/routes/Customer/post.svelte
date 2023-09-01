<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import Comment from './comment.svelte';
	import Post from './post.svelte';
	import {
		addshare,
		getshare,
		addreact,
		removereact,
		reactsituation,
		addcomment,
		getcomments,
		getpostinfo,
		getuserinfoid,
		getreviewpost
	} from '../../functions';
	import { goto } from '$app/navigation';
	export let postid;
	let username = Cookies.get('username');
	let userid = Cookies.get('userid');
	let reacted = false;
	let showcomment = false;
	let comments = [[]];
	let caption = '';
	let reviewinfo = null;

	let year, month, day, hours, minutes, seconds;

	let followstatus = null;
	async function handlepostcomment() {
		console.log(caption + ' got from ');
		if (caption == '') return;
		else {
			await addcomment(userid, postid, caption);
			caption = '';
		}
		updatecomment();
	}

	let postinfo = null;
	let posterinfo = null;
	let shareoriginal = 1;

	onMount(async () => {
		reacted = await reactsituation(userid, postid);
		postinfo = await getpostinfo(postid);
		if (postinfo[8] == 'S') {
			shareoriginal = await getshare(postid);
		}
		if (postinfo[8] == 'R') {
			reviewinfo = await getreviewpost(postid);
		}
		posterinfo = await getuserinfoid(postinfo[1]);
		comments = await getcomments(postid);
		let jsDate = new Date(await postinfo[7]);

		year = jsDate.getFullYear();
		month = jsDate.getMonth() + 1;
		day = jsDate.getDate();
		hours = jsDate.getHours();
		minutes = jsDate.getMinutes();
		seconds = jsDate.getSeconds();
	});
	async function updatecomment() {
		reacted = await reactsituation(userid, postid);
		comments = await getcomments(postid);
		postinfo = await getpostinfo(postid);
	}
	async function handletotalclick() {}
	async function handlereactclick() {
		console.log(postid + 'in the current');
		reacted = await reactsituation(userid, postid);
		if (reacted) {
			reacted = false;
			postinfo[2]--;
			await removereact(userid, postid);
			postinfo = await getpostinfo(postid);
		} else {
			reacted = true;
			postinfo[2]++;
			await addreact(userid, postid);
			postinfo = await getpostinfo(postid);
		}
	}
	function handleshowcommentclick() {
		if (showcomment == true) {
			showcomment = false;
		} else showcomment = true;
		updatecomment();
	}
	function shareclick() {
		addshare(userid, postid);
	}
	function gotoprofile() {
		Cookies.set('userprofile', posterinfo[0]);
		window.location.href = '/Customer/profile';
	}
	function gotorestaurantprofile() {
		Cookies.set('userprofile', reviewinfo[0][13]);
		window.location.href = '/Customer/profile';
	}
	function gotomenuprofile() {
		Cookies.set('menuid', reviewinfo[0][0]);
		Cookies.set('blocktype', 'menu');
		window.location.href = '/Customer/singleblock';
	}
	function f() {}
</script>

{#if postinfo && posterinfo}
	{#if postinfo[8] == 'S'}
		<div class="mainshare">
			<div class="picandname">
				<img src={posterinfo[11]} class="posterpic" alt="failed image" />
				<p class="personname" has shared a post>{posterinfo[2]}</p>
				<p class="sharedpost">has shared a post</p>
			</div>
			<a href="/Customer/profile" on:click={gotoprofile}
				><p class="personusername">{posterinfo[1]}</p></a
			>
		</div>
		<Post postid={shareoriginal} />
	{:else}
		<div class="main">
			<div class="topbar">
				<div class="picandname">
					<img src={posterinfo[11]} class="posterpic" alt="failed image" />
					<p class="personname">{posterinfo[2]}</p>
				</div>

				<a href="/Customer/profile" on:click={gotoprofile}
					><p class="personusername">{posterinfo[1]}</p></a
				>
				{#if reviewinfo}
					<h2>
						reviewed the menu <a href="/Customer/singleblock" on:click={gotomenuprofile}
							>{reviewinfo[0][6]}</a
						>
					</h2>
					<h2>From the Restaurant</h2>
					<div class="picandname">
						<img src={reviewinfo[0][24]} class="posterpic" alt="failed image" />
						<p class="personname">{reviewinfo[0][15]}</p>
					</div>

					<a href="/Customer/profile" on:click={gotorestaurantprofile}
						><p class="personusername">{reviewinfo[0][14]}</p></a
					>
					<p>{reviewinfo[0][3]}</p>
				{/if}
				{#if year != null}
					<p class="dateformat">
						Last Updated on: {day}/{month}/{year} at {hours}:{minutes}:{seconds}
					</p>{/if}
				{#if userid == postinfo[1]} <button>click to edit post</button> {/if}
			</div>

			<div class="captionbar">
				<p class="caption">
					{postinfo[6]}
				</p>
			</div>
			{#if reviewinfo}
				<div class="star-container">
					{#each Array.from({ length: reviewinfo[0][3] }) as _, index}
						<img src="/src/public/images/star.png" alt="Star" class="star" />
					{/each}
					{#each Array.from({ length: 10 - reviewinfo[0][3] }) as _, index}
						<img src="/src/public/images/starblur.png" alt="Star" class="star" />
					{/each}
				</div>{/if}
			{#if postinfo[5] != null}
				<div class="imagebar">
					<img class="postimage" src={postinfo[5]} alt="no image found{postinfo[5]}" />
				</div>{/if}
			<div class="reaction">
				{#if reacted}<button class="reacted" on:click={handlereactclick}>React {postinfo[2]}</button
					>
				{:else}<button class="react" on:click={handlereactclick}>React {postinfo[2]}</button>{/if}
				<button class="comment">Comment {postinfo[3]}</button>
				<button class="share" on:click={shareclick}>Share {postinfo[4]}</button>
			</div>
			<div class="comments">
				<div class="makecomment">
					<textarea class="commenting" placeholder="Enter your comment" bind:value={caption} />
					<button on:click={handlepostcomment} class="postcomment">Post</button>
				</div>
				<div>
					<button class="showcomment" on:click={handleshowcommentclick}>show comments</button>
				</div>

				{#if showcomment == true}<div>
						{#each comments as c}
							<Comment userid={c[2]} caption={c[3]} time={c[4]} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
{:else}<div class="loading-circle" />
{/if}

<style>
	.star-container {
		display: flex;
		align-items: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.star {
		width: 65px;
		height: 65px;
		margin-right: 5px;
	}
	a {
		color: aqua;
	}
	.sharedpost {
		font-size: 20px;
		justify-content: center;
		margin-top: 37px;
		margin-left: 20px;
	}
	.picandname {
		display: flex;
		flex-direction: row;
	}
	.posterpic {
		max-width: 100px;
		height: auto;
		border-radius: 100%;
	}
	.dateformat {
		font-size: 25px;
	}
	.loading-circle {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid #3498db;
		border-radius: 50%;
		animation: spin 2s linear infinite;
		margin: 20px auto;
		margin-bottom: 300px;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.mainshare {
		width: 700px;
		align-self: left;
		text-align: left;
		margin-left: 90px;
		margin-bottom: 0px;
		display: flex;
		flex-direction: column;
		flex: 1;
		background-color: black;
		border-bottom: 1px solid white;
		margin-bottom: 10px;
	}
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
		margin-left: 20px;
		color: aqua;
	}
	.personname {
		font-size: 33px;
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
