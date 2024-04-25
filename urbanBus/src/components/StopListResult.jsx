import React from 'react';
import { useState, useEffect } from 'react';
import JourneyCard from './JourneyCard.jsx';

export default function StopListResult(props) {
	const [firstStop, setFirstStop] = useState(props.firstStop);
	const [lastStop, setLastStop] = useState(props.lastStop);
	const [line, setLine] = useState(props.line);

	useEffect(() => {
		setFirstStop(props.firstStop);
		setLastStop(props.lastStop);
		setLine(props.line);
	}, [props.firstStop, props.lastStop, props.line]);

	const journeys = [
		{line: 'L1', startTime: '06:00', endTime: '06:40'},
		{line: 'L1', startTime: '06:20', endTime: '07:00'},
		{line: 'L1', startTime: '06:40', endTime: '07:20'},
		{line: 'L1', startTime: '07:00', endTime: '07:40'},
		{line: 'L1', startTime: '07:20', endTime: '08:00'},
		{line: 'L1', startTime: '07:40', endTime: '08:20'},
		{line: 'L1', startTime: '08:00', endTime: '08:40'},
		{line: 'L1', startTime: '08:20', endTime: '09:00'},
		{line: 'L1', startTime: '08:40', endTime: '09:20'},
		{line: 'L1', startTime: '09:00', endTime: '09:40'},
		{line: 'L1', startTime: '09:20', endTime: '10:00'},
		{line: 'L1', startTime: '09:40', endTime: '10:20'},
		{line: 'L1', startTime: '10:00', endTime: '10:40'},
		{line: 'L1', startTime: '10:20', endTime: '11:00'},
		{line: 'L1', startTime: '10:40', endTime: '11:20'},
		{line: 'L1', startTime: '11:00', endTime: '11:40'},
		{line: 'L1', startTime: '11:20', endTime: '12:00'},
		{line: 'L1', startTime: '11:40', endTime: '12:20'},
		{line: 'L1', startTime: '12:00', endTime: '12:40'},
		{line: 'L1', startTime: '12:20', endTime: '13:00'},
		{line: 'L1', startTime: '12:40', endTime: '13:20'},
		{line: 'L1', startTime: '13:00', endTime: '13:40'},
		{line: 'L1', startTime: '13:20', endTime: '14:00'},
		{line: 'L1', startTime: '13:40', endTime: '14:20'},
		{line: 'L1', startTime: '14:00', endTime: '14:40'},
		{line: 'L1', startTime: '14:20', endTime: '15:00'},
		{line: 'L1', startTime: '14:40', endTime: '15:20'},
		{line: 'L1', startTime: '15:00', endTime: '15:40'},
		{line: 'L1', startTime: '15:20', endTime: '16:00'},
		{line: 'L1', startTime: '15:40', endTime: '16:20'},
		{line: 'L1', startTime: '16:00', endTime: '16:40'},
		{line: 'L1', startTime: '16:20', endTime: '17:00'},
		{line: 'L1', startTime: '16:40', endTime: '17:20'},
		{line: 'L1', startTime: '17:00', endTime: '17:40'},
		{line: 'L1', startTime: '17:20', endTime: '18:00'},
		{line: 'L1', startTime: '17:40', endTime: '18:00'},
		{line: 'L1', startTime: '18:00', endTime: '18:20'},
		{line: 'L1', startTime: '18:30', endTime: '18:50'},
		{line: 'L1', startTime: '19:00', endTime: '19:20'},
		{line: 'L1', startTime: '19:30', endTime: '19:50'},
		{line: 'L1', startTime: '20:00', endTime: '20:20'},
		{line: 'L1', startTime: '21:00', endTime: '21:20'},
		{line: 'L1', startTime: '22:00', endTime: '22:20'},
		{line: 'L1', startTime: '23:00', endTime: '23:20'},
		{line: 'L3', startTime: '08:00', endTime: '08:15'},
		{line: 'L3', startTime: '10:00', endTime: '10:15'},
		{line: 'L3', startTime: '12:00', endTime: '12:15'},
		{line: 'L3', startTime: '14:00', endTime: '14:15'},
		{line: 'L3', startTime: '16:00', endTime: '16:15'},
		{line: 'L3', startTime: '18:00', endTime: '18:15'},
		{line: 'L3', startTime: '20:00', endTime: '20:15'},
		{line: 'L3', startTime: '22:00', endTime: '22:15'},
		{line: 'L3', startTime: '23:00', endTime: '23:15'},
		{line: 'L5', startTime: '08:00', endTime: '08:30'},
	]


	const handleClick = (stop) => {
		props.onChange(stop);
	}
	
	const handleFocus = (stop) => {
		props.onFocus(stop);
	}

	return (
		<ul className="w-full p-0">
			{(journeys).sort((a, b) => {
				return a.startTime > b.startTime ? 1 : -1;
			}).map((journey) => {
				if (journey) {
					return (
						<li key={journey.line + journey.startTime} onClick={() => {handleClick(journey.line)}} onMouseDown={() => {handleFocus(journey.line)}}>
							<JourneyCard line={journey.line} startTime={journey.startTime} endTime={journey.endTime} />
						</li>
					);
				}
			})}
		</ul>
	);
}
