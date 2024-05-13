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
		{line: 'L1', firstStop: {name: 'Terminal Rodoviário', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua do Glicínias', lat: -23.550520, lon: -46.633308}, startTime: '07:00', endTime: '07:30', delay: 5},
		{line: 'L1', firstStop: {name: 'Rua do Glicínias', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua do Girassol', lat: -23.550520, lon: -46.633308}, startTime: '07:30', endTime: '08:00'},
		{line: 'L1', firstStop: {name: 'Rua do Girassol', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua do Girassol', lat: -23.550520, lon: -46.633308}, startTime: '08:00', endTime: '08:30', delay: 3},
		{line: 'L2', firstStop: {name: 'Terminal Rodoviário', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua do Glicínias', lat: -23.550520, lon: -46.633308}, startTime: '07:00', endTime: '07:30'},
		{line: 'L2', firstStop: {name: 'Rua do Glicínias', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua do Girassol', lat: -23.550520, lon: -46.633308}, startTime: '07:30', endTime: '08:00'},
		{line: 'L2', firstStop: {name: 'Rua do Girassol', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua do Girassol', lat: -23.550520, lon: -46.633308}, startTime: '08:00', endTime: '08:30'},
		{line: 'L3', firstStop: {name: 'Terminal Rodoviário', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua do Glicínias', lat: -23.550520, lon: -46.633308}, startTime: '07:00', endTime: '07:30', delay: 9},
		{line: 'L3', firstStop: {name: 'Rua do Glicínias', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua do Girassol', lat: -23.550520, lon: -46.633308}, startTime: '07:30', endTime: '08:00'},
		{line: 'L3', firstStop: {name: 'Rua do Girassol', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua do Girassol', lat: -23.550520, lon: -46.633308}, startTime: '08:00', endTime: '08:30'},
		{line: 'L4', firstStop: {name: 'Terminal Rodoviário', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua do Glicínias', lat: -23.550520, lon: -46.633308}, startTime: '07:00', endTime: '07:30'},
	]


	const handleClick = (stop) => {
		props.onChange(stop);
	}
	
	const handleFocus = (stop) => {
		props.onFocus(stop);
	}

	return (
		<div>
			<div className="flex flex-row items-center gap-4">
                <button className="btn btn-circle btn-ghost">
                    <a href='/app/schedules'>
                        <svg className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                    </a>
                </button>
                <p className='text-2xl font-bold'>{line} - Trips</p>
            </div>

			<ul className="w-full p-0">
				{(journeys).sort((a, b) => {
					return a.startTime > b.startTime ? 1 : -1;
				}).map((journey) => {
					if (journey.line === line) {
						return (
							<li key={journey.line + journey.startTime} onClick={() => {handleClick(journey.line)}} onMouseDown={() => {handleFocus(journey.line)}}>
								<a href='/app/tripTimeline'>
									<JourneyCard line={journey.line} startTime={journey.startTime} endTime={journey.endTime} />
								</a>
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
}
