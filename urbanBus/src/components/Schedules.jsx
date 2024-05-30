import React from 'react'; 
import { useState, useEffect } from 'react';
import StopSearchHint from './StopSearchHint.jsx';
import StopListResult from './StopListResult.jsx';
import '../styles/schedules.css';
import SchedulesTripsBar from './ChoosenLineBar.jsx';
import { baseURL } from './consts/config.js';

export default function Schedules() {
	const [searchTerm, setSearchTerm] = useState('');
	const [startStop, setStartStop] = useState('');
	const [lastStop, setLastStop] = useState('');
	const [startStopId, setStartStopId] = useState('');
	const [lastStopId, setLastStopId] = useState('');
	const [isLastStopTheLastFocus, setIsLastStopTheLastFocus] = useState(false);
	const [selectedLine, setSelectedLine] = useState('');

	const [lines, setLines] = useState([
	    {name: '', color: "bg-[#00b8a1]/70", number: 1},
	    {name: '', color: 'bg-rose-500/50', number: 2},
	    {name: '', color: 'bg-amber-500/50', number: 3},
	    {name: '', color: 'bg-lime-500/50', number: 4},
	    {name: '', color: 'bg-emerald-500/50', number: 5},
	    {name: '', color: 'bg-cyan-500/50', number: 6},
	    {name: '', color: 'bg-violet-500/50', number: 7},
	    {name: '', color: 'bg-fuchsia-500/50', number: 8},
	    {name: '', color: 'bg-rose-500/50', number: 9},
	    {name: '', color: 'bg-amber-500/50', number: 10},
	    {name: '', color: 'bg-lime-500/50', number: 11},
	    {name: '', color: 'bg-blue-500/50', number: 12},
	    {name: '', color: 'bg-green-500/50', number: 13},
	])

	useEffect(() => {
		// get data from API
		const fetchData = async () => {
			const response = await fetch(baseURL + '/api/v1/lines');
			const data = await response.json();
			console.log(data);
			setLines(data);
		}

		fetchData();
	}, []);


	let animationTimers = [];

	const stopTimers = () => {
		animationTimers.forEach(timer => {
			if (timer)
				clearTimeout(timer)
		});
		animationTimers = [];
	}


	const hideMenu2Transition = (fast = false) => {
		stopTimers();
		// Animation to hide the menu2 by changing the height
		animationTimers.push(setTimeout(() => {
			menu1.style.flexGrow = 10;
		}, fast ? 20 : 120));
		separator.style.marginLeft = '8rem';
		separator.style.marginRight = '8rem';
		// set timer to display none the menu2
		animationTimers.push(setTimeout(() => {
			menu2.style.display = 'none';
			separator.style.display = 'none';
		}, 300));
	}


	const showMenu2Transition = () => {
		animationTimers.push(setTimeout(() => {
			stopTimers();
			menu2.style.display = 'flex';
			separator.style.display = 'flex';
			menu1.style.flexGrow = 1;
			animationTimers.push(setTimeout(() => {
				separator.style.marginLeft = '1rem';
				separator.style.marginRight = '1rem';
			}, 200));
		}, 150));
	}

	const showHintList = (value) => {

		setSearchTerm(value);
		setTimeout(() => {
			hintList.classList.remove('hidden');
		}, 150);
	}

	const hideHintList = () => {
		hintList.classList.add('hidden');
	}

	const hideStopInputs = () => {
		stopInputs.classList.add('hidden');
	}

	const handleFocus = (e) => {
		hideMenu2Transition();
		hideResultList();
		showHintList(e.target.value);
		if (e.target.parentElement.id === 'lastStop') {
			setIsLastStopTheLastFocus(true);
			setLastStop("");
		} else {
			setIsLastStopTheLastFocus(false);
			setStartStop("");
		}
		setSearchTerm("");
	}

	const handleBlur = (e) => {
		if (startStop == "" && lastStop == "") {
			showMenu2Transition();
		}
		animationTimers.push(setTimeout(() => {
			hideHintList();
		}, 10));
	}

	const showResultList = () => {
		resultList.classList.remove('hidden');
	}

	const hideResultList = () => {
		resultList.classList.add('hidden');
	}

	const showLineBar = () => {
		lineBar.classList.remove('hidden');
	}

	const hideLineBar = () => {
		lineBar.classList.add('hidden');
	}

	const handleChange = (e) => {
		let val = e.target.value;
		console.log(val);
		setSearchTerm(val);
		if (e.target.parentElement.id === 'firstStop') {
			console.log("start stop")
			setStartStop(val);
		} else if (e.target.parentElement.id === 'lastStop') {
			setLastStop(val);
		}
	}

	const handleSelection = (stop) => {
		console.log(stop.name);
		if (!isLastStopTheLastFocus) {
			setStartStop(stop.name);
			setStartStopId(stop.id);
			if (lastStop.length > 0)
				showResultList();
		} else {
			setLastStop(stop.name);
			setLastStopId(stop.id);
			if (startStop.length > 0)
				showResultList();
		}
		hideHintList();
	}

	const handleSelectionFocus = (stop) => {
		console.log("selection focus")
		setTimeout(() => {
			stopTimers();
		}, 5);
	}

	const lineSelection = (line) => {
		setSelectedLine(line);
		hideMenu2Transition(true);
		hideStopInputs();
		showLineBar();
		showResultList();
	}

	return (
		<div className="flex flex-col h-full">
			<div id="menu1" className="flex-1 h-1 transition-all">
				<div className="flex flex-col h-full gap-2"> {/* Gap between input and list */}
					<div id="stopInputs" className="flex-0 flex flex-col gap-2"> {/* Gap between the 2 inputs */}
						<label id="firstStop" className="input input-bordered flex items-center gap-2">
							<input type="text" className="grow" onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} placeholder="Departure Stop" value={startStop} />
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
						</label>

						<label id="lastStop" className="input input-bordered flex items-center gap-2">
							<input type="text" className="grow" onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} placeholder="Destination Stop" value={lastStop} />
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
						</label>
					</div>
					<div id="hintList" className="flex-1 overflow-auto hidden">
						<StopSearchHint search={searchTerm} onChange={handleSelection} onFocus={handleSelectionFocus} />
					</div>

					<div id='lineBar' className="hidden">
                		<SchedulesTripsBar line={selectedLine} />
            		</div>

					<div id="resultList" className="flex1 overflow-auto hidden">
						<StopListResult line={selectedLine} firstStop={startStopId} lastStop={lastStopId} />
					</div>
				</div>
			</div>
			<div id="separator" className="divider mb-0 vertical-center">OR</div>
			<div id="menu2" className="flex-1 overflow-auto transition-all">
				<div className="flex flex-col border-opacity-50 mx-4 mb-4">
					<div className="flex justify-center text-sm font-light mb-5">choose a line</div>
					<div className="flex flex-wrap justify-center gap-3">
						{(lines).map((line) => (
							<button key={line.number} onClick={() => {lineSelection(line)}} className="btn btn-circle w-14 h-14 text-white"
								style={{backgroundColor: line.color}}>{line.name}</button>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
