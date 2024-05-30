import React from 'react';
import { baseURL } from './../consts/config.js';
import { autocomplete } from './../consts/autoComplete.js';
import '../../styles/autocomplete.css';

export default function LinesPage() {
    const [lines, setLines] = React.useState([]);
    const [stops, setStops] = React.useState([]);
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [newOutboundStops, setNewOutboundStops] = React.useState([]);
    const [newInboundStops, setNewInboundStops] = React.useState([]);

    React.useEffect(() => {
        // get data from API
        fetchData().then((data) => {
            const dataStops = data[0];
            const dataLines = data[1];
            console.log("stops: ", dataStops);
            console.log("lines: ", dataLines);
            const stopNames = dataStops.map((stop) => stop.name);
            console.log("stopNames: ", stopNames);
            autocomplete(outboundInput, stopNames);
            autocomplete(inboundInput, stopNames);
        });
    }, []);

    const fetchData = async () => {
        const responseStops = await fetch(baseURL + '/api/v1/stops');
        const dataStops = await responseStops.json();
        setStops(dataStops);

        const responseLines = await fetch(baseURL + '/api/v1/lines');
        const dataLines = await responseLines.json();
        setLines(dataLines);

        return [dataStops, dataLines];
    }

    const addLine = async (e) => {
        e.preventDefault();
        const num = Number(number.value)
        const name = "L" + num;
        const color = document.getElementById('color').value;

        console.log(JSON.stringify({
            number: num,
            name: name,
            outbound: newOutboundStops,
            inbound: newInboundStops,
            color: color
        }));

        const response = await fetch(baseURL + '/api/v1/lines/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number: num,
                name: name,
                outbound: newOutboundStops,
                inbound: newInboundStops,
                color: color
            })
        });

        if (response.status === 201) {
            document.getElementById('addLine_modal').close();
            document.getElementById('confirmation_modal').showModal();

            document.getElementById('number').value = '';
            document.getElementById('outboundInput').value = '';
            document.getElementById('inboundInput').value = '';
            document.getElementById('color').value = '';

            setNewOutboundStops([]);
            setNewInboundStops([]);

            setShowConfirmation(true); // Show the confirmation modal
            fetchData();
        } else {
            alert('Error adding line');
        }
    }


    // Add/Remove stops
    const addOutboundStop = (e) => {
        e.preventDefault();
        const stopName = document.getElementById('outboundInput').value;
        const id = stops.find((s) => s.name === stopName).id;
        let time = "00:00:00";

        setNewOutboundStops([...newOutboundStops, {"stop": id, "time": time}]);
        console.log(newOutboundStops)
        document.getElementById('outboundInput').value = '';
    }

    const removeOutboundStop = (e) => {
        e.preventDefault();
        const stopId = Number(e.target.closest('tr').children[0].textContent);

        const newStops = newOutboundStops.filter((s) => s.stop !== stopId);
        setNewOutboundStops(newStops);
    }

    const addInboundStop = (e) => {
        e.preventDefault();
        const stopName = document.getElementById('inboundInput').value;
        const id = stops.find((s) => s.name === stopName).id;
        let time = "00:00:00";

        setNewInboundStops([...newInboundStops, {"stop": id, "time": time}]);
        document.getElementById('inboundInput').value = '';
    }

    const removeInboundStop = (e) => {
        e.preventDefault();
        const stopId = Number(e.target.closest('tr').children[0].textContent);

        const newStops = newInboundStops.filter((s) => s.stop !== stopId);
        setNewInboundStops(newStops);
    }

    const changeTimeOutbound = (e) => {
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
        const newStops = newOutboundStops.map((s) => {
            if (s.stop === stopId) {
                s.time = `${hours}:${minutes}:${seconds}`;
            }
            return s;
        });
        setNewOutboundStops(newStops);
        console.log(newOutboundStops);
    }

    const changeTimeInbound = (e) => {
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
        const newStops = newInboundStops.map((s) => {
            if (s.stop === stopId) {
                s.time = `${hours}:${minutes}:${seconds}`;
            }
            return s;
        });
        setNewInboundStops(newStops);
        console.log(newInboundStops);
    }


    return (
        <div>
            <div className="flex flex-row items-center">
                <div>
                    <h1 className="text-4xl font-bold">Lines</h1>
                    <p className="text-xl">Here you can manage the lines</p>
                </div>

                <button className="btn btn-neutral ml-auto mr-8"
                        onClick={() => document.getElementById('addLine_modal').showModal()}>
                    Add line
                </button>
            </div>

            <div className="overflow-x-auto mt-12 containerTable table-pin-rows table-pin-cols">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>First Stop</th>
                        <th>Last Stop</th>
                        <th>color</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(lines).map((line) => {
                        return (
                            <tr key={line.number}>
                                <th>{line.number}</th>
                                <td>{line.name}</td>
                                <td>[{line.firstStop.id}] {line.firstStop.name}</td>
                                <td>[{line.lastStop.id}] {line.lastStop.name}</td>
                                <td>{line.color}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <dialog id="addLine_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg mb-4">Add line</h3>
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

                        {/* Outbound stops */}
                        <h3 className="font-bold text-lg">Outbound stops (ida)</h3>
                        <div className="flex items-center gap-2">
                            <div className="input input-bordered flex items-center gap-2 autocomplete">
                                <input autoComplete="off" id="outboundInput" type="text" className="grow"
                                       placeholder="Stop name" required/>
                            </div>
                            <button className="btn btn-neutral" onClick={addOutboundStop}>Add</button>
                        </div>

                        <table className="table">
                            <thead>
                            <tr>
                                <th>Stop ID</th>
                                <th>Stop Name</th>
                                <th>Location</th>
                                <th>Minutes until next</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {(newOutboundStops).map((stopTime, index) => {
                                let stopId = stopTime.stop;
                                let stop = stops.find((s) => s.id === stopId);
                                let stopName = stop.name;
                                let stopLocation = stop.location;

                                return (
                                    <tr key={newOutboundStops.indexOf(stopTime)}>
                                        <td>{stopId}</td>
                                        <td>{stopName}</td>
                                        <td>{stopLocation}</td>
                                        <td>
                                            <div className="input input-bordered flex items-center gap-2">
                                                <input type="number" placeholder="0" className="w-16"
                                                       disabled={index === newOutboundStops.length - 1}
                                                       onChange={changeTimeOutbound}/>
                                            </div>
                                        </td>
                                        <td>
                                            <button className="btn btn-neutral btn-square"
                                                    onClick={removeOutboundStop}>X
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>


                        {/* Inbound stops */}
                        <h3 className="font-bold text-lg">Inbound stops (volta)</h3>
                        <div className="flex items-center gap-2">
                            <div className="input input-bordered flex items-center gap-2 autocomplete">
                                <input autoComplete="off" id="inboundInput" type="text" className="grow"
                                       placeholder="Stop name" required/>
                            </div>
                            <button className="btn btn-neutral" onClick={addInboundStop}>Add</button>
                        </div>

                        <table className="table">
                            <thead>
                            <tr>
                                <th>Stop ID</th>
                                <th>Stop Name</th>
                                <th>Location</th>
                                <th>Minutes until next</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {(newInboundStops).map((stopTime, index) => {
                                let stopId = stopTime.stop;
                                let stop = stops.find((s) => s.id === stopId);
                                let stopName = stop.name;
                                let stopLocation = stop.location;

                                return (
                                    <tr key={newInboundStops.indexOf(stopTime)}>
                                        <td>{stopId}</td>
                                        <td>{stopName}</td>
                                        <td>{stopLocation}</td>

                                        <td>
                                            <div className="input input-bordered flex items-center gap-2">
                                                <input type="number" placeholder="0" className="w-16"
                                                       disabled={index === newInboundStops.length - 1}
                                                       onChange={changeTimeInbound}/>
                                            </div>
                                        </td>
                                        <td>
                                            <button className="btn btn-neutral btn-square"
                                                    onClick={removeInboundStop}>X
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>


                        <button type="submit" className="btn btn-neutral" onClick={addLine}>Add line</button>
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

            <style>{`
                .containerTable {
                    height: 600px;
                }
            `}</style>
        </div>

    )
}