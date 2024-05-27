import React, { useState } from 'react';
import NextBus from './NextBus.jsx';
import ClosestsCard from './ClosestsCard.jsx';

export default function Home(props) {
    const warning_message = [
        "Schedules changes - Line 2",
        "Route deviation - Lines 4 e 5",
    ];

    // Randomize the warning message
    const random_warning = Math.floor(Math.random() * warning_message.length);

    // State to manage the focus
    const [isNextBusFocused, setIsNextBusFocused] = useState(false);

    // Event handlers for focus and blur
    const handleNextBusFocus = () => {
        setIsNextBusFocused(true);
    };

    const handleNextBusBlur = () => {
        setIsNextBusFocused(false);
    };

    return (
        <div className="flex flex-col container">
            <h1 className="text-2xl font-bold">Warnings</h1>
            <div role="alert" className="alert alert-warning grid-flow-col mt-4 text-start justify-items-start">
                <span><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></span>
                <span id="warning" className="w-full text-nowrap overflow-x-auto">{warning_message[random_warning]}</span>
            </div>

            <h1 className="text-2xl font-bold mt-8">Next Buses</h1>
            <div onFocus={handleNextBusFocus} onBlur={handleNextBusBlur} className="next-bus-container">
                <NextBus client:load />
            </div>

            {!isNextBusFocused && (
                <div>
                    <h1 className="text-2xl font-bold">Closest Stops</h1>
                    <ClosestsCard />
                </div>
            )}

            <style jsx>{`
                .container {
                    height: calc(100vh - 10rem); /* Adjusted to include padding and margin */
                    overflow: hidden;
                }
                .next-bus-container {
                    height: calc(100vh - 19rem); /* Adjust to ensure it doesn't surpass the navbar */
                    overflow-y: auto;
                }
            `}</style>
        </div>
    );
}
