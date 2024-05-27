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

	const journeys = lastStop != "" ? [
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '07:00', endTime: '07:30'},
		{line: 'L2', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '07:15', endTime: '07:42'},
		{line: 'L3', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '07:28', endTime: '07:51'},
		{line: 'L4', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '07:47', endTime: '08:11'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '08:00', endTime: '08:30'},
		{line: 'L4', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '08:49', endTime: '09:11'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '09:00', endTime: '09:30'},
		{line: 'L2', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '09:15', endTime: '09:42'},
		{line: 'L3', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '09:28', endTime: '09:51'},
		{line: 'L4', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '09:47', endTime: '10:11'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '10:00', endTime: '10:30'},
		{line: 'L3', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '10:28', endTime: '10:51'},
		{line: 'L4', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '10:47', endTime: '11:11'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '11:00', endTime: '11:30'},
		{line: 'L2', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '11:15', endTime: '11:42'},
		{line: 'L3', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '11:28', endTime: '11:51'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '12:00', endTime: '12:30'},
		{line: 'L3', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '12:28', endTime: '12:51'},
		{line: 'L4', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '12:00', endTime: '12:30'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '13:00', endTime: '13:30'},
		{line: 'L2', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '13:15', endTime: '13:42'},
		{line: 'L4', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '13:47', endTime: '14:11'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '14:00', endTime: '14:30'},
		{line: 'L3', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '14:28', endTime: '14:51'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '15:00', endTime: '15:30'},
		{line: 'L2', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '15:15', endTime: '15:42'},
		{line: 'L3', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '15:28', endTime: '15:51'},
		{line: 'L4', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '15:00', endTime: '15:30'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '16:00', endTime: '16:30'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '17:00', endTime: '17:30'},
		{line: 'L2', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '17:15', endTime: '17:42'},
		{line: 'L3', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '17:28', endTime: '17:51'},
		{line: 'L4', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '17:47', endTime: '18:11'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '18:00', endTime: '18:30'},
		{line: 'L3', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '18:28', endTime: '18:51'},
		{line: 'L4', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '18:47', endTime: '19:11'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '19:00', endTime: '19:30'},
		{line: 'L2', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '19:15', endTime: '19:42'},
		{line: 'L4', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '19:47', endTime: '20:11'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '20:00', endTime: '20:30'},
		{line: 'L3', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '20:28', endTime: '20:51'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '21:00', endTime: '21:30'},
		{line: 'L2', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '21:15', endTime: '21:42'},
		{line: 'L3', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '21:28', endTime: '21:51'},
		{line: 'L4', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '21:00', endTime: '21:30'},
		{line: 'L1', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '22:00', endTime: '22:30'},
		{line: 'L3', firstStop: {name: 'Tanques de Esgueira', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Rua de Ovar', lat: -23.550520, lon: -46.633308}, startTime: '22:28', endTime: '22:51'}
		{line: 'L1', firstStop: {name: 'Hospital / Universidade A', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'EB23 Rio Novo Príncipe', lat: -23.550520, lon: -46.633308}, startTime: '16:42', endTime: '16:59'},
		{line: 'L4', firstStop: {name: 'Hospital / Universidade A', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'EB23 do Eixo', lat: -23.550520, lon: -46.633308}, startTime: '17:08', endTime: '17:25'},
		{line: 'L2', firstStop: {name: 'Hospital / Universidade A', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Monte Cacia', lat: -23.550520, lon: -46.633308}, startTime: '17:13', endTime: '17:38'},
		{line: 'L6', firstStop: {name: 'Hospital / Universidade A', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Escolas Velhas Oliveirinhas', lat: -23.550520, lon: -46.633308}, startTime: '17:31', endTime: '17:51'},
		{line: 'L1', firstStop: {name: 'Hospital / Universidade A', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'EB23 Rio Novo Príncipe', lat: -23.550520, lon: -46.633308}, startTime: '17:42', endTime: '17:59'}
	] : [
		{line: 'L1', firstStop: {name: 'Hospital / Universidade A', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'EB23 Rio Novo Príncipe', lat: -23.550520, lon: -46.633308}, startTime: '16:42', endTime: '16:59', delay: 9},
		{line: 'L4', firstStop: {name: 'Hospital / Universidade A', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'EB23 do Eixo', lat: -23.550520, lon: -46.633308}, startTime: '17:08', endTime: '17:25', delay: 4},
		{line: 'L2', firstStop: {name: 'Hospital / Universidade A', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Monte Cacia', lat: -23.550520, lon: -46.633308}, startTime: '17:13', endTime: '17:38'},
		{line: 'L6', firstStop: {name: 'Hospital / Universidade A', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'Escolas Velhas Oliveirinhas', lat: -23.550520, lon: -46.633308}, startTime: '17:31', endTime: '17:51'},
		{line: 'L1', firstStop: {name: 'Hospital / Universidade A', lat: -23.550520, lon: -46.633308}, lastStop: {name: 'EB23 Rio Novo Príncipe', lat: -23.550520, lon: -46.633308}, startTime: '17:42', endTime: '17:59'},
	]


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
					if (line === "") {
						if (firstStop !== "" && lastStop === "") {
							return (
								<li key={journey.line + journey.startTime} onClick={() => {handleClick(journey.line)}} onMouseDown={() => {handleFocus(journey.line)}}>
									<a href='/app/tripTimeline'>
										<JourneyCard line={journey.line} startTime={journey.startTime} endTime={journey.endTime} departure={firstStop} destination={journey.lastStop.name} delay={journey.delay ? journey.delay : ""} />
									</a>
								</li>
							);
						} else if (firstStop !== "" && lastStop !== "") {
							return (
								<li key={journey.line + journey.startTime} onClick={() => {handleClick(journey.line)}} onMouseDown={() => {handleFocus(journey.line)}}>
									<a href='/app/tripTimeline'>
										<JourneyCard line={journey.line} startTime={journey.startTime} endTime={journey.endTime} departure={firstStop} destination={lastStop} delay={journey.delay ? journey.delay : ""} />
									</a>
								</li>
							);
						}
					} else if (journey.line === line) {
						return (
							<li key={journey.line + journey.startTime} onClick={() => {handleClick(journey.line)}} onMouseDown={() => {handleFocus(journey.line)}}>
								<a href='/app/tripTimeline'>
									<JourneyCard line={journey.line} startTime={journey.startTime} endTime={journey.endTime} departure={journey.firstStop.name} destination={journey.lastStop.name} delay={journey.delay ? journey.delay : ""} />
								</a>
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
}
