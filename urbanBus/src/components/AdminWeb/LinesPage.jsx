import React from 'react';
import { baseURL } from './../consts/config.js';
import { autocomplete } from './../consts/autoComplete.js';

export default function LinesPage() {
    const [lines, setLines] = React.useState([]);
    const [stops, setStops] = React.useState([]);
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [newOutboundStops, setNewOutboundStops] = React.useState([]);
    const [newInboundStops, setNewInboundStops] = React.useState([]);
    const stopNames = stops.map((stop) => stop.name);

    React.useEffect(() => {
        // get data from API
        const fetchData = async () => {
            const responseLines = await fetch(baseURL + '/api/v1/lines');
            const dataLines = await responseLines.json();
            setLines(dataLines);

            const responseStops = await fetch(baseURL + '/api/v1/stops');
            const dataStops = await responseStops.json();
            setStops(dataStops);
        }
        fetchData();

        const inp1 = document.getElementById("outboundInput");
        const inp2 = document.getElementById("inboundInput");
        autocomplete(inp1, stopNames);
        autocomplete(inp2, stopNames);
    }, []);

    const addLine = async (e) => {
        e.preventDefault();
        const designation = document.getElementById('designation').value;
        const color = document.getElementById('color').value;

        console.log(JSON.stringify({
            designation: designation,
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
                designation: designation,
                outbound: newOutboundStops,
                inbound: newInboundStops,
                color: color
            })
        });

        if (response.status === 201) {
            const newLine = await response.json();
            setLines([...lines, newLine]);
            document.getElementById('addLine_modal').close();
            document.getElementById('confirmation_modal').showModal();

            document.getElementById('designation').value = '';
            document.getElementById('outboundInput').value = '';
            document.getElementById('inboundInput').value = '';
            document.getElementById('color').value = '';

            setNewOutboundStops([]);
            setNewInboundStops([]);

            setShowConfirmation(true); // Show the confirmation modal
        } else {
            alert('Error adding line');
        }
    }


    // Add/Remove stops
    const addOutboundStop = (e) => {
        e.preventDefault();
        const stopName = document.getElementById('outboundInput').value;
        // get stop id from the name
        const stop = stops.find((s) => s.name === stopName);
        console.log(stop);
        setNewOutboundStops([...newOutboundStops, stop]);
        document.getElementById('outboundInput').value = '';
    }

    const removeOutboundStop = (e) => {
        e.preventDefault();
        const stopId = Number(e.target.closest('tr').children[0].textContent);
        const stop = newOutboundStops.find((s) => s.id === stopId);

        console.log(stop);
        const newStops = newOutboundStops.filter((s) => s.id !== stopId);
        setNewOutboundStops(newStops);
    }

    const addInboundStop = (e) => {
        e.preventDefault();
        const stopName = document.getElementById('inboundInput').value;
        // get stop id from the name
        const stop = stops.find((s) => s.name === stopName);
        console.log(stop);
        setNewInboundStops([...newInboundStops, stop]);
        document.getElementById('inboundInput').value = '';
    }

    const removeInboundStop = (e) => {
        e.preventDefault();
        const stopId = Number(e.target.closest('tr').children[0].textContent);
        const stop = newInboundStops.find((s) => s.id === stopId);

        console.log(stop);
        const newStops = newInboundStops.filter((s) => s.id !== stopId);
        setNewInboundStops(newStops);
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

            <dialog id="addLine_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg mb-4">Add line</h3>
                    <div className="flex flex-col gap-4">
                        <label className="input input-bordered flex items-center gap-2">
                            Designation
                            <input id="designation" type="text" className="grow" placeholder="L1" required/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Color
                            <input id="color" type="text" className="grow"
                                   placeholder="#RRGGBB" required/>
                        </label>

                        {/* Outbound stops */}
                        <h3 className="font-bold text-lg">Outbound stops</h3>
                        <div className="flex items-center gap-2">
                            <div className="input input-bordered flex items-center gap-2 autocomplete">
                                <input id="outboundInput" type="text" className="grow" placeholder="Stop name" required/>
                            </div>
                            <button className="btn btn-neutral" onClick={addOutboundStop}>Add</button>
                        </div>

                        <table className="table">
                            <thead>
                            <tr>
                                <th>Order</th>
                                <th>Stop ID</th>
                                <th>Stop Name</th>
                                <th>Location</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {(newOutboundStops).map((stop) => {
                                return (
                                    <tr key={newOutboundStops.indexOf(stop)}>
                                        <td>{newOutboundStops.indexOf(stop) + 1}</td>
                                        <td>{stop['name']}</td>
                                        <td>{stop['location']}</td>
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
                        <h3 className="font-bold text-lg">Inbound stops</h3>
                        <div className="flex items-center gap-2">
                            <div className="input input-bordered flex items-center gap-2 autocomplete">
                                <input id="inboundInput" type="text" className="grow" placeholder="Stop name" required/>
                            </div>
                            <button className="btn btn-neutral" onClick={addInboundStop}>Add</button>
                        </div>

                        <table className="table">
                            <thead>
                            <tr>
                                <th>Order</th>
                                <th>Stop ID</th>
                                <th>Stop Name</th>
                                <th>Location</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {(newInboundStops).map((stop) => {
                                    return (
                                        <tr key={newInboundStops.indexOf(stop)}>
                                            <td>{newInboundStops.length + newInboundStops.indexOf(stop)+1}</td>
                                            <td>{stop['id']}</td>
                                            <td>{stop['name']}</td>
                                            <td>{stop['location']}</td>
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
                    </div>
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


            <div className="overflow-x-auto mt-12 containerTable table-pin-rows table-pin-cols">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>number</th>
                        <th>designation</th>
                        <th>idFirstStop</th>
                        <th>idLastStop</th>
                        <th>color</th>
                    </tr>
                    </thead>
                    {/* body */}
                    <tbody>
                    {(lines).map((line) => {
                        return (
                            <tr key={line.number}>
                                <th>{line.number}</th>
                                <td>{line.designation}</td>
                                <td>{line.idFirstStop}</td>
                                <td>{line.idLastStop}</td>
                                <td>{line.color}</td>
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
                
                .autocomplete {
                    /*the container must be positioned relative:*/
                    position: relative;
                }
                
                .autocomplete-items {
                    position: absolute;
                    z-index: 99;
                    /*position the autocomplete items to be the same width as the container:*/
                    top: 100%;
                    left: 0;
                    right: 0;
                    height: 140px;
                    overflow-y: auto;
                    border: 1px solid #d4d4d4;
                    border-left: none;
                    border-right: none;
                    border-bottom: none;
                }
                
                .autocomplete-items div {
                    padding: 10px;
                    cursor: pointer;
                    background-color: #fff;
                    border: 1px solid #d4d4d4;
                }
                
                .autocomplete-items div:hover {
                    /*when hovering an item:*/
                    background-color: #e9e9e9;
                }
                
                .autocomplete-active {
                    /*when navigating through the items using the arrow keys:*/
                    background-color: DodgerBlue !important;
                    color: #ffffff;
                }
            `}</style>
        </div>

    )
}