import React, { useState } from 'react';
import Nav from './Nav.jsx';
import SubPageLeft from './SubPageLeft.jsx';

export default function Temp() {

    const [currentPage, setCurrentPage] = useState('Home');

    return (
        <div>
            <Nav setCurrentPage={setCurrentPage}/>

            <div class="flex flex-row h-full px-6 pt-16">
                <SubPageLeft currentPage={currentPage} setCurrentPage={setCurrentPage}/>

                <div class="mockup-phone min-w-fit h-fit">
                    <div class="camera"></div> 
                    <div class="display">
                        <div class="artboard artboard-demo phone-2">
                            <iframe src="/app" class="h-full w-full" title="urbanBus App"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}