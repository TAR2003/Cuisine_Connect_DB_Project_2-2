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
		getreviewpost,
		deletepost,
		deletecomment,
		todate
	} from '../../functions';
	import { goto } from '$app/navigation';
	import Postupdate from './postupdate.svelte';
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
		await updatecomment();
	}

	let postinfo = null;
	let posterinfo = null;
	let shareoriginal = 1;

	onMount(async () => {
		console.log('this is starting');
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
		let jsDate = todate(postinfo[7]);

		year = jsDate[2];
		month = jsDate[1];
		day = jsDate[0];
		hours = jsDate[3];
		minutes = jsDate[4];
		seconds = jsDate[5];
	});
	async function updatecomment() {
		reacted = await reactsituation(userid, postid);
		//comments = [[]];
		let c2 = await getcomments(postid);
		comments = [[]];
		comments = c2;
		postinfo = await getpostinfo(postid);
		console.log('all comments ' + comments);
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
		window.location.href = `/user/profile/${posterinfo[0]}`;
	}
	function gotorestaurantprofile() {
		window.location.href = `/user/profile/${reviewinfo[0][13]}`;
	}
	function gotomenuprofile() {
		window.location.href = `/user/singleblock/${'menu'}/${reviewinfo[0][0]}`;
	}
	async function gotodelete() {
		await deletepost(postid);
		location.reload();
	}
	async function gotodeletecomment(commentid) {
		await deletecomment(commentid);
		updatecomment();
	}
	async function gotopost() {
		window.location.href = `/user/singleblock/${'post'}/${postid}`;
	}
	let isupdatepostvisible = false;
	function gotoupdatepost() {
		isupdatepostvisible = true;
	}
	async function closeupdatepost() {
		postinfo = await getpostinfo(postid);
		isupdatepostvisible = false;
	}
	function f() {}
</script>

{#if postinfo && posterinfo}
	{#if postinfo[8] == 'S'}
		<div class="mainshare">
			<div class="picandname">
				<img src={posterinfo[11]} class="posterpic" alt="failed image" />
				<div class="superdivclass">
					<p class="personname">{posterinfo[2]}</p>
					<a on:click={gotoprofile}><p class="personusername">{posterinfo[1]}</p></a>
				</div>

				<p class="sharedpost">has shared a post</p>
			</div>
			<div class="rightshift">
				{#if year != null}
					<p class="dateformat">
						Shared on: {day}/{month}/{year} at {hours}:{minutes}:{seconds}
					</p>{/if}
				{#if userid == postinfo[1]}
					<button class="deletepost1" on:click={gotodelete}>Delete Post</button>
				{/if}
			</div>
		</div>
		<Post postid={shareoriginal} />
	{:else}
		<div class="main">
			<div class="topbar">
				<div class="picandname">
					<img src={posterinfo[11]} class="posterpic" alt="failed image" />
					<div class="superdivclass">
						<p class="personname">{posterinfo[2]}</p>
						<a on:click={gotoprofile}><p class="personusername">{posterinfo[1]}</p></a>
					</div>
				</div>

				{#if reviewinfo}
					<h2>
						reviewed the menu <a on:click={gotomenuprofile}>{reviewinfo[0][6]}</a>
					</h2>
					<h2>From the Restaurant</h2>
					<div class="picandname">
						<img src={reviewinfo[0][24]} class="posterpic" alt="failed image" />
						<div class="superdivclass">
							<p class="personname">{reviewinfo[0][15]}</p>
							<a on:click={gotorestaurantprofile}
								><p class="personusername">{reviewinfo[0][14]}</p></a
							>
						</div>
					</div>
				{/if}
				{#if year != null}
					<p class="dateformat">
						Last Updated on: <a on:click={gotopost}
							>{day}/{month}/{year} at {hours}:{minutes}:{seconds}</a
						>
					</p>{/if}
				{#if userid == postinfo[1]}
					<button class="updatepost" on:click={gotoupdatepost}>Edit Post</button>
					<button class="deletepost2" on:click={gotodelete}>Delete Post</button>
				{/if}
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
							{#if userid == c[2]}
								<Comment {userid} caption={c[3]} time={c[4]} />
							{:else}
								<Comment userid={c[2]} caption={c[3]} time={c[4]} />{/if}
							{#if userid == c[2]}
								<button on:click={() => gotodeletecomment(c[0])}>Delete Comment</button>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		</div>
		<Postupdate
			{postid}
			caption={postinfo[6]}
			onCancel={closeupdatepost}
			onConfirm={closeupdatepost}
			visible={isupdatepostvisible}
		/>
	{/if}
{:else}<div class="loading-circle" />
{/if}

<style>
	.updatepost {
		margin-top: 20px;
		margin-left: 0px;
	}
	.rightshift {
		display: flex;
		flex-direction: row;
	}
	.deletepost1 {
		height: 20px;
		align-items: right;
		justify-content: right;
		width: 100px;
		align-self: right;
		margin-top: 30px;
		margin-left: 260px;
	}
	.deletepost2 {
		height: 20px;
		align-items: right;
		justify-content: right;
		width: 100px;
		align-self: right;
		margin-left: 520px;
	}
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
		font-size: 25px;
		justify-content: center;
		margin-top: 27px;
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
		padding-top: 10px;
		padding-bottom: 15px;
		margin-bottom: 0px;
		display: flex;
		flex-direction: column;
		flex: 1;
		background-color: black;
		border-bottom: 3px solid white;
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
		resize: none;
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
		margin-top: 0px;
	}
	.personname {
		font-size: 35px;
		font-family: 'Courier New', Courier, monospace;
		font-weight: 800;
		margin-top: 20px;
		margin-left: 20px;
		margin-bottom: 0px;
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
	a {
		text-decoration: none;
		cursor: pointer;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
