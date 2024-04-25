import React from 'react'; 
import { useState, useRef } from 'react';
import StopSearchHint from './StopSearchHint.jsx';
import StopListResult from './StopListResult.jsx';
import '../styles/schedules.css';

export default function Schedules() {
	const [searchTerm, setSearchTerm] = useState('');
	const [startStop, setStartStop] = useState('');
	const [lastStop, setLastStop] = useState('');
	const [isLastStopTheLastFocus, setIsLastStopTheLastFocus] = useState(false);
	const [selectedLine, setSelectedLine] = useState('');

	let lines = [
	    {name: 'L1', color: "bg-[#00b8a1]/70", id: 1},
	    {name: 'L2', color: 'bg-rose-500/50', id: 2},
	    {name: 'L3', color: 'bg-amber-500/50', id: 3},
	    {name: 'L4', color: 'bg-lime-500/50', id: 4},
	    {name: 'L5', color: 'bg-emerald-500/50', id: 5},
	    {name: 'L6', color: 'bg-cyan-500/50', id: 6},
	    {name: 'L7', color: 'bg-violet-500/50', id: 7},
	    {name: 'L8', color: 'bg-fuchsia-500/50', id: 8},
	    {name: 'L9', color: 'bg-rose-500/50', id: 9},
	    {name: 'L10', color: 'bg-amber-500/50', id: 10},
	    {name: 'L11', color: 'bg-lime-500/50', id: 11},
	    {name: 'AZUL', color: 'bg-blue-500/50', id: 12},
	    {name: 'VERDE', color: 'bg-green-500/50', id: 13},
	]

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

	const showHintList = (target) => {

		setSearchTerm(target.value);
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
		showHintList(e.target);
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

	const handleChange = (e) => {
		console.log(e.target.value);
		setSearchTerm(e.target.value);
		if (e.target.parentElement.id === 'startStop') {
			setStartStop(e.target.value);
		} else if (e.target.parentElement.id === 'lastStop') {
			setLastStop(e.target.value);
		}
	}

	const handleSelection = (stop) => {
		console.log(stop);
		if (!isLastStopTheLastFocus) {
			setStartStop(stop);
			if (lastStop.length > 0)
				showResultList();
		} else {
			setLastStop(stop);
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
		showResultList();
	}

	return (
		<div className="flex flex-col h-full">
			<div id="menu1" className="flex-1 h-1 transition-all">
				<div className="flex flex-col h-full gap-2"> {/* Gap between input and list */}
					<div id="stopInputs" className="flex-0 flex flex-col gap-2"> {/* Gap between the 2 inputs */}
						<label className="input input-bordered flex items-center gap-2">
							<input type="text" className="grow" onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} placeholder="Search for a stop" value={startStop} />
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
						</label>

						<label className="input input-bordered flex items-center gap-2">
							<input type="text" className="grow" onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} placeholder="Search your destiny" value={lastStop} />
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
						</label>
					</div>
					<div id="hintList" className="flex-1 overflow-auto hidden">
						<StopSearchHint search={searchTerm} onChange={handleSelection} onFocus={handleSelectionFocus} />
					</div>
					<div id="resultList" className="flex1 overflow-auto hidden">
						<StopListResult line={selectedLine} firstStop={startStop} lastStop={lastStop} />
					</div>
				</div>
			</div>
			<div id="separator" className="divider mb-0 vertical-center">OR</div>
			<div id="menu2" className="flex-1 overflow-auto transition-all">
				<div className="flex flex-col border-opacity-50 mx-4 mb-4">
					<div className="flex justify-center text-sm font-light mb-5">choose a line</div>
					<div className="flex flex-wrap justify-center gap-3">
						{(lines).map((line) => (
							<button key={line.id} onClick={() => {lineSelection(line.name)}} className={"btn btn-circle w-14 h-14 " + line.color}>{line.name}</button>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
