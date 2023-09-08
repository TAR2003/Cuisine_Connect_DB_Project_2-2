<script>
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';
	import { findUserType, getAuthentication, getID } from '../../functions';
	import { onDestroy } from 'svelte';

	let savedUsername = '';
	let username = '';
	let password = '';
	let showredborder = false;

	onDestroy(() => {});

	async function onButtonclick() {
		if (username == 'admin' && password == 'admin') {
			Cookies.set('username', 'admin');
			goto('/Admin');
		}
		console.log(username + ' ' + password);
		let v = await getAuthentication(username, password);
		console.log('authentication status ' + v);
		if (v == null) showredborder = true;
		else if (v == 0) showredborder = true;
		else {
			showredborder = false;
			Cookies.set('username', '@' + username);
			let usertype = await findUserType(username);
			Cookies.set('usertype', usertype);
			let id1 = await getID('@' + username);
			Cookies.set('userid', id1);
			goto('/user');
		}
		console.log(v);
	}
</script>

<div class="topbar">
	<div class="leftdiv"><a href="/"><p class="docs">Docs</p></a></div>
	<div class="centerdiv">
		<img
			src="src/public/images/CuisineConnectLOGO.png"
			class="thelogo"
			alt="loading image failed"
		/>
		<p class="titleblock">Where Food Lovers and<br /> Restaurants Connect!</p>
	</div>
	<div class="rightdiv">
		<div class="login">
			<a href="/login"><p class="logintext">Log in</p></a>
		</div>
		<div class="signup">
			<a href="/createaccount"><p class="signuptext">Sign up</p></a>
		</div>
	</div>
</div>

<h1 class="headline">Log in Window</h1>
<div class="username">
	<div class="promptdiv"><p class="usernameprompt">Enter username :</p></div>
	<div class="at"><p>@</p></div>
	<input class="usernamebox" type="text" bind:value={username} />
</div>
<div class="password">
	<div class="promptdiv"><p class="usernameprompt">Enter password :</p></div>
	<div class="at"><p /></div>
	<input class="usernamebox" type="password" bind:value={password} />
</div>
<div class="gap" />
<div class="button">
	<button class="loginbutton" on:click={onButtonclick}><b>Log in</b></button>
</div>

<style>
	.gap {
		height: 100px;
	}
	.button {
		width: 1620px;
		text-align: right;
	}
	.loginbutton {
		width: 200px;
		height: 80px;
		font-size: 50px;
		border-radius: 30px;
		color: white;
		background-color: rgb(56, 56, 62);
		border: 4px solid white;
	}
	.loginbutton:hover {
		color: black;
		background-color: white;
	}

	.at {
		display: inline-block;
		width: 100px;
	}
	.at p {
		font-size: 50px;
		text-align: right;
	}
	.promptdiv {
		width: 600px;
		height: 100px;
		display: inline-block;
		text-align: right;
	}
	.usernamebox {
		display: inline-block;
		height: 60px;
		width: 900px;
		font-size: 50px;
	}
	.username {
		height: 100px;
	}
	.usernameprompt {
		padding-right: 60px;
		font-size: 50px;
	}
	a {
		color: rgb(209, 178, 7);
	}
	.topbar {
		height: 230px;
		background-color: rgba(54, 54, 55, 0.513);
		display: flex;
		flex-direction: column, row;
		flex: 1;
		background-color: 1;
		opacity: 0;
		transform: translateY(20px);
		animation: fadeAndSlide 1s ease-out forwards;
	}
	.thelogo {
		margin: 0%;
		padding-top: 0%;
	}
	.leftdiv {
		width: 300px;
		text-align: center;
		justify-content: center;
	}
	.centerdiv {
		width: 1100px;
		height: 100%;
		align-self: center;
		text-align: center;
		justify-content: center;
		display: flex;
		flex: 1;
		flex-direction: row, column;
	}
	.rightdiv {
		width: 500px;
		text-align: center;
		justify-content: center;
	}
	.titleblock {
		font: bolder;
		font-size: 60px;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		text-align: center;
		padding-top: 40px;
		padding-bottom: 10px;
		margin: 0%;
		color: rgb(209, 178, 7);
	}

	.docs {
		color: rgb(209, 178, 7);
		font-size: 40px;
		padding-top: 40px;
	}
	.login,
	.signup {
		width: 245px;
		height: 100%;
		text-align: center;
		justify-content: center;
		margin: 0px;
		padding: 0%;
		top: 0;
		display: inline-block;
	}
	.signup {
		position: relative;
		right: 0;
	}
	.login {
		left: 0;
	}
	.logintext,
	.signuptext {
		font-size: 50px;
		color: rgb(209, 178, 7);
		padding-top: 20px;
	}
	.headline {
		text-align: center;
		font-size: 80px;
	}

	@keyframes fadeAndSlide {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
