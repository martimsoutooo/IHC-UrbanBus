import React from "react";
import {baseURL} from "../consts/config.js";

export default function JourneysPage() {
    const [journeys, setJourneys] = React.useState([]);
    const [exceptionStops, setExceptionStops] = React.useState([]);

    React.useEffect(() => {
        // get data from API
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(baseURL + '/api/v1/journeys');
        const data = await response.json();
        console.log(data);
        setJourneys(data);
    }

    const addJourney = async (e) => {

    }

    const addExceptions = async (e) => {

    }

    return (
        <div>
            <div className="flex flex-row items-center">
                <div>
                    <h1 className="text-4xl font-bold">Journeys</h1>
                    <p className="text-xl">Here you can manage the Journeys</p>
                </div>

                <button className="btn btn-neutral ml-auto mr-8"
                        onClick={() => document.getElementById('addLine_modal').showModal()}>
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


                <dialog id="addLine_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-2xl">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>

                        <h3 className="font-bold text-lg mb-4">Add journey</h3>
                        <form className="flex flex-col gap-4">
                            <label className="input input-bordered flex items-center gap-2">
                                Number
                                <input id="number" type="number" className="grow" placeholder="1" required/>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Color
                                <input id="color" type="text" className="grow"
                                       placeholder="#RRGGBB" required/>
                            </label>

                            {/* Exception stops */}
                            <h3 className="font-bold text-lg">Exception stops</h3>
                            <div className="flex items-center gap-2">
                                <div className="input input-bordered flex items-center gap-2 autocomplete">
                                    <input autoComplete="off" id="outboundInput" type="text" className="grow"
                                           placeholder="Stop name" required/>
                                </div>
                                <button className="btn btn-neutral" onClick={addExceptions}>Add</button>
                            </div>

                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Stop ID</th>
                                    <th>Stop Name</th>
                                    <th>Location</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {(exceptionStops).map((stop, index) => {
                                    let stopId = stop.id;
                                    let stopName = stop.name;
                                    let stopLocation = stop.location;

                                    return (
                                        <tr key={exceptionStops.indexOf(stop)}>
                                            <td>{stopId}</td>
                                            <td>{stopName}</td>
                                            <td>{stopLocation}</td>
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
                        <h3 className="font-bold text-lg">Line Added!</h3>
                        <p className="py-4">The line was successfully added.</p>
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