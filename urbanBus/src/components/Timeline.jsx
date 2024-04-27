import React from 'react'; 
import { useState, useRef } from 'react';
import StopSearchHint from './StopSearchHint.jsx';
import StopListResult from './StopListResult.jsx';
import '../styles/schedules.css';

export default function Timeline() {
	return (
        <div>
            <div className="flex flex-row items-center gap-4">
                <button className="btn btn-circle btn-ghost">
                    <svg className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                </button>
                <p className='text-2xl font-bold'>Horário - Linha 1</p>
            </div>

            <div className="divider my-0"></div>

            <div className='flex flex-row items-center justify-end gap-2 ml-4 mr-2 mb-0 mt-3'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                <p className='text-xl'>1h20m</p>
            </div>


            <ul className="timeline timeline-vertical timeline-compact ml-8">
                <li>
                    <div className="timeline-start">12:40H</div>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 mb-1"><path fillRule="evenodd" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" clipRule="evenodd"/></svg>
                    </div>
                    <div className="timeline-end font-bold h-20 mt-0">Paragem 1</div>
                    <hr />
                </li>

                <li>
                    <div className="timeline-start" >13:00H</div>
                    <div className="timeline-middle" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 mb-1"><path fillRule="evenodd" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" clipRule="evenodd"/></svg>
                    </div>
                    <div className="timeline-end font-bold h-20  mt-0">Paragem 2</div>
                    <hr />
                </li>

                <li>
                    <div className="timeline-start" >13:20H</div>
                    <div className="timeline-middle" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 mb-1"><path fillRule="evenodd" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" clipRule="evenodd"/></svg>
                    </div>
                    <div className="timeline-end font-bold h-20 mt-0">Paragem 3</div>
                    <hr />
                </li>

                <li>
                    <div className="timeline-start" >13:40H</div>
                    <div className="timeline-middle" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 mb-1"><path fillRule="evenodd" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" clipRule="evenodd"/></svg>
                    </div>
                    <div className="timeline-end h-20 font-bold mt-0">Paragem 4</div>
                    <hr />
                </li>

                <li>
                    <div className="timeline-start" >14:00H</div>
                    <div className="timeline-middle" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 mb-1"><path fillRule="evenodd" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" clipRule="evenodd"/></svg>
                    </div>
                    <div className="timeline-end font-bold h-20 mt-0">Paragem 5</div>
                </li>
            </ul>
        </div>
	)
}
