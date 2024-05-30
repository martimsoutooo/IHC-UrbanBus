import React from 'react';
import { baseURL } from './../consts/config.js';

export default function StopsPage() {
    const [stops, setStops] = React.useState([]);
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    React.useEffect(() => {
		// get data from API
		fetchData();
	}, []);

    const fetchData = async () => {
        const response = await fetch(baseURL + '/api/v1/stops');
        const data = await response.json();
        setStops(data);
    }

    const addStop = async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const location = document.getElementById('location').value;
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;

        console.log(JSON.stringify({
            name: name,
            location: location,
            latitude: latitude,
            longitude: longitude
        }));

        const response = await fetch(baseURL + '/api/v1/stops/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                location: location,
                latitude: latitude,
                longitude: longitude
            })
        });

        if (response.status === 201) {
            document.getElementById('addStop_modal').close();
            document.getElementById('confirmation_modal').showModal();

            document.getElementById('name').value = '';
            document.getElementById('location').value = '';
            document.getElementById('latitude').value = '';
            document.getElementById('longitude').value = '';

            setShowConfirmation(true); // Show the confirmation modal
            fetchData(); // Refresh the stops list
        } else {
            alert('Error adding stop');
        }
    }

    return (
        <div>
            <div className="flex flex-row items-center">
                <div>
                    <h1 className="text-4xl font-bold">Stops</h1>
                    <p className="text-xl">Here you can manage the stops</p>
                </div>

                <button className="btn btn-neutral ml-auto mr-8"
                        onClick={() => document.getElementById('addStop_modal').showModal()}>
                    Add stop
                </button>
            </div>

            <dialog id="addStop_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg">Add stop</h3>
                    <p className="py-4">Fill the inputs blabla</p>
                    <form className="flex flex-col gap-4">
                        <label className="input input-bordered flex items-center gap-2">
                            Name
                            <input id="name" type="text" className="grow" placeholder="Estação de Aveiro" required/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Location
                            <input id="location" type="text" className="grow"
                                   placeholder="R. Cmte. Rocha e Cunha 156, 3800-179 Aveiro" required/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Latitude
                            <input id="latitude" type="number" className="grow"
                                   placeholder="40.643450" required/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Longitude
                            <input id="longitude" type="number" className="grow"
                                   placeholder="-8.641420" required/>
                        </label>

                        <button type="submit" className="btn btn-neutral" onClick={addStop}>Add stop</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="confirmation_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Stop Added!</h3>
                    <p className="py-4">The stop was successfully added.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">OK</button>
                        </form>
                    </div>
                </div>
            </dialog>


            <div className="overflow-x-auto mt-12 containerTable table-pin-rows table-pin-cols">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                    </thead>
                    {/* body */}
                    <tbody>
                    {(stops).map((stop) => {
                        return (
                            <tr key={stop.id}>
                                <th>{stop.id}</th>
                                <td>{stop.name}</td>
                                <td>{stop.location}</td>
                                <td>{stop.latitude}</td>
                                <td>{stop.longitude}</td>
                            </tr>
                        );
                    })}
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