<script>
	import { onMount, afterUpdate, createEventDispatcher } from 'svelte';
	import { parse } from 'svelte/compiler';

	let mapContainer;
	let map;
	let selectedCoordinates = { lat: 23.8103, lng: 90.4125 }; // Default coordinates

	const dispatch = createEventDispatcher();

	onMount(() => {
		initializeMap();
	});

	afterUpdate(() => {
		const value = parseFloat(selectedCoordinates.lng);
		const v2 = parseFloat(selectedCoordinates.lat);
		if (value == null || v2 == null) return;

		if (map) {
			map.setView([selectedCoordinates.lat, selectedCoordinates.lng], 13);
		}
		dispatch('coordinatesChanged', selectedCoordinates);
	});

	function initializeMap() {
		map = L.map(mapContainer).setView([selectedCoordinates.lat, selectedCoordinates.lng], 13);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		map.on('click', (event) => {
			selectedCoordinates = event.latlng;
			dispatch('coordinatesChanged', selectedCoordinates); // Emit the custom event
		});
	}
</script>

<div class="total">
	<div id="mapContainer" bind:this={mapContainer} />
	<div class="info">
		{#if selectedCoordinates}
			<p class="p1">Selected Coordinates: {selectedCoordinates.lat}, {selectedCoordinates.lng}</p>
		{/if}
		<input class="i1" type="text" bind:value={selectedCoordinates.lat} />
		<input class="i2" type="text" bind:value={selectedCoordinates.lng} />
	</div>
</div>

<style>
	#mapContainer {
		height: 300px;
		width: 900px;
		text-align: right;
		margin: 0%;
		display: inline-block;
	}
	.info {
		display: inline-block;
		text-align: center;
		justify-content: center;
	}
	.total {
		display: flex;
		flex: 1;
	}
	.p1 {
		text-align: center;
		margin-top: 20px;
		margin-left: 50px;
		font-size: 40px;
	}
	.i1 {
		text-align: center;
		margin-left: 0px;
		margin-top: 10px;
		height: 30px;
		width: 230px;
	}
	.i2 {
		text-align: center;
		margin-top: 10px;
		height: 30px;
		width: 230px;
	}
</style>
