<script>
	import { onMount } from 'svelte';
	import { deletecomment, getuserinfoid, todate } from '../../functions';
	import Cookies from 'js-cookie';
	export let userid, caption, time;
	let uid = Cookies.get('userid');
	let arr = null;
	let year, month, day, hours, minutes, seconds;
	onMount(async () => {
		arr = await getuserinfoid(userid);
		let jsDate = todate(time);

		year = jsDate[2];
		month = jsDate[1];
		day = jsDate[0];
		hours = jsDate[3];
		minutes = jsDate[4];
		seconds = jsDate[5];
	});

	function gotoprofile() {
		window.location.href = `/user/profile/${userid}`;
	}
</script>

{#if arr}
	<div class="main">
		<div class="picandname">
			<img src={arr[11]} alt="no image" class="pic" />
			<div class="superdivclass">
				<p class="name">{arr[2]}</p>
				<a on:click={gotoprofile} class="uname"><p class="username">{arr[1]}</p></a>
			</div>
		</div>

		{#if year != null}
			<p class="dateformat">
				Last Updated on: {day}/{month}/{year} at {hours}:{minutes}:{seconds}
			</p>{/if}
		<div class="captionclass"><p class="caption">{caption}</p></div>
	</div>
{/if}

<style>
	.dateformat {
		padding-left: 20px;
	}
	.captionclass {
		background-color: black;
		min-height: 40px;
		justify-content: center;
		padding: 1px;
		margin: 0%;
	}
	.pic {
		max-width: 60px;
		max-height: 60px;
		border-radius: 100%;
	}
	.picandname {
		display: flex;
		flex-direction: row;
		padding-left: 15px;
		padding-top: 15px;
	}
	.username {
		color: aqua;
		margin-left: 30px;
		font-size: 20px;
		margin-top: 0px;
	}
	.name {
		font-size: 25px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		margin-left: 30px;
		margin-bottom: 0px;
		margin-top: 0px;
	}
	.caption {
		font-size: 20px;
		font-family: Arial, Helvetica, sans-serif;
		margin-left: 20px;
		margin-top: 10px;
		justify-content: center;
	}
	.main {
		background-color: rgb(47, 47, 47);
		width: 700px;
		border: 1px solid rgb(255, 255, 255);
		margin-bottom: 20px;
		border-radius: 10px;
	}
	a {
		text-decoration: none;
		cursor: pointer;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
