import { useState } from 'react';
import Nav from './Nav.jsx';
import SubPageLeft from './SubPageLeft.jsx';

export default function Temp() {

    const [currentPage, setCurrentPage] = useState('Home');

    return (
        <div>
            <Nav setCurrentPage={setCurrentPage}/>

            <div className="flex flex-row h-full px-6 pt-16">
                <SubPageLeft currentPage={currentPage} setCurrentPage={setCurrentPage}/>

                <div className="mockup-phone min-w-fit h-fit">
                    <div className="camera"></div> 
                    <div className="display">
                        <div className="artboard artboard-demo phone-2">
                            <iframe className="h-full w-full" src="/app" title="urbanBus App"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}