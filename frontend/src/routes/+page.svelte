<script>
	import Map from './createaccount/Map.svelte';
	import Imgblock from './imgblock.svelte';
	//import imgfile from '$lib/images/image1.jpg';
	//import { Cookies } from '@sveltejs/kit';
	import imgblock from './imgblock.svelte';
	import Cookies from 'js-cookie';

	let imgfiles = '/src/public/images/image';
	let imgs = [];
	for (let i = 1; i < 5; i++) {
		let temp = {
			picpath: imgfiles + i + '.jpg',
			para: 'Connect With all kind of restaurants and form friendships'
		};
		imgs[i - 1] = temp;
	}
	let a = 2;
	let scrollPosition = 0;

	function handleScroll(event) {
		scrollPosition = event.target.scrollTop;
	}
</script>

<div class="topbar">
	<div class="leftdiv"><a href="/"><p class="docs">Docs</p></a></div>
	<div class="centerdiv">
		<img
			src="/src/public/images/CuisineConnectLOGO.png"
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
<div class="container" style="transform: translateY({scrollPosition}px);">
	{#each imgs as ig}
		<Imgblock picpath={ig.picpath} para={ig.para} />
	{/each}
</div>

<style>
	:global(body) {
		color: white;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}
	.container {
		overflow-y: scroll;
		height: 700px;
		flex: 1;
	}
	a {
		color: rgb(209, 178, 7);
	}

	.topbar {
		height: 230px;
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
	.test {
		text-align: center;
		justify-content: center;
		font-size: 60px;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
	}
	.gap {
		height: 70px;
		background-color: antiquewhite;
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

	@keyframes fadeAndSlide {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
