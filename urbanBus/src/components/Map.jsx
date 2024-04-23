import React, { useEffect } from 'react';
import L from 'leaflet';

function Map() {
  useEffect(() => {
    const map = L.map('map',{
        attributionControl: false
    }).setView([40.6412, -8.65362], 12);

    
  }, []);

  return <div id="map" class="h-svh"/>;
}

export default Map;

