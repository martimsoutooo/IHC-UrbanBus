import React from 'react';
import HomePage from './HomePage.jsx';
import StopsPage from './StopsPage.jsx';
import LinesPage from './LinesPage.jsx';
import TicketsPage from './TicketsPage.jsx';
import ClientsPage from './ClientsPage.jsx';
import ValidationsPage from './ValidationsPage.jsx';

function showStopsPage() {
    document.getElementById('Home').classList.add('hidden');
    document.getElementById('Stops').classList.remove('hidden');
}

function showLinesPage() {
    document.getElementById('Home').classList.add('hidden');
    document.getElementById('Lines').classList.remove('hidden');
}

function showTicketsPage() {
    document.getElementById('Home').classList.add('hidden');
    document.getElementById('Tickets').classList.remove('hidden');
}

function showClientsPage() {
    document.getElementById('Home').classList.add('hidden');
    document.getElementById('Clients').classList.remove('hidden');
}

function showValidationsPage() {
    document.getElementById('Home').classList.add('hidden');
    document.getElementById('Validations').classList.remove('hidden');
}

export default function SubPageLeft() {
    return (
        <div className="w-full ml-8 mr-8 mt-6">
            <div id="Home">
                <HomePage client:load showStops={showStopsPage} showLines={showLinesPage} showTickets={showTicketsPage} showClients={showClientsPage} showValidations={showValidationsPage} />
            </div>
            <div id="Stops" className="hidden">
                <StopsPage />
            </div>
            <div id="Lines" className="hidden">
                <LinesPage />
            </div>
            <div id="Tickets" className="hidden">
                <TicketsPage />
            </div>
            <div id="Clients" className="hidden">
                <ClientsPage />
            </div>
            <div id="Validations" className="hidden">
                <ValidationsPage />
            </div>
        </div>
    )
}