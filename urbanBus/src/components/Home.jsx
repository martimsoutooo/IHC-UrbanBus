import React, { useState } from 'react';
import NextBus from './NextBus.jsx';
import ClosestsCard from './ClosestsCard.jsx';

export default function Home() {
    const warning_message = [
        "Schedules changes - Line 2",
        "Route deviation - Lines 4 e 5",
    ];

    // Randomize the warning message
    const random_warning = Math.floor(Math.random() * warning_message.length);


    const [showClosestsCard, setShowClosestsCard] = useState(true);

    const handleNextBusFocus = () => {
        // add class next-bus-container to the parent div
        compNextBus.classList.add('next-bus-container');

        setShowClosestsCard(false);
    };

    const handleNextBusBlur = () => {
        // remove class next-bus-container from the parent div
        compNextBus.classList.remove('next-bus-container');

        setShowClosestsCard(true);
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Warnings</h1>
            <div role="alert" className="alert alert-warning grid-flow-col mt-4 text-start justify-items-start">
                <span><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></span>
                <span id="warning" className="w-full text-nowrap overflow-x-auto">{warning_message[random_warning]}</span>
            </div>

            <div className='mt-12'>
                <h1 className="text-2xl font-bold">Next Buses</h1>
                <div id='compNextBus'>
                <NextBus hideCards={handleNextBusFocus} showCards={handleNextBusBlur} />
                </div>
            </div>

            {showClosestsCard && (
                <div className='mt-24'>
                    <h1 className="text-2xl font-bold mb-4">Closest Stops</h1>
                    <ClosestsCard />
                </div>
            )}

            <style jsx>{`
                .next-bus-container {
                    height: calc(100vh - 21rem); /* Adjust to ensure it doesn't surpass the navbar */
                    overflow-y: auto;
                }
            `}</style>
        </div>
    );
}
