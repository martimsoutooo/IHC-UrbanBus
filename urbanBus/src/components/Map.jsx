import React, { useEffect } from 'react';
import L from 'leaflet';

function Map() {
  	useEffect(() => {
    	const map = L.map('map',{
        	attributionControl: false
    	}).setView([40.6412, -8.65362], 12);

	  	// Add a tile layer to the map
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
				minZoom: 10,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            }).addTo(map);

    
  	}, []);

  	return <div id="map" class="h-svh"/>;
}

export default Map;

