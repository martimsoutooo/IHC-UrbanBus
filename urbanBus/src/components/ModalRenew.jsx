import React from 'react';
import { useState, useEffect } from 'react';
import { baseURL } from './consts/config.js';

export default function ModalRenew() {
    const [items, setItems] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchTicketsData(token);
        fetchItemsData();
    }, []);

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
            setTickets(data);
            console.log("tickets",data);
        }
        else {
            alert('Error fetching tickets data');
        }
    }

    const fetchItemsData = async () => {
        const response = await fetch(baseURL + '/api/v1/prices');
        const data = await response.json();
        setItems(data);
        console.log("items",data);
    }

    const selectTicket = async () => {
        const ticketId = document.getElementById('ticketSelect').value;
        const ticket = tickets.find(ticket => ticket.id == ticketId);

        const ticketType = (ticket.expiration === null && ticket.trips === null) || (ticket.expiration !== null && ticket.trips === null) ? 'Subscription' : 'Trips';
        // filter by type
        let filtered = items.filter(item => item.trips === null || item.trips === ticket.trips);

        // filter by zone
        filtered = filtered.filter(item => item.zone === ticket.zone);
        setFilteredItems(filtered);
    }

    const chargeTicket = async () => {
        // fetch ticket
        const item = document.getElementById('itemSelect').value;
        const ticket = document.getElementById('ticketSelect').value;
        const response = await fetch(baseURL + '/api/v1/ticket/' + ticket + '/charge?item=' + item);

        if (response.ok) {
            alert('Ticket bought successfully');
        } else {
            alert('Error buying ticket');
        }
    }

    return (
        <div className="modal-box">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <div id='Payment' className=''>
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <p className="font-bold text-xl text-neutral">Payment</p>

                <div className="modal-action flex flex-col">
                    <p></p>
                    <select className="select select-bordered text-base mb-8"
                            name="" id="ticketSelect" onChange={selectTicket}>
                        <option disabled selected>Ticket ID - Type Zone</option>
                        {tickets.map((ticket, index) => (
                            <option key={index}
                                    value={ticket.id}>{ticket.id} - {(ticket.expiration === null && ticket.trips === null) || (ticket.expiration !== null && ticket.trips === null) ? 'Subscription' : 'Trips'} Z{ticket.zone}</option>
                        ))}
                    </select>

                    <select className="select select-bordered text-base mb-8" id="itemSelect">
                        <option disabled selected>Renovation</option>
                        {filteredItems.map((item, index) => {
                            if (item.trips !== null) {
                                return (
                                    <option key={index} value={item.id}>{item.trips} Trips - {item.price}€</option>
                                )
                            } else {
                                return (
                                    <option key={index} value={item.id}>{item.days} Days - {item.price}€</option>
                                )
                            }
                        })}
                    </select>

                    <button className="btn btn-neutral mt-4" onClick={chargeTicket}>Pay</button>
                </div>
            </div>
        </div>
    )
}