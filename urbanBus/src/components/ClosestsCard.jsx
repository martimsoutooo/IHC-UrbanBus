import React from 'react';
import { useState, useEffect } from 'react';
import { _stops } from './consts/stops.js';

export default function ClosestsCard(props) {
    const defaultLatitude = 40.633039;
    const defaultLongitude = -8.659193;

    const [closestStops, setClosestStops] = useState([]);

    useEffect(() => {
        
        const calculateClosestStops = (latitude, longitude) => {
            console.log('Calculating distances from:', latitude, longitude);
            
            // Calculate the distance between the user's location and each stop
            let stops = _stops.map((stop) => {
                const distance = distanceInKmBetweenEarthCoordinates(latitude, longitude, stop.latitude, stop.longitude);
                console.log(`Distance to ${stop.name}(${stop.latitude} ${stop.longitude}): ${distance}`);
                return { ...stop, distance };
            });
    
            // Sort the stops by distance
            stops.sort((a, b) => a.distance - b.distance);
    
            // Get the 3 closest stops
            setClosestStops(stops.slice(0, 5));
        };

        // Get the user's current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                calculateClosestStops(latitude, longitude);
            },
            () => {
                // If geolocation fails, use the default latitude and longitude
                calculateClosestStops(defaultLatitude, defaultLongitude);
            }
        );
    }, [defaultLatitude, defaultLongitude]);


    function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
      
    function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
        var earthRadiusKm = 6371;
        
        var dLat = degreesToRadians(lat2-lat1);
        var dLon = degreesToRadians(lon2-lon1);
        
        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);
        
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadiusKm * c;
    }


    return (
        <div className='flex flex-col gap-3'>
            {closestStops.map((stop) => {
                return (
                    <div key={stop.id} className="card w-full bg-base-100 card-bordered card-compact">
                        
                            <div className="card-body flex flex-row">
                                <div className="basis-3/4 ml-2">
                                    <h2 className="card-title">{stop.name}</h2>
                                    <p>{stop.location}</p>
                                    <p>Distance: {stop.distance.toFixed(2)} km</p>
                                </div>
                                <div className='flex flex-row gap-1 basis-1/4'>
                                    <div className="card-actions">
                                        <a href={'/app/map?lat='+stop.latitude+'&lng='+stop.longitude}>
                                            <button className="btn btn-ghost btn-circle">
                                                <svg className='size-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                    <path fill='#333c4d' d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                                                </svg>
                                            </button>
                                        </a>
                                    </div>

                                    <div className="card-actions">
                                        <a href={"/app?search=" + stop.name}>
                                            <button className="btn btn-ghost btn-circle">
                                                <svg className='size-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill='#333c4d' d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                                                </svg>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                    </div>
                )
            })}
        </div>
    )
}
