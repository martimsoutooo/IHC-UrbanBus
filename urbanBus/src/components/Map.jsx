import React, { useEffect } from 'react';
import L from 'leaflet';
import { stops } from './consts/stops.js';

function Map() {
	useEffect(() => {
		const map = L.map('map',{
			attributionControl: false,
			zoomControl: false // disable the default zoom control
		}).setView([40.633039, -8.659193], 15);

		// Add a new zoom control in the 'bottomleft' position
		L.control.zoom({
			position: 'bottomleft',
			className: 'custom-zoom-control'
		}).addTo(map);

		// Add a tile layer to the map
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			minZoom: 2,
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
		}).addTo(map);

		// Add markers to the map
		for (let i = 0; i < stops.length; i++) {
			const stop = stops[i];
			L.marker([stop.longitude, stop.latitude]).addTo(map).bindPopup(stop.name + '<div class="flex justify-center"><a href="/app?search=' + stop.name + '"><button class="btn btn-sm btn-neutral text-white mt-3">Go to</button></div>');
		}

            // Try to locate the user's current position
            map.locate({ setView: true, maxZoom: 16 });
				let lat = 40.633039;
				let lng = -8.659193;

				// Add a marker for the current location
				const locationMarker = L.circleMarker([lat, lng], {
						radius: 10,
						color: 'blue',
						fillColor: '#3388ff',
						fillOpacity: 0.5
					}).addTo(map);
				locationMarker.bindPopup("You are here").openPopup();

            // When the location is found, update the marker position
            function onLocationFound(e) {
                const { lat, lng } = e.latlng;
				
				locationMarker.setLatLng([lat, lng]);
			}

		map.on('locationfound', onLocationFound);

		const handleOrientationChange = (event) => {
            const alpha = event.alpha; // Rotation around the z-axis (in degrees)
            const beta = event.beta;   // Rotation around the x-axis (in degrees)
            const gamma = event.gamma; // Rotation around the y-axis (in degrees)

            // Do something with the orientation data
            console.log('Alpha (Z):', alpha);
            console.log('Beta (X):', beta);
            console.log('Gamma (Y):', gamma);
        };

        window.addEventListener('deviceorientation', handleOrientationChange);

	}, []);

	return (
		<div id="map" className="h-svh">
			<style jsx>{`
				.leaflet-bottom .leaflet-control {
					margin-bottom: 110px !important;
					margin-left: 20px !important;
				}

				.leaflet-bar a, .leaflet-bar a:hover {
					background-color: #333c4d;
					border-bottom: 1px solid #ccc;
					display: block;
					color: white;

					width: 40px !important; /* Increase the width */
					height: 40px !important; /* Increase the height */
					line-height: 40px !important; /* Center the '+' and '-' vertically */
				}

				/* When you can't zoom in or out anymore */
				.leaflet-bar a.leaflet-disabled {
					cursor: default;
					background-color: black;
					color: white;
				}

				/* External border radius */
				.leaflet-touch .leaflet-bar {
					-webkit-border-radius: 12px;
							border-radius: 12px;
				}

				/* Internal border radius */
				/* '+' button */
				.leaflet-touch .leaflet-bar a:first-child {
					-webkit-border-top-left-radius: 9px;
							border-top-left-radius: 9px;
					-webkit-border-top-right-radius: 9px;
							border-top-right-radius: 9px;
				}

				/* '-' button */
				.leaflet-touch .leaflet-bar a:last-child {
					-webkit-border-bottom-left-radius: 9px;
							border-bottom-left-radius: 9px;
					-webkit-border-bottom-right-radius: 9px;
							border-bottom-right-radius: 9px;
					border-bottom: none;
				}
			`}</style>
		</div>
	);
}

export default Map;

