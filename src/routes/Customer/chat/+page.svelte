<script>
	import Cookies from 'js-cookie';
	import { afterUpdate, onMount } from 'svelte';
	import { getmessages, getuserinfoid, insertmessage } from '../../../functions';

	let userid = Cookies.get('userid');
	let msgid = Cookies.get('msgid');
	let allmessages = [];
	let myinfo = null;
	let msginfo = null;
	let input = '';
	let messageContainer;
	onMount(async () => {
		allmessages = await getmessages(userid, msgid);
		myinfo = await getuserinfoid(userid);
		msginfo = await getuserinfoid(msgid);
		scrollToBottom();
	});
	function scrollToBottom() {
		if (messageContainer) {
			const lastMessage = messageContainer.lastElementChild;
			if (lastMessage) lastMessage.scrollIntoView({ behavior: 'smooth' });
		}
	}
	afterUpdate(() => {
		scrollToBottom();
	});

	async function handleinsertion() {
		if (input == '') return;
		await insertmessage(userid, msgid, input);
		input = '';
		allmessages = await getmessages(userid, msgid);
	}
</script>

{#if allmessages}
	<p>{msgid} is the inbox</p>
	<div class="upper" bind:this={messageContainer}>
		{#each allmessages as a}
			<div class="c">
				{#if a[0] == msgid}
					<div class="sup1">
						{#if msginfo != null}
							<img src={msginfo[11]} alt="" class="pic" />
						{/if}
						<div class="received">
							<p class="msg">{a[2]}</p>
						</div>
					</div>
				{:else}
					<div class="sup2">
						<div class="sent">
							<p class="msg">{a[2]}</p>
						</div>
						{#if myinfo != null}
							<img src={myinfo[11]} alt="" class="pic" />
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
	<div class="text">
		<input type="text" bind:value={input} placeholder="Type your messages here" class="i" />
		<button class="send" on:click={handleinsertion}>click to send</button>
	</div>
{/if}

<style>
	.sup1 {
		display: flex;
		flex-direction: row;
		justify-content: left;
	}
	.sup2 {
		display: flex;
		flex-direction: row;
		justify-content: right;
	}
	.pic {
		border-radius: 100%;
		max-width: 70px;
		max-height: 70px;
	}
	.msg {
		padding-left: 20px;
		padding-right: 20px;
		font-size: 25px;
	}
	.received {
		max-width: 400px;
		background-color: rgb(239, 59, 255);
		color: white;
		text-align: left;
		display: flex;
		flex-direction: row;
		margin-bottom: 30px;
		justify-content: left;
		border-radius: 40px;
	}
	.sent {
		max-width: 400px;
		background-color: rgb(10, 142, 251);
		color: white;
		text-align: right;
		margin-left: 300px;
		display: flex;
		flex-direction: row;
		margin-bottom: 30px;
		justify-content: right;
		border-radius: 40px;
	}
	.send {
		width: 105px;
		height: 50px;
	}
	.i {
		width: 750px;
		height: 50px;
		font-size: 20px;
		align-self: left;
		text-align: left;
		border-radius: 20px;
	}
	.text {
		border: 1px solid blue;
		height: 50px;
		align-items: left;
	}
	.upper {
		border: 1px solid white;
		height: 690px;
		overflow-y: scroll;
	}
</style>
