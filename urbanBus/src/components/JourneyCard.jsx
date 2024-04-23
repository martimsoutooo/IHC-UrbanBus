import React from 'react';
import { useState, useEffect } from 'react';

export default function JourneyCard(props) {
	const [line, setLine] = useState(props.line);
	const [startTime, setStartTime] = useState(props.startTime);
	const [endTime, setEndTime] = useState(props.endTime);

	useEffect(() => {
		setLine(props.line);
		setStartTime(props.startTime);
		setEndTime(props.endTime);
	}, [props.line, props.startTime, props.endTime]);

	return (
		<div className="card bg-white shadow-md rounded-lg p-4 m-4">
			<div className="flex justify-between items-center">
				<div className="flex items-center">
					<div className="flex items-center justify-center bg-[#00b8a1] text-white w-12 h-12 rounded-full">
						{line}
					</div>
					<div className="ml-4">
						<p className="text-lg font-semibold text-gray-800">{startTime} - {endTime}</p>
					</div>
				</div>
				<div>
					<button className="text-white bg-[#00b8a1] px-4 py-2 rounded-lg">Select</button>
				</div>
			</div>
		</div>
	)
}


