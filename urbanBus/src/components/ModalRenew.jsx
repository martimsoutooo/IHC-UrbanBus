import React from 'react';
import { useState, useEffect } from 'react';
import { baseURL } from './consts/config.js';

export default function ModalRenew() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(items[0]);
    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchTicketsData(token);
        fetchItemsData();
    });

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
            console.log(data);
            setTickets(data);
        }
        else {
            alert('Error fetching tickets data');
        }
    }

    const fetchItemsData = async () => {
        const response = await fetch(baseURL + '/api/v1/prices');
        const data = await response.json();
        console.log(data);
        setItems(data);
    }

    const handleRenovation = (e) => {
        setSelectedItem(items.find(item => item.name === e.target.value));
    }


    /*const handlePaymentMethod = (e) => {
		const mbway = document.getElementById('mbway');
		const visa = document.getElementById('visa');
		const paypal = document.getElementById('paypal');
		mbway.classList.add('hidden');
		visa.classList.add('hidden');
		paypal.classList.add('hidden');
        setChoosenPaymentMethod(e.target.value)
		switch (e.target.value) {
			case 'MBway':
                setInfoType("Phone");
				mbway.classList.remove('hidden');
				break;
			case 'Visa':
                setInfoType("Number");
				visa.classList.remove('hidden');
				break;
			case 'Paypal':
                setInfoType("Email");
				paypal.classList.remove('hidden');
				break;
		}
	}

    const [infoType, setInfoType] = useState("Phone");
    const [askedInfo, setAskedInfo] = useState("987654321");
    const [choosenPaymentMethod, setChoosenPaymentMethod] = useState("MBway");*/

    const handlePay = () => {
        // verify if the input is valid
        /*let input = '';
        switch (choosenPaymentMethod) {
            case 'MBway':
                input = document.getElementById('mbwayInput').value;
                break;
            case 'Visa':
                input = document.getElementById('visaInput').value;
                break;
            case 'Paypal':
                input = document.getElementById('paypalInput').value;
                break;
        }
        if (input === '') {
            alert('Invalid input');
            return;
        }
        setAskedInfo(input);

        const payment = document.getElementById('Payment');
        const confirm = document.getElementById('Confirm');
        payment.classList.add('hidden');
        confirm.classList.remove('hidden');*/

    }

    const chargeTicket = async () => {
        // fetch ticket
        const token = localStorage.getItem('token');
        const item = document.getElementById('itemSelect').value;
        const response = await fetch(baseURL + '/api/v1/ticket' + ticket.id + '/charge', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                item: item
            },
        });

        if (response.ok) {
            alert('Ticket bought successfully');
            fetchData();
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
                    <div className='flex flex-row mb-8'>
                        <p className="text-md font-bold text-neutral basis-1/3 my-auto ml-1">Ticket:</p>
                        <select className="select select-bordered text-base basis-2/3"
                                name="" id="ticketSelect">
                            {tickets.map((ticket, index) => (
                                <option key={index} value={ticket.id}>{ticket.id} - {(ticket.expiration === null && ticket.trips === null) || (ticket.expiration !== null && ticket.trips === null) ? 'Subscription' : 'Trips'}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-row mb-8'>
                        <p className="text-md font-bold text-neutral basis-1/3 my-auto">Renovation:</p>
                        <select className="select select-bordered text-base basis-2/3" id="itemSelect" onChange={handleRenovation}
                                name="" id="">
                            {items.map((item, index) => {
                                if (item.trips !== null) {
                                    return (
                                        <option key={index} value={item.id}>{item.trips} Trips - {item.price}</option>
                                    )
                                } else {
                                    return (
                                        <option key={index} value={item.id}>{item.days} Days - {item.price}</option>
                                    )
                                }
                            })}
                        </select>
                    </div>

                    {/*<div>
                        <div id="mbway" className="hidden">
                            <label className="input input-bordered flex items-center gap-2 mt-2">
                                Phone
                                <input id="mbwayInput" type="tel" className="grow" pattern="[0-9]{9}" placeholder="987 654 321" />
                            </label>
                        </div>
                        
                        <div id="visa" className="hidden">
                            <label className="input input-bordered flex items-center gap-2 mt-2">
                                Number
                                <input id="visaInput" type="tel" className="grow" pattern="[0-9]{16}" placeholder="1234 1234 1234 1234" />
                            </label>
                        </div>
                        
                        <div id="paypal" className="hidden">
                            <label className="input input-bordered flex items-center gap-2 mt-2">
                                Email
                                <input id="paypalInput" type="text" className="grow" pattern="[a-z]+@[a-z]+.[a-z]+" placeholder="urbanBus@bus.com" />
                            </label>
                        </div>
                    </div>*/}

                    <button className="btn btn-neutral mt-4" onClick={handleRenovation}>Pay</button>
                </div>
            </div>
        </div>
    )
}