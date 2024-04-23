import React, { useState, useEffect } from 'react';


export default function StopSearchHint(props) {
	const [searchTerm, setSearchTerm] = useState(props.search);

	React.useEffect(() => {
   		setSearchTerm(props.search)
 	}, [props.search])

	const stops = [
		{name: 'Plaza de la Revolución', id: 1},
		{name: 'Calle 23', id: 2},
		{name: 'Calle 26', id: 3},
		{name: 'Calle 100', id: 4},
		{name: 'Calle 142', id: 5},
		{name: 'Calle 170', id: 6},
		{name: 'Calle 190', id: 7},
		{name: 'Calle 200', id: 8},
		{name: 'Calle 222', id: 9},
		{name: 'Calle 250', id: 10},
		{name: 'Calle 272', id: 11},
		{name: 'Calle 300', id: 12},
		{name: 'Calle 330', id: 13},
		{name: 'Calle 350', id: 14},
		{name: 'Calle 400', id: 15},
		]

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
