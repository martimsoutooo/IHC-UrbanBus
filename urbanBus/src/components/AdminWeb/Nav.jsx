export default function Nav({ setCurrentPage }) {

    return (
        <div className="navbar bg-neutral text-neutral-content md:flex">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl" onClick={() => setCurrentPage('Home')}>urbanBus.</a>
            </div>
            <div className="navbar-center md:flex">
                <ul className="menu menu-horizontal px-1">
                    <li onClick={() => setCurrentPage('Home')}>
                        <a>Home</a>
                    </li>
                    <li onClick={() => setCurrentPage('Stops')}>
                        <a>Stops</a>
                    </li>
                    <li onClick={() => setCurrentPage('Lines')}>
                        <a>Lines</a>
                    </li>
                    <li onClick={() => setCurrentPage('Tickets')}>
                        <a>Tickets</a>
                    </li>
                    <li onClick={() => setCurrentPage('Clients')}>
                        <a>Clients</a>
                    </li>
                    <li onClick={() => setCurrentPage('Validations')}>
                        <a>Validations</a>
                    </li>
                    <li onClick={() => setCurrentPage('Journeys')}>
                        <a>Journeys</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
            </div>
        </div>
    )
}