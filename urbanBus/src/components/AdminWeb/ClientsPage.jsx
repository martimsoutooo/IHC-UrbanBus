import React from "react";
import {baseURL} from "../consts/config.js";

export default function ClientsPage() {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        // get data from API
        fetchData();
    }, []);

    const fetchData = async () => {
        const responseTickets = await fetch(baseURL + '/api/v1/users');
        const dataUsers = await responseTickets.json();
        console.log(dataUsers);
        setUsers(dataUsers);
    }

    return (
        <div>
            <h1 className="text-4xl font-bold">Clients</h1>
            <p className="text-xl">Here you can manage the clients</p>

            <div className="overflow-x-auto mt-12 containerTable table-pin-rows table-pin-cols">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>NIF</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.number}>
                            <td>{user.number}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.nif}</td>
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