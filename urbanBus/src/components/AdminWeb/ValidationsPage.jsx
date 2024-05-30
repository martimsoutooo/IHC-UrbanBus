import React, { useEffect, useState } from 'react';
import { baseURL } from './../consts/config.js';

export default function ValidationsPage() {
    const [stopsValidations, setStopsValidations] = useState([]);
    const [journeyInstances, setJourneyInstances] = useState([]);
    const [journeyInstancesValidations, setJourneyInstancesValidations] = useState([]);

    useEffect(() => {
        // get data from API
        fetchData();
    }, []);

    const fetchData = async () => {
        const responseStops = await fetch(baseURL + '/api/v1/validations');
        const dataStops = await responseStops.json();
        console.log(dataStops);
        setStopsValidations(dataStops);

        const responseJI = await fetch(baseURL + '/api/v1/journeyInstances');
        const dataJI = await responseJI.json();
        console.log(dataJI);
        setJourneyInstances(dataJI);
    }

    const switchTable = (event) => {
        if (event.target.value === 'stops') {
            document.getElementById('stopsTable').classList.remove('hidden');
            document.getElementById('journeyInstancesTable').classList.add('hidden');
        } else {
            document.getElementById('stopsTable').classList.add('hidden');
            document.getElementById('journeyInstancesTable').classList.remove('hidden');
        }
    }

    const openValidationModal = (id) => async () => {
        const response = await fetch(baseURL + '/api/v1/journeyInstance/' + id + '/validations');
        const data = await response.json();
        console.log(data);
        setJourneyInstancesValidations(data);

        document.getElementById('validationsModal').showModal();
    }

    const makeValidation = async (event) => {
        event.preventDefault();

        const JIid = document.getElementById('JIid').value;
        const ticketid = document.getElementById('ticketid').value;

        const response = await fetch(baseURL + '/api/v1/journeyInstance/' + JIid + '/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ticketId: ticketid
            })
        });

        if (response.ok) {
            alert('Validation made successfully');
            fetchData();
        } else {
            alert('Error making validation');
        }

        document.getElementById('addValidation_modal').close();
    }

    return (
        <div>
            <h1 className="text-4xl font-bold">Validations</h1>
            <p className="text-xl">Here you can manage the validations</p>

            <div className="flex flex-row items-center">
                <select className="select select-bordered w-full max-w-xs mt-10" onChange={switchTable}>
                    <option value="stops">Stops</option>
                    <option value="journeys">Journey Instances</option>
                </select>

                <button className="btn btn-neutral ml-auto mr-8"
                        onClick={() => document.getElementById('addValidation_modal').showModal()}>
                    Make Validation
                </button>
            </div>

            <div id="stopsTable" className="overflow-x-auto mt-4 containerTable table-pin-rows table-pin-cols">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Stop ID</th>
                        <th>Stop Name</th>
                        <th>Stop Location</th>
                        <th>Validations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stopsValidations.map((stopValidation) => (
                        <tr key={stopValidation.stop.id}>
                            <td>{stopValidation.stop.id}</td>
                            <td>{stopValidation.stop.name}</td>
                            <td>{stopValidation.stop.location}</td>
                            <td>{stopValidation.validations}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div id="journeyInstancesTable"
                 className="overflow-x-auto mt-4 containerTable table-pin-rows table-pin-cols hidden">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Journey Instance ID</th>
                        <th>Journey ID</th>
                        <th>Line ID</th>
                        <th>DateTime</th>
                        <th>Validations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {journeyInstances.map((journeyInstance) => (
                        <tr key={journeyInstance.id}>
                            <td>{journeyInstance.id}</td>
                            <td>{journeyInstance.idJourney}</td>
                            <td>{journeyInstance.journey.idLine}</td>
                            <td>{journeyInstance.dateTime.split('.')[0]}</td>
                            <td>
                                <button className="btn btn-sm btn-neutral "
                                        onClick={openValidationModal(journeyInstance.id)}>View Validations
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <dialog id="validationsModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h1 className="text-2xl font-bold">Validations</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <td>Ticket ID</td>
                            <td>Stop ID</td>
                            <td>DateTime</td>
                        </tr>
                        </thead>
                        <tbody>
                        {journeyInstancesValidations.map((validation, index) => (
                            <tr key={index}>
                                <td>{validation.ticketId}</td>
                                <td>{validation.stopId}</td>
                                <td>{validation.dateTime.split('.')[0]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="addValidation_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h1 className="text-2xl font-bold mb-4">Make Validation</h1>
                    <form className="flex flex-col gap-4">
                        <label className="input input-bordered flex items-center gap-2">
                            Journey Instance ID
                            <input id="JIid" type="number" className="grow" placeholder="1" required/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Ticket ID
                            <input id="ticketid" type="number" className="grow" placeholder="10000" required/>
                        </label>
                        <button type="submit" className="btn btn-neutral" onClick={makeValidation}>Validate</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                <button>close</button>
                </form>
            </dialog>
            <style>{`
                .containerTable {
                    height: 500px;
                }
            `}</style>
        </div>
    )
}