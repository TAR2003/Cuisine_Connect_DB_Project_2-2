<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { getuserinfoid } from '../../functions';
	export let msgid;
	let userid = Cookies.get('userid');
	let messengerinfo = null;
	let info = null;
	let year, month, day, hours, minutes, seconds;
	onMount(async () => {
		console.log(msgid[0][0]);
		info = await getuserinfoid(msgid[0]);
		let jsDate = new Date(await msgid[1]);

		year = jsDate.getFullYear();
		month = jsDate.getMonth() + 1;
		day = jsDate.getDate();
		hours = jsDate.getHours();
		minutes = jsDate.getMinutes();
		seconds = jsDate.getSeconds();
	});
	function gotoprofile() {
		window.location.href = `/user/profile/${msgid[0]}`;
	}
	function gotomessage() {
		window.location.href = `/user/chat/${msgid[0]}`;
	}
</script>

{#if info}
	<button class="mainbutton" on:click={gotomessage}>
		<div class="main">
			<div class="picandname">
				<img src={info[11]} class="pic" alt="" />
				<h2 class="name">{info[2]}</h2>
			</div>
			<div class="second">
				<a on:click={gotoprofile}>
					<p>{info[1]}</p>
				</a>
				<p class="date">Last message: {day}/{month}/{year} at {hours}:{minutes}:{seconds}</p>
			</div>
		</div>
	</button>
{/if}

<style>
	.date {
		text-align: right;
		align-self: right;
		margin-left: 300px;
		font-size: 17px;
	}
	.second {
		display: flex;
		flex-direction: row;
	}
	a {
		color: aqua;
	}
	.name {
		margin-left: 20px;
		font-size: 30px;
	}
	.picandname {
		display: flex;
		flex-direction: rows;
	}
	.pic {
		max-width: 80px;
		max-height: 80px;
		border-radius: 100%;
		align-self: left;
		margin-left: 20px;
	}
	.main {
		width: 700px;
		height: 150px;
		align-items: left;
		text-align: left;
		margin-bottom: 30px;
		margin-left: 10px;
	}
	.mainbutton {
		width: 700px;
		height: 150px;
		align-items: left;
		text-align: left;
		margin-bottom: 30px;
		margin-left: 10px;
		background-color: black;
		color: white;
	}
</style>
