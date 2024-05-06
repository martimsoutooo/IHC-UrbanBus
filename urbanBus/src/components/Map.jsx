import React, { useEffect } from 'react';
import L from 'leaflet';

function Map() {
	const stops = [
		{
			"id": 1,
			"latitude": "-8.641420",
			"location": "R. Cmte. Rocha e Cunha 156, 3800-179 Aveiro",
			"longitude": "40.643450",
			"name": "Esta\u00e7\u00e3o de Aveiro"
		},
		{
			"id": 2,
			"latitude": "-8.645047",
			"location": "Av. Dr. Louren\u00e7o Peixinho 216A, 3800-181 Aveiro",
			"longitude": "40.643250",
			"name": "Av. Dr. Louren\u00e7o Peixinho - CTT B"
		},
		{
			"id": 3,
			"latitude": "-8.653030",
			"location": "R. do Batalh\u00e3o de Ca\u00e7adores 22-26, 3810-064 Aveiro",
			"longitude": "40.640790",
			"name": "Ca\u00e7adores 10 - Miseric\u00f3rdia"
		},
		{
			"id": 4,
			"latitude": "-8.656961",
			"location": "Antiga Reitoria, 3810-193 Aveiro",
			"longitude": "40.634953",
			"name": "Universidade - Antiga Reitoria A"
		},
		{
			"id": 5,
			"latitude": "-8.656840",
			"location": "Antiga Reitoria, 3810-193 Aveiro",
			"longitude": "40.634900",
			"name": "Universidade - Antiga Reitoria B"
		},
		{
			"id": 6,
			"latitude": "-8.659240",
			"location": "Aradas, 3810-193",
			"longitude": "40.623050",
			"name": "Universidade Crasto"
		}
	]
	useEffect(() => {
		const map = L.map('map',{
			attributionControl: false
		}).setView([40.6412, -8.65362], 13);

		// Add a tile layer to the map
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			minZoom: 10,
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
		}).addTo(map);

		// Add markers to the map
		for (let i = 0; i < stops.length; i++) {
			const stop = stops[i];
			L.marker([stop.longitude, stop.latitude]).addTo(map).bindPopup(stop.name);
		}

	}, []);

	return <div id="map" class="h-svh"/>;
}

export default Map;

