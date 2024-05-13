import React from 'react';
import { useState, useEffect } from 'react';

export default function StopListResult(props) {
	const [line, setLine] = useState(props.line);

	return (
        <div className="flex flex-row items-center gap-4">
            <button className="btn btn-circle btn-ghost">
                <a href='/app/schedules'>
                    <svg className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                </a>
            </button>
            <p className='text-2xl font-bold'>{line} - Trips</p>
        </div>
	);
}
