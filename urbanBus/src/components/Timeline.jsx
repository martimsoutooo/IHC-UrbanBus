import React from 'react'; 
import { useState, useRef } from 'react';
import '../styles/schedules.css';

export default function Timeline(props) {
    const line = props.choosenLine;

    const stops = [
        {id: 1, name: 'Tanques de Esgueira A', time: '09:00H'},
        {id: 2, name: 'Escola Jaime Magalhães', time: '09:05H'},
        {id: 3, name: 'R. Luís G. Carvalho', time: '09:10H'},
        {id: 4, name: 'Av. Dr. Lourenço Peixinho - CTT B', time: '09:13H'},
        {id: 5, name: 'Av. Dr. Lourenço Peixinho - Capitania B', time: '09:15H'},
        {id: 6, name: 'Caçadores 10 - Misericórdia', time: '09:18H'},
        {id: 7, name: 'Hospital / Universidade A', time: '09:20H'},
        {id: 8, name: 'ISCAUA A', time: '09:23H'},
        {id: 9, name: 'Escolas de Santiago', time: '09:27H'},
        {id: 10, name: 'R. de Ovar', time: '09:30H'},
    ];

    // calculate total time
    const firstStopTime = stops[0].time;
    const lastStopTime = stops[stops.length-1].time;
    const firstStopTimeArray = firstStopTime.split(':');
    const lastStopTimeArray = lastStopTime.split(':');
    const firstStopTimeInMinutes = parseInt(firstStopTimeArray[0]) * 60 + parseInt(firstStopTimeArray[1]);
    const lastStopTimeInMinutes = parseInt(lastStopTimeArray[0]) * 60 + parseInt(lastStopTimeArray[1]);
    const totalTimeInMinutes = lastStopTimeInMinutes - firstStopTimeInMinutes;
    const totalTimeHours = Math.floor(totalTimeInMinutes / 60);
    const totalTimeMinutes = totalTimeInMinutes % 60;
    const totalTime = totalTimeHours + 'h' + totalTimeMinutes + 'm';

	return (
        <div className='overflow-auto'>
            <div className="flex flex-row items-center gap-4">
                <button className="btn btn-circle btn-ghost">
                    <a href='/app/schedules'>
                        <svg className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                    </a>
                </button>
                <p className='text-2xl font-bold'>Line {line} - Timeline</p> 
            </div>

            <div className="divider my-0"></div>

            <div className="pb-16">
                <div className='flex flex-row items-center justify-between gap-2 ml-4 mr-2 mb-6 mt-3'>
                    <div className='flex flex-row items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                        <p className='text-xl'>{totalTime}</p>
                    </div>

                    <div className='flex flex-row items-center gap-2 badge-neutral rounded-lg p-1'>
                        <div className='flex flex-row items-center gap-2'>
                            <p className='text-xl'>{stops[0].time}</p>
                            <p className='text-xl'>-</p>
                            <p className='text-xl'>{stops[stops.length-1].time}</p>
                        </div>
                    </div>
                </div>


                <ul className="timeline timeline-vertical timeline-compact ml-8">
                    {stops.map((stop, index) => {
                        if (index === stops.length - 1) {
                            return (
                                <li>
                                    <div className="timeline-start">{stop.time}</div>
                                        <div className="timeline-middle">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 mb-1"><path fillRule="evenodd" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" clipRule="evenodd"/></svg>
                                        </div>
                                    <div className="timeline-end font-bold h-20 mt-0">{stop.name}</div>
                                </li>
                            );
                        } else {
                            return (
                                <li>
                                    <div className="timeline-start">{stop.time}</div>
                                        <div className="timeline-middle">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 mb-1"><path fillRule="evenodd" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" clipRule="evenodd"/></svg>
                                        </div>
                                    <div className="timeline-end font-bold h-20 mt-0">{stop.name}</div>
                                    <hr />
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </div>
	)
}
