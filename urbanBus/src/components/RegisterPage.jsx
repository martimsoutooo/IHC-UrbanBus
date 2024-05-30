export default function RegisterPage() {
    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Register");
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const nif = document.getElementById('nif').value;
        const password = document.getElementById('password').value;

        console.log(JSON.stringify({
            name: name,
            email: email,
            nif: nif,
            password: password,
        }));

        const response = await fetch(baseURL + '/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                nif: nif,
                password: password,
            })
        });
    }

    return (
        <div className="flex flex-col h-full justify-center">
            <h1 className="text-4xl font-bold">Register</h1>
            <p className="text-xl mb-10">Please enter your credentials</p>

            <div className="form-control w-full">
                <label id="nameInput" className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4 opacity-60">
                        <path
                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                    </svg>
                    <input id="name" type="text" className="grow" placeholder="username"/>
                </label>
            </div>
            <div className="form-control w-full">
                <label id="EmailInput" className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="w-4 h-4 opacity-60">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                    </svg>
                    <input id="email" type="email" className="grow" placeholder="Email"/>
                </label>
            </div>
            <div className="form-control w-full">
                <label id="EmailInput" className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="w-4 h-4 opacity-60">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                    </svg>
                    <input id="nif" type="text" className="grow" placeholder="NIF"/>
                </label>
            </div>
            <div className="form-control w-full">
                <label id="PasswordInput" className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="w-4 h-4 opacity-60">
                        <path fillRule="evenodd"
                              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"/>
                    </svg>
                    <input id="password" type="password" className="grow" placeholder="Password"/>
                </label>
            </div>
            <button className="btn btn-neutral w-full mt-4" onClick={handleRegister}>Register</button>
        </div>
    )
}