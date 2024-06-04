import React from 'react';
import { useState, useEffect } from 'react';
import JourneyCard from './JourneyCard.jsx';
import { baseURL } from './consts/config.js';

export default function StopListResult(props) {
	const [firstStop, setFirstStop] = useState(props.firstStop);
	const [lastStop, setLastStop] = useState(props.lastStop);
	const [line, setLine] = useState(props.line);
	const [journeys, setJourneys] = useState([]);
	const [lines, setLines] = useState([]);

	// get data from API
	const fetchDataFLS = async (first, last) => {
		const response = await fetch(baseURL + '/api/v1/journeys?start=' + first + '&end=' + last);
		const data = await response.json();
		console.log('FirstLastStop',data);
		setJourneys(data);
	}

	const fetchDataNextBus = async (stop) => {
		const response = await fetch(baseURL + '/api/v1/nextBuses?stop=' + stop);
		const data = await response.json();
		console.log('NextBuses',data);
		setJourneys(data);
	}

	const fetchDataLines = async () => {
		const response = await fetch(baseURL + '/api/v1/lines');
		const data = await response.json();
		console.log('Lines',data);
		setLines(data);
	}

	const fetchDataJourneyLine = async(l) => {
		const response = await fetch(baseURL + '/api/v1/journeys?line=' + l);
		const data = await response.json();
		console.log('Line',data);
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
			fetchDataLines();
			fetchDataNextBus(props.firstStop.id);
		} else if (props.line) {
			fetchDataJourneyLine(props.line);
		}

	}, [props.firstStop, props.lastStop, props.line]);

	function getLine(id) {
		const thisline = lines.find(l => l.number === id);
		console.log("line", thisline);
		if (!thisline) {
			console.error(`No line found with id ${id}`);
			return;
		}
		return thisline;
	}

	return (
		<div>
			<ul className="w-full p-0">
				{(journeys).map((journey) => {
					if (firstStop && lastStop)
						return (
							<li key={journey.id}>
								<a href={"/app/tripTimeline?journey=" + journey.id + "&line=" + journey.line.name}>
									<JourneyCard line={journey.line} startTime={journey.firstSelectedStop.time} delay={journey.delay} endTime={journey.lastSelectedStop.time} departure={journey.firstSelectedStop.name} destination={journey.lastSelectedStop.name} />
								</a>
							</li>
						);
					else if (firstStop)
						return (
							<li key={journey.id}>
								<a href={"/app/tripTimeline?journey=" + journey.id + "&line=" + "L1"}>
									<JourneyCard line={getLine(journey.line)} startTime={journey.selectedStop.time} delay={journey.selectedStop.delay} endTime={journey.lastStop.time} departure={journey.selectedStop.name} destination={journey.lastStop.name} />
								</a>
							</li>
						);
					else if (line)
						return (
							<li key={journey.id}>
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
