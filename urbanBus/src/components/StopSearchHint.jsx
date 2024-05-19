import React, { useState, useEffect } from 'react';
import { _stops } from './consts/stops.js';
import { baseURL } from './consts/config.js';


export default function StopSearchHint(props) {
	const [searchTerm, setSearchTerm] = useState(props.search);

	const [stops, setStops] = useState(_stops);

	React.useEffect(() => {
		// get data from API
		const fetchData = async () => {
			const response = await fetch(baseURL + '/api/v1/stops');
			const data = await response.json();
			setStops(data);
		}

		fetchData();
	}, []);

	React.useEffect(() => {
   		setSearchTerm(props.search)
 	}, [props.search])

	const handleClick = (stop) => {
		// emit event to parent
		console.log("Handle " + stop);
		props.onChange(stop);
	}

	const handleFocus = (stop) => {
		console.log("Focus " + stop)
		props.onFocus(stop)
	}

	return (
		<ul className="menu w-full p-0 [&_li>*]:rounded-none">
		{(stops).map((stop) => {
			if (stop.name.toLowerCase().includes(searchTerm.toLowerCase())) {
				return (
					<div key={stop.id}>
						<li onClick={() => {handleClick(stop)}} onMouseDown={() => {handleFocus(stop)}}>
							<a>{stop.name}</a>
						</li>
						<div className="divider h-0.5 my-0"></div>
					</div>
					);
				}
			})}
		</ul>
		)
}
