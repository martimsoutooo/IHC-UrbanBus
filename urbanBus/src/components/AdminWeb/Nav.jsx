export default function Nav(props) {


    return (
        <div class="navbar bg-neutral text-neutral-content md:flex">
            <div class="navbar-start">
                <a class="btn btn-ghost text-xl"> 
                urbanBus.
                </a>
            </div>
            <div class="navbar-center md:flex">
                <ul class="menu menu-horizontal px-1">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/">Stops</a>
                    </li>
                    <li>
                        <a href="/">Lines</a>
                    </li>
                    <li>
                        <a href="/">Tickets</a>
                    </li>
                    <li>
                        <a href="/">Accounts</a>
                    </li>
                    <li>
                        <a href="/">Validations</a>
                    </li>
                </ul>
            </div>
                <div class="navbar-end">
                </div>
        </div>
    )
}