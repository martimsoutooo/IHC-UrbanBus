import React from 'react';
import { useState, useEffect } from 'react';

export default function LineTable(props) {
	let date = new Date();

	const [lineName, setLineName] = useState(props.line);
	const [selectedDay, setSelectedDay] = useState(date.getDay() % 6 == 0 ? 1 : 0);

	useEffect(() => {
		setLineName(props.line);
	}, [props.line]);

	const handleChange = (e) => {
		setSelectedDay(Number(e.target.value));
	}

	const line = [
		{
			key: 'DU',
			days: 'Dias úteis',
			stops: [
				'Estación 1',
				'Estación 2',
				'Estación 3',
				'Estación 4',
				'Estación 5',
			],
			schedules: [
				['06:00', '06:30', '07:00', '07:30', '08:00'],
				['06:10', '06:40', '07:10', '07:40', '08:10'],
				['06:20', '06:50', '07:20', '07:50', '08:20'],
				['06:30', '07:00', '07:30', '08:00', '08:30'],
				['06:40', '07:10', '07:40', '08:10', '08:40'],
				['06:50', '07:20', '07:50', '08:20', '08:50'],
				['07:00', '07:30', '08:00', '08:30', '09:00'],
				['07:10', '07:40', '08:10', '08:40', '09:10'],
				['07:20', '07:50', '08:20', '08:50', '09:20'],
				['07:30', '08:00', '08:30', '09:00', '09:30'],
				['07:40', '08:10', '08:40', '09:10', '09:40'],
				['07:50', '08:20', '08:50', '09:20', '09:50'],
				['08:00', '08:30', '09:00', '09:30', '10:00'],
				['08:10', '08:40', '09:10', '09:40', '10:10'],
				['08:20', '08:50', '09:20', '09:50', '10:20'],
				['08:30', '09:00', '09:30', '10:00', '10:30'],
				['08:40', '09:10', '09:40', '10:10', '10:40'],
				['08:50', '09:20', '09:50', '10:20', '10:50'],
				['09:00', '09:30', '10:00', '10:30', '11:00'],
				['09:10', '09:40', '10:10', '10:40', '11:10'],
				['09:20', '09:50', '10:20', '10:50', '11:20'],
				['09:30', '10:00', '10:30', '11:00', '11:30'],
				['09:40', '10:10', '10:40', '11:10', '11:40'],
				['09:50', '10:20', '10:50', '11:20', '11:50'],
				['10:00', '10:30', '11:00', '11:30', '12:00'],
			],
		},
		{
			key: 'SDF',
			days: 'Sábados, domingos e feriados',
			stops: [
				'Estación 1',
				'Estación 3',
			],
			schedules: [
				['06:00', '08:00'],
				['07:00', '09:00'],
				['08:00', '10:00'],
				['09:00', '11:00'],
				['10:00', '12:00'],
			]
		}
	];

	return (
		<>
			<select className="select select-secondary w-full" onChange={handleChange}>
				<option value="0">Dias úteis</option>
				<option value="1">Sábados, domingos e feriados</option>
			</select>
			<div className="h-full overflow-auto pt-2">
				<table className="table table-xs table-pin-rows">
					<thead>
						<tr>
							{line[selectedDay].stops.map(stop => (<th>{stop}</th>))}
						</tr>
					</thead>
					<tbody>
						{line[selectedDay].schedules.map(schedule => (
							<tr>
								{schedule.map(time => <td>{time}</td>)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
