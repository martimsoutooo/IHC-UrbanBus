import React from 'react';
import { useState, useEffect } from 'react';
import StopSearchHint from './StopSearchHint.jsx';
import StopListResult from './StopListResult.jsx';

export default function NextBus(props) {
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		// get url search parameter
		const urlParams = new URLSearchParams(window.location.search);
		const search = urlParams.get('search');
		console.log('search:', search)
		if (search) {
			setSearchTerm(search);
			resultList.classList.remove('hidden');
		}
	}, []);

	let timers = [];
	const stopTimers = () => {
		timers.forEach(timer => {
			if (timer)
				clearTimeout(timer)
		});
		timers = [];
	}
	
	const handleFocus = (e) => {
		setSearchTerm(e.target.value);
		resultList.classList.add('hidden');
		hintList.classList.remove('hidden');
	}

	const handleBlur = (e) => {
		timers.push(setTimeout(() => {
			hintList.classList.add('hidden');
		}, 10));
	}

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	}

	const handleSelection = (stop) => {
		setSearchTerm(stop);
		hintList.classList.add('hidden');
		resultList.classList.remove('hidden');
	}

	const handleSelectionFocus = (e) => {
		setTimeout(() => {
			stopTimers();
		})
	}

	return (

		<div className="flex flex-col h-full gap-2 "> {/* Gap between input and list */}
			<label id="stop" className="input input-bordered flex items-center mt-4">
				<input type="text" className="grow" onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} placeholder="Your Bus Stop" value={searchTerm} />
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
			</label>
			<div id="hintList" className="flex-1 overflow-auto hidden">
				<StopSearchHint search={searchTerm} onChange={handleSelection} onFocus={handleSelectionFocus} />
			</div>
			<div id="resultList" className="flex-1 overflow-auto hidden">
				<StopListResult line="" firstStop={searchTerm} lastStop="" />
			</div>
		</div>
	);
}


