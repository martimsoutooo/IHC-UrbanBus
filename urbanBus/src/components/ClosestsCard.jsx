import React from 'react';
import { useState, useEffect } from 'react';

export default function ClosestsCard(props) {
    const closestStops = [
        {id: 1, name: 'Tanques de Esgueira A', location: 'blablabla'},
        {id: 2, name: 'Escola Jaime Magalhães', location: 'blablabla'},
        {id: 3, name: 'R. Luís G. Carvalho', location: 'blablabla'},
    ];



    return (
        <div className='flex flex-col gap-3'>
            {closestStops.map((stop, index) => {
                return (
                    <div className="card w-full bg-base-100 card-bordered card-compact">
                        <a href={"/app?search=" + stop.name}>
                            <div className="card-body flex flex-row">
                                <div className="basis-3/4 ml-2">
                                    <h2 className="card-title">{stop.name}</h2>
                                    <p>Location - {stop.location}</p>
                                </div>
                                <div className="card-actions basis-1/4 justify-end">
                                    <button className="btn btn-ghost btn-circle">
                                        <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#000000"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>
                )
            })}
        </div>
    )
}