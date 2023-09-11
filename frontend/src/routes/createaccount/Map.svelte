<script>
	export let coordinates = null;
	let address = '';
	let suggestions = [];
	let isLoading = false;

	async function fetchCoordinates() {
		isLoading = true;
		console.log('searching ' + address);
		if (address.trim() === '') {
			isLoading = false;
			coordinates = null;
			suggestions = [];
			return;
		}
		if (address === '') {
			isLoading = false;
			coordinates = null;
			suggestions = [];
			return;
		}

		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
					address
				)}&format=json&limit=5` // Adjust the limit as needed
			);
			const data = await response.json();

			suggestions = data.map((item) => ({
				name: item.display_name,
				coordinates: {
					lat: parseFloat(item.lat),
					lon: parseFloat(item.lon)
				}
			}));

			if (data.length > 0) {
				coordinates = {
					lat: parseFloat(data[0].lat),
					lon: parseFloat(data[0].lon)
				};
			} else {
				coordinates = null;
			}
			isLoading = false;
		} catch (error) {
			console.error('Error fetching coordinates:', error);
			coordinates = null;
			isLoading = false;
		}
	}

	function selectSuggestion(suggestion) {
		address = suggestion.name;
		coordinates = suggestion.coordinates;
		suggestions = [];
	}
</script>

<div>
	<h1>Enter you address(Please select a valid one)</h1>
	<input
		type="text"
		bind:value={address}
		on:input={fetchCoordinates}
		placeholder="Enter an address"
	/>
	{#if isLoading}
		<div class="loading-circle" />
	{:else if suggestions.length > 0}
		<ul>
			{#each suggestions as suggestion (suggestion.coordinates)}
				<li>
					<button on:click={() => selectSuggestion(suggestion)}>
						{suggestion.name}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	button {
		width: 800px;
		font-size: 15px;
		text-align: left;
		padding-top: 10px;
		padding-bottom: 5px;
	}

	ul {
		height: 200px;
		width: 800px;
		overflow-y: scroll;
	}
	input {
		width: 600px;
		height: 25px;
		font-size: 20px;
	}
</style>
