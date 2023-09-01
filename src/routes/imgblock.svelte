<script>
	export let picpath;
	export let para;
	import { onMount } from 'svelte';
	let isVisible = false;

	let animationContainer;
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					isVisible = true;
				}
			});
		});

		observer.observe(animationContainer);
	});
</script>

<div class="imgcontainer" bind:this={animationContainer}>
	{#if isVisible}
		<div class="left">
			<img src={picpath} alt="janina" class="pic" />
		</div>
	{/if}
	<div class="right">
		<p class="para">
			{para}
		</p>
	</div>
</div>

<style>
	.imgcontainer {
		display: flex;
		flex: 1;
		flex-direction: row, column;
		overflow: hidden;
	}
	.imgcontainer img {
		width: 100%;
		object-fit: contain;
		border-radius: 100px;
	}
	.pic {
		max-width: 100%;
		height: auto;
	}
	.para {
		font-size: 80px;
		font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
		font-weight: 100;
		color: aliceblue;
		align-self: center;
		text-align: center;
	}

	.left,
	.right {
		width: 600;
		height: 600;
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transform: translateY(20px);
		animation: fadeAndSlide 2s ease-out forwards;
	}

	@keyframes fadeAndSlide {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
