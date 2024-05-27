import HomePage from './HomePage.jsx';
import StopsPage from './StopsPage.jsx';
import LinesPage from './LinesPage.jsx';
import TicketsPage from './TicketsPage.jsx';
import ClientsPage from './ClientsPage.jsx';
import ValidationsPage from './ValidationsPage.jsx';


export default function SubPageLeft({ currentPage, setCurrentPage }) {
    
    return (
        <div className="w-full ml-8 mr-8 mt-6">
            <StopsPage />
            {/*
            {currentPage === 'Home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'Stops' && <StopsPage />}
            {currentPage === 'Lines' && <LinesPage />}
            {currentPage === 'Tickets' && <TicketsPage />}
            {currentPage === 'Clients' && <ClientsPage />}
            {currentPage === 'Validations' && <ValidationsPage />}
    */}
        </div>
    )
}