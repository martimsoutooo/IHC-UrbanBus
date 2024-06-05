import React from "react";
import {baseURL} from "../consts/config.js";
import {autocomplete} from "../consts/autoComplete.js";
import '../../styles/autocomplete.css';

export default function JourneysPage() {
    const [journeys, setJourneys] = React.useState([]);
    const [lines, setLines] = React.useState([]);
    const [stops, setStops] = React.useState([]);
    const [exceptionStops, setExceptionStops] = React.useState([]);

    React.useEffect(() => {
        // get data from API
        fetchData().then((data) => {
            const dataStops = data[2];
            const stopNames = dataStops.map((stop) => stop.name);
            console.log("stopNames: ", stopNames);
            const inp = document.getElementById("exceptionInput");
            autocomplete(inp, stopNames);
        });
    }, []);

    const fetchData = async () => {
        const responseJourneys = await fetch(baseURL + '/api/v1/journeys');
        const dataJourneys = await responseJourneys.json();
        setJourneys(dataJourneys);

        const responseLines = await fetch(baseURL + '/api/v1/lines');
        const dataLines = await responseLines.json();
        setLines(dataLines);

        const responseStops = await fetch(baseURL + '/api/v1/stops');
        const dataStops = await responseStops.json();
        setStops(dataStops);

        return [dataJourneys, dataLines, dataStops];
    }

    const addJourney = async (e) => {
        e.preventDefault();
        const lineNumber = document.getElementById('lineInput').value;
        const startTime = document.getElementById('timeInput').value;
        const outbound = document.getElementById('outboundInput').value === 'true' ? 1 : 0;

        console.log('request',JSON.stringify({
            line: lineNumber,
            exceptions: exceptionStops,
            startTime: startTime,
            outbound: outbound,
        }));

        const response = await fetch(baseURL + '/api/v1/journeys/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                line: lineNumber,
                exceptions: exceptionStops,
                startTime: startTime,
                outbound: outbound,
            })
        });

        if (response.status === 201) {
            document.getElementById('addJourney_modal').close();
            document.getElementById('confirmation_modal').showModal();

            document.getElementById('lineInput').value = '';
            document.getElementById('exceptionInput').value = '';

            setExceptionStops([]);

            fetchData();
        } else {
            alert('Error adding line');
        }
    }

    const addExceptionStop = async (e) => {
        e.preventDefault();
        const stopName = document.getElementById('exceptionInput').value;
        const id = stops.find((s) => s.name === stopName).id;
        let time = "00:00:00";

        setExceptionStops([...exceptionStops, {"stop": id, "time": time}]);
        console.log(exceptionStops)
        document.getElementById('exceptionInput').value = '';
    }

    const removeExceptionStop = (e) => {
        e.preventDefault();
        const stopId = Number(e.target.closest('tr').children[0].textContent);

        const newStops = exceptionStops.filter((s) => s.stop !== stopId);
        setExceptionStops(newStops);
    }

    const changeTimeException = (e) => {
        const stopId = Number(e.target.closest('tr').children[0].textContent);
        const time = Number(e.target.value);
        let hours = Math.floor(time / 60);
        let minutes = Math.floor(time % 60);
        let seconds = Math.floor(time % 1 * 60);
        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        const newStops = exceptionStops.map((s) => {
            if (s.stop === stopId) {
                s.time = `${hours}:${minutes}:${seconds}`;
            }
            return s;
        });
        setExceptionStops(newStops);
        console.log(exceptionStops);
    }


    return (
        <div>
            <div className="flex flex-row items-center">
                <div>
                    <h1 className="text-4xl font-bold">Journeys</h1>
                    <p className="text-xl">Here you can manage the Journeys</p>
                </div>

                <button className="btn btn-neutral ml-auto mr-8"
                        onClick={() => document.getElementById('addJourney_modal').showModal()}>
                    Add journey
                </button>
            </div>

            <div className="overflow-x-auto mt-12 containerTable table-pin-rows table-pin-cols">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Line</th>
                        <th>First Stop</th>
                        <th>Last Stop</th>
                        <th>Direction</th>
                        <th>Start time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {journeys.map((journey) => (
                        <tr key={journey.id}>
                            <td>{journey.id}</td>
                            <td>{journey.line.name}</td>
                            <td>[{journey.firstStop.id}] {journey.firstStop.name}</td>
                            <td>[{journey.lastStop.id}] {journey.lastStop.name}</td>
                            <td>{journey.direction === 'outbound' ? 'Ida' : 'Volta'}</td>
                            <td>{journey.time}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>


                <dialog id="addJourney_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-2xl">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>

                        <h3 className="font-bold text-lg mb-4">Add journey</h3>
                        <form className="flex flex-col gap-4">
                            <label className="input input-bordered flex items-center gap-2">
                                Line ID
                                <input id="lineInput" type="number" className="grow" placeholder="1" required/>
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Start time
                                <input id="timeInput" type="time" className="grow" required/>
                            </label>
                            <div className="flex flex-row gap-8 items-center ml-8">
                                Direction:
                                <select id="outboundInput"
                                        className="select select-bordered flex items-center gap-2 grow">

                                    <option value="true">Ida</option>
                                    <option value="false">Volta</option>
                                </select>
                            </div>


                            {/* Exception stops */}
                            <h3 className="font-bold text-lg">Exception stops</h3>
                            <div className="flex items-center gap-2">
                                <div className="input input-bordered flex items-center gap-2 autocomplete">
                                    <input autoComplete="off" id="exceptionInput" type="text" className="grow"
                                           placeholder="Stop name" required/>
                                </div>
                                <button className="btn btn-neutral" onClick={addExceptionStop}>Add</button>
                            </div>

                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Stop ID</th>
                                    <th>Stop Name</th>
                                    <th>Location</th>
                                    <th>Time Modifier</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {(exceptionStops).map((stopTime, index) => {
                                    let stopId = stopTime.stop;
                                    let stop = stops.find((s) => s.id === stopId);

                                    return (
                                        <tr key={exceptionStops.indexOf(stopTime)}>
                                            <td>{stop.id}</td>
                                            <td>{stop.name}</td>
                                            <td>{stop.location}</td>
                                            <td>
                                                <div className="input input-bordered flex items-center gap-2">
                                                    <input type="number" placeholder="0" className="w-16"
                                                           onChange={changeTimeException}/>
                                                </div>
                                            </td>
                                            <td>
                                                <button className="btn btn-neutral btn-square"
                                                        onClick={removeExceptionStop}>X
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>


                            <button type="submit" className="btn btn-neutral" onClick={addJourney}>Add Journey</button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

                <dialog id="confirmation_modal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Journey Added!</h3>
                        <p className="py-4">The journey was successfully added.</p>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">OK</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

            <style>{`
                .containerTable {
                    height: 600px;
                }
            `}</style>
        </div>
    )
}