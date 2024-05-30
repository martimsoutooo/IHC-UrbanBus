import React from "react";
import {baseURL} from "../consts/config.js";
import {autocomplete} from "../consts/autoComplete.js";

export default function TicketsPage() {
    const [tickets, setTickets] = React.useState([]);

    React.useEffect(() => {
        // get data from API
        fetchData();
    }, []);

    const fetchData = async () => {
        const responseTickets = await fetch(baseURL + '/api/v1/tickets');
        const data = await responseTickets.json();
        console.log(data);
        setTickets(data);
    }

    return (
        <div>
            <h1 className="text-4xl font-bold">Tickets</h1>
            <p className="text-xl">Here you can manage the tickets</p>

            <div className="overflow-x-auto mt-12 containerTable table-pin-rows table-pin-cols">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Zone</th>
                        <th>Client ID</th>
                        <th>Ticket Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.zone}</td>
                            <td>{ticket.client}</td>
                            <td>{ticket.type}</td>
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