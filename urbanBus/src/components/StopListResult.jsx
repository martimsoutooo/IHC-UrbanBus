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
		const response = await fetch(baseURL + '/api/v1/nextBuses?stop=' + stop);
		const data = await response.json();
		console.log(data);
		setJourneys(data);
	}

	const fetchDataLine = async(l) => {
		const response = await fetch(baseURL + '/api/v1/journeys?line=' + l);
		const data = await response.json();
		console.log(data);
		setJourneys(data)
	}

	useEffect(() => {
		setFirstStop(props.firstStop);
		setLastStop(props.lastStop);
		setLine(props.line);

		console.log(props.line);

		console.log("firstStop", props.firstStop);
		console.log("lastStop", props.lastStop);
		console.log("line", props.line);

		if (props.firstStop && props.lastStop)
			fetchDataFLS(props.firstStop, props.lastStop);
		else if (props.firstStop) {
			fetchDataNextBus(props.firstStop.id);
		} else if (props.line) {
			fetchDataLine(props.line);
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
				{(journeys).map((journey) => {
					if (firstStop && lastStop)
						return (
							<li key={journey.id} onClick={() => { handleClick(journey) }} onMouseDown={() => { handleFocus(journey) }}>
								<a href={"/app/tripTimeline?journey=" + journey.id + "&line=" + journey.line.name}>
									<JourneyCard line={journey.line} startTime={journey.firstSelectedStop.time} delay={journey.delay} endTime={journey.lastSelectedStop.time} departure={journey.firstSelectedStop.name} destination={journey.lastSelectedStop.name} />
								</a>
							</li>
						);
					else if (firstStop)
						return (
							<li key={journey.id} onClick={() => { handleClick(journey) }} onMouseDown={() => { handleFocus(journey) }}>
								<a href={"/app/tripTimeline?journey=" + journey.id + "&line=" + journey.line.name}>
									<JourneyCard line={journey.line} startTime={journey.firstStop.time} delay={journey.delay} endTime={journey.lastStop.time} departure={journey.firstStop.name} destination={journey.lastStop.name} />
								</a>
							</li>
						);
					else if (line)
						return (
							<li key={journey.id} onClick={() => { handleClick(journey) }} onMouseDown={() => { handleFocus(journey) }}>
								<a href={"/app/tripTimeline?journey=" + journey.id + "&line=" + journey.line.name}>
									<JourneyCard line={journey.line} startTime={journey.firstStop.time} delay={journey.delay} endTime={journey.lastStop.time} departure={journey.firstStop.name} destination={journey.lastStop.name} />
								</a>
							</li>
						);
				})}
			</ul>
		</div>
	);
}
