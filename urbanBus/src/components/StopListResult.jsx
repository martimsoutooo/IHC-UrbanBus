import React from 'react';
import { useState, useEffect } from 'react';
import JourneyCard from './JourneyCard.jsx';
import { baseURL } from './consts/config.js';

export default function StopListResult(props) {
	const [firstStop, setFirstStop] = useState(props.firstStop);
	const [lastStop, setLastStop] = useState(props.lastStop);
	const [line, setLine] = useState(props.line);

	const [journeys, setJourneys] = useState([]);

	// get data from API
	const fetchDataFLS = async (first, last) => {
		const response = await fetch(baseURL + '/api/v1/journeys?start=' + first + '&end=' + last);
		const data = await response.json();
		console.log(data);
		setJourneys(data);
	}

	const fetchDataNextBus = async (stop) => {
		const response = await fetch(baseURL + '/api/v1/nextBuses?stop='+stop);
		const data = await response.json();
		console.log(data);
		setJourneys(data);
	}

	useEffect(() => {
		setFirstStop(props.firstStop);
		setLastStop(props.lastStop);
		setLine(props.line);

		if (props.firstStop && props.lastStop)
			fetchDataFLS(props.firstStop, props.lastStop);
		else if (props.firstStop) {
			fetchDataNextBus(props.firstStop.id);
		}

	}, [props.firstStop, props.lastStop, props.line]);



	const handleClick = (stop) => {
		props.onChange(stop);
	}

	const handleFocus = (stop) => {
		props.onFocus(stop);
	}

	return (
		<div>

			<ul className="w-full p-0">
				{(journeys).sort((a, b) => {
					return a.startTime > b.startTime ? 1 : -1;
				}).map((journey) => {
					return (
						<li key={journey.id} onClick={() => { handleClick(journey) }} onMouseDown={() => { handleFocus(journey) }}>
							<JourneyCard line={journey.line.designation} startTime={journey.firstSelectedStop.time} delay={journey.delay} endTime={journey.lastSelectedStop.time} departure={journey.firstSelectedStop.name} destination={journey.lastSelectedStop.name} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}
