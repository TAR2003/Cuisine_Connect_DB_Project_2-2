<script>
	import './global.css';
</script>

<svelte:head>
	<title>CuisineConnect</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container">
	<slot />
</div>

<style>
	:global(body) {
		background-color: rgb(50, 50, 58);
		color: white;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}
	.container {
		height: 934px;
		width: 1900px;
		border: 1px solid red;
		flex: 1;
	}
	a {
		text-decoration: none;
		cursor: pointer;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
