import {baseURL} from "./consts/config.js";

export default function LoginPage() {
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login");
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log(JSON.stringify({
            email: email,
            password: password
        }));

        const response = await fetch(baseURL + '/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.status === 201) {

        } else {
            alert('Error logging in');
        }
    }


    // Change the opacity of the svg when the input is focused
    function changeSvgOpacity() {
        const svg = document.querySelectorAll('label');
        svg.forEach((element) => {
            let isSelected = false;

            // on focus
            element.querySelector('input').addEventListener('focus', () => {
                isSelected = true;
                element.querySelector('svg').style.opacity = '100%';
            });

            // on focus out
            element.querySelector('input').addEventListener('blur', () => {
                isSelected = false;
                element.querySelector('svg').style.opacity = '60%';
            });

            // while hovering
            element.addEventListener('mouseover', () => {
                if (!isSelected) {
                    element.querySelector('svg').style.opacity = '80%';
                }
            });

            element.addEventListener('mouseout', () => {
                if (!isSelected) {
                    element.querySelector('svg').style.opacity = '60%';
                }
            });
        });
    }


    return (
        <div className="mt-10 h-4/6">
            <h1 className="text-4xl font-bold">Login</h1>
            <p className="text-xl">Please enter your credentials</p>

            <form className="flex flex-col h-full">
                <div className="form-control my-auto">
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

                    <label id="PasswordInput" className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                             className="w-4 h-4 opacity-60">
                            <path fillRule="evenodd"
                                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"/>
                        </svg>
                        <input id="password" type="password" className="grow" placeholder="Password"/>
                    </label>

                    <div className="flex justify-between items-center">
                        <a href="./register" className="link">Create an account</a>
                    </div>
                </div>

                <div className="form-control mt-auto">
                    <label className="label cursor-pointer">
                        <span className="label-text">Remember me</span>
                        <input type="checkbox" checked="checked" className="checkbox"/>
                    </label>
                </div>
                <button className="btn btn-neutral w-full" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}