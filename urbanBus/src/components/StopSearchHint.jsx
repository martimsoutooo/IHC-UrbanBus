import React, { useState, useEffect } from 'react';


export default function StopSearchHint({ search }) {
	const [searchTerm, setSearchTerm] = useState(search);

	React.useEffect(() => {
   		setSearchTerm(search)
 	}, [search])

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

	return (
		<ul className="menu w-full p-0 [&_li>*]:rounded-none">
		{(stops).map((stop) => {
			if (stop.name.toLowerCase().includes(searchTerm.toLowerCase())) {
				return (
					<div key={stop.id}>
					<li>
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
