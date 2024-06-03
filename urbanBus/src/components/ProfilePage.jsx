import React from 'react';
import ModalRenew from './ModalRenew';
import { baseURL } from './consts/config.js';

export default function ProfilePage() {
    const [ userData, setUserData ] = React.useState({});
    const [ tickets, setTickets ] = React.useState([]);

    React.useEffect(() => {
        // Check if the user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/app/login';
        }
        else {
            // Get user data
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        const response = await fetch(baseURL + '/api/v1/user', {
            method: 'POST',
            headers: {
                "Authorization": token
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            setUserData(data);

            fetchTicketsData(token);
        } else if (response.status === 401) {
            window.location.href = '/app/login';
        }
        else {
            alert('Error fetching user data');
        }
    }

    const fetchTicketsData = async (token) => {
        const response = await fetch(baseURL + '/api/v1/myTickets', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log('mytickets',data);
            setTickets(data);
        }
        else {
            alert('Error fetching tickets data');
        }
    }

    const createTicket = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token');
        const response = await fetch(baseURL + '/api/v1/tickets/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({
                type: document.getElementById("type").value,
                zone: document.getElementById("zone").value,
            })
        });

        if (response.status === 201) {
            alert('Ticket created successfully');
            closeCreatePassModal();
            document.getElementById('type').value = 'Select Type';
            document.getElementById('zone').value = 'Select Zone';
            fetchTicketsData(token);
        }
        else {
            alert('Error creating ticket');
        }
    }

    function showMyPassModal() {
        const modal = document.getElementById('MyPassModal');
        modal.showModal();
    }

    function showRenewModal() {
        const modal = document.getElementById('RenewModal');
        modal.showModal();
    }

    function showCreatePassModal() {
        const modal = document.getElementById('CreatePassModal');
        modal.showModal();
    }

    function closeCreatePassModal() {
        const modal = document.getElementById('CreatePassModal');
        modal.close();
    }

    function handleLogOut() {
        localStorage.removeItem('token');
        window.location.href = '/app';
    }

    return (
        <div>
            <div className="flex mt-8 mb-6 rounded-xl bg-neutral">
                <div className="flex ml-6">
                    <div className="avatar placeholder my-auto">
                        <div className="bg-gray-400 text-neutral-content rounded-full w-20 h-20">
                            <span className="text-3xl">{userData.name ? userData.name[0] : ''}</span>
                        </div>
                    </div>
                    <div>
                        <div className="my-7">
                            <h1 className="text-sm font-bold ml-6 text-white">{userData.name}</h1>
                            <h1 className="text-sm font-bold ml-6 text-white">{userData.email}</h1>
                            <h1 className="text-sm font-bold ml-6 text-gray-500">Client</h1>
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn btn-neutral rounded-xl mt-2 w-full" onClick={showMyPassModal}><i
                className="fa-solid fa-ticket"></i>My Passes
            </button>
            <button className="btn btn-neutral rounded-xl mt-2 w-full" onClick={showCreatePassModal}>
                <i className="fa-solid fa-circle-plus"></i>Create Pass
            </button>
            <div className="btn btn-neutral flex h-12 rounded-xl mt-2 " onClick={showRenewModal}>
                <div className="mx-auto flex">
                    <i className="fa-solid fa-credit-card text-white my-auto"></i>
                    <h1 className="text-md font-bold text-white ml-2 my-auto">Renew Pass</h1>
                </div>
            </div>
            <button className="btn btn-neutral flex h-12 rounded-xl mt-2 w-full" onClick={handleLogOut}>
                <div className="mx-auto flex">
                    <i className="fa-solid fa-arrow-right-from-bracket text-white my-auto"></i>
                    <h1 className="text-md font-bold text-white ml-2 my-auto">Log Out</h1>
                </div>
            </button>


            <dialog id="MyPassModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    {tickets.map((ticket, index) => (
                        <div key={index} className="collapse collapse-arrow bg-base-200 my-4">
                            <input type="radio" name="my-accordion-1"/>
                            <div className="collapse-title text-xl font-medium">
                                {ticket.id} - {ticket.type} Z{ticket.zone}
                            </div>
                            <div className="collapse-content">
                                <div className="bg-neutral rounded-xl mt-4 w-full text-white">
                                    <div className="w-full h-full mx-2 pb-2">
                                        <div className="mt-4 flex flex-row">
                                            <div className="btn btn-ghost text-xl justify-start mt-8 ml-4 basis-1/2">
                                                urbanBus.
                                            </div>
                                            <div className="avatar placeholder justify-end basis-1/2 mr-10 mt-6">
                                                <div className="bg-gray-400 text-neutral-content rounded-full w-16 h-16">
                                                    <span className="text-3xl">{userData.name ? userData.name[0] : ''}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col pr-4 basis-full justify-items-center">
                                            <h1 className="text-sm rounded-md bg-white font-bold text-neutral text-left w-11/12 mx-auto mt-6 pl-2">Name {userData.name}</h1>
                                            <h1 className="text-sm rounded-md bg-white font-bold text-neutral mt-2 text-left mx-auto w-11/12 pl-2">ID {ticket.id}</h1>
                                            <h1 className="text-sm rounded-md bg-white font-bold text-neutral mt-2 text-left mx-auto w-11/12 pl-2">{ticket.type === 'trips' ? 'Trips ' + ticket.trips : 'Val ' + ticket.expiration}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="CreatePassModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <p className="font-bold text-xl text-neutral">Create Pass</p>
                    <div className="modal-action flex flex-col">
                        <form className="flex flex-col gap-4">
                            <div className="flex flex-row mb-8">
                                <p className="text-md font-bold text-neutral basis-1/3 my-auto ml-6">Type:</p>
                                <select id="type" className="select select-bordered text-base basis-2/3">
                                    <option value="Select Type" disabled selected>Select Type</option>
                                    <option value="trips">Trips</option>
                                    <option value="subscription">Subscription</option>
                                </select>
                            </div>
                            <div className="flex flex-row mb-8">
                                <p className="text-md font-bold text-neutral basis-1/3 my-auto ml-6">Zone:</p>
                                <select id="zone" className="select select-bordered text-base basis-2/3">
                                    <option value="Select Zone" disabled selected>Select Zone</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-neutral" onClick={createTicket}>Create</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="RenewModal" className="modal">
                <ModalRenew/>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>


        </div>
    )
}