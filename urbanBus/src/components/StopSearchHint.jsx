import React, { useState, useEffect } from 'react';
import { stops } from './consts/stops.js';


export default function StopSearchHint(props) {
	const [searchTerm, setSearchTerm] = useState(props.search);

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
						<li onClick={() => {handleClick(stop.name)}} onMouseDown={() => {handleFocus(stop.name)}}>
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
