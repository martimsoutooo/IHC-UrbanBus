import React from "react";
import {baseURL} from "../consts/config.js";

export default function JourneysPage() {
    const [journeys, setJourneys] = React.useState([]);

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

    return (
        <div>
            <h1 className="text-4xl font-bold">Journeys</h1>
            <p className="text-xl">Here you can manage the Journeys</p>

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
                                <td>[{journey.lastStop.id}]  {journey.lastStop.name}</td>
                                <td>{journey.direction === 'outbound' ? 'Ida' : 'Volta'}</td>
                                <td>{journey.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .containerTable {
                    height: 600px;
                }
            `}</style>
        </div>
    )
}