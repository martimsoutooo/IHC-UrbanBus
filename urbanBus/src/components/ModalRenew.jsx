import React from 'react';
import { useState } from 'react';
import { baseURL } from './consts/config.js';

export default function ModalRenew() {
    const items = [
        { name: '30 days', price: '11€' },
        { name: '90 days', price: '30€' },
        { name: '365 days', price: '100€' }
    ];

    const handleRenovation = (e) => {
        setSelectedItem(items.find(item => item.name === e.target.value));
    }

    const [selectedItem, setSelectedItem] = useState(items[0]);

    const handlePaymentMethod = (e) => {
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
    const [choosenPaymentMethod, setChoosenPaymentMethod] = useState("MBway");

    const handlePay = () => {
        // verify if the input is valid
        let input = '';
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

        createTicket();

        const payment = document.getElementById('Payment');
        const confirm = document.getElementById('Confirm');
        payment.classList.add('hidden');
        confirm.classList.remove('hidden');
    }

    const createTicket = async () => {
        const response = await fetch(baseURL + '/api/v1/tickets/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: selectedItem.name,
                price: selectedItem.price,
                info: askedInfo
            })
        });

        if (response.status === 201) {
            alert('Ticket created successfully');
        } else {
            alert('Error creating ticket');
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
                        <p className="text-md font-bold text-neutral basis-1/3 my-auto ml-6">Renovation:</p>
                        <select className="select select-bordered text-base basis-2/3" onChange={handleRenovation} name="" id="">
                            {items.map((item, index) => (
                                <option key={index} value={item.name}>{item.name} - {item.price}</option>
                            ))}
                        </select>
                    </div>

                    <select className="select select-bordered text-lg" onChange={handlePaymentMethod}>
                        <option value="Select Payment Method" disabled selected>Select Payment Method</option>
                        <option value="MBway">MB Way</option>
                        <option value="Visa">Visa</option>
                        <option value="Paypal">Paypal</option>
                    </select>
                    
                    <div>
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
                    </div>
                    
                    <button className="btn btn-neutral mt-4" onClick={handlePay}>Pay</button>
                </div>
            </div>


            <div id='Confirm' className='hidden'>
                <p className="font-bold text-xl text-neutral">Confirm Payment</p>

                <div className="modal-action flex flex-col">
                    <p></p>
                    <p className='text-lg'>Product: Renovation of {selectedItem.name}</p>
                    <p className='text-lg'>Payment Method: {choosenPaymentMethod}</p>
                    <p className='text-lg'>{infoType}: {askedInfo}</p>
                    <p className='text text-xl font-bold mt-4'>Price: {selectedItem.price}</p>
                </div>

                <a className="btn btn-neutral mt-4 w-full" href='/app/loading'>
                    Confirm
                </a>
            </div>


        </div>
    )
}