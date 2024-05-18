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
                        <div className="card-body flex flex-row">
                            <div className="basis-3/4">
                                <h2 className="card-title">{stop.name}</h2>
                                <p>Location - {stop.location}</p>
                            </div>
                            <div className="card-actions basis-1/4 justify-end">
                                <button className="btn btn-primary">Next</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}