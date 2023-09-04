<script>
	import { onMount } from 'svelte';
	import { getuserinfoid } from '../../functions';
	import Cookies from 'js-cookie';
	export let userid, caption, time;
	let arr = null;
	let year, month, day, hours, minutes, seconds;
	onMount(async () => {
		arr = await getuserinfoid(userid);
		let jsDate = new Date(await time);

		year = jsDate.getFullYear();
		month = jsDate.getMonth() + 1;
		day = jsDate.getDate();
		hours = jsDate.getHours();
		minutes = jsDate.getMinutes();
		seconds = jsDate.getSeconds();
	});

	function gotoprofile() {
		window.location.href = `/user/profile/${userid}`;
	}
</script>

{#if arr}
	<div class="main">
		<div class="picandname">
			<img src={arr[11]} alt="no image" class="pic" />
			<p class="name">{arr[2]}</p>
		</div>

		<a on:click={gotoprofile}><p class="username">{arr[1]}</p></a>
		{#if year != null}
			<p class="dateformat">
				Last Updated on: {day}/{month}/{year} at {hours}:{minutes}:{seconds}
			</p>{/if}
		<div class="captionclass"><p class="caption">{caption}</p></div>
	</div>
{/if}

<style>
	.captionclass {
		background-color: black;
		min-height: 40px;
		justify-content: center;
	}
	.pic {
		max-width: 60px;
		max-height: 60px;
		border-radius: 100%;
	}
	.picandname {
		display: flex;
		flex-direction: row;
	}
	.username {
		color: aqua;
		margin-left: 30px;
		font-size: 20px;
	}
	.name {
		font-size: 20px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		margin-left: 20px;
	}
	.caption {
		font-size: 20px;
		font-family: Arial, Helvetica, sans-serif;
		margin-left: 30px;
		margin-top: 30px;
		justify-content: center;
	}
	.main {
		background-color: rgb(47, 47, 47);
		width: 700px;
		border: 1px solid rgb(255, 255, 255);
		margin-bottom: 20px;
		border-radius: 10px;
	}
</style>
