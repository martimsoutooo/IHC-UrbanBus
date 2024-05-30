import React, { useEffect, useState } from 'react';
import { baseURL } from './../consts/config.js';

export default function ValidationsPage() {
    const [stopsValidations, setStopsValidations] = useState([]);
    const [journeyInstancesValidations, setJourneyInstancesValidations] = useState([]);

    useEffect(() => {
        // get data from API
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(baseURL + '/api/v1/validations');
        const data = await response.json();
        console.log(data);
        setStopsValidations(data);
    }

    return (
        <div>
            <h1 className="text-4xl font-bold">Validations</h1>
            <p className="text-xl">Here you can manage the validations</p>

            <select className="select select-bordered w-full max-w-xs mt-10">
                <option>Stops</option>
                <option>Journey Instances</option>
            </select>
            <div className="overflow-x-auto mt-4 containerTable table-pin-rows table-pin-cols">
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
        </div>
    )
}