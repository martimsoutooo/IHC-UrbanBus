import {baseURL} from "./consts/config.js";
import React from "react";

export default function RegisterPage() {

    React.useEffect(() => {
        // Change the opacity of the svg when the input is focused
        changeSvgOpacity();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Register");
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const nif = document.getElementById('nif').value;
        const password = document.getElementById('password').value;

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

        if (response.status === 201 || response.status === 200) {
            alert('Registered successfully');
            // store the token in the local storage
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = '/app';
        } else {
            alert('Error registering');
        }
    }

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
                    <input id="name" type="text" className="grow" placeholder="username" autoComplete="off"/>
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
                    <input id="email" type="email" className="grow" placeholder="Email" autoComplete="off"/>
                </label>
            </div>
            <div className="form-control w-full">
                <label id="EmailInput" className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor"
                         className="w-4 h-4 opacity-60">
                        <path
                            d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"/>
                    </svg>
                    <input id="nif" type="text" className="grow" placeholder="NIF" autoComplete="off"/>
                </label>
            </div>
            <div className="form-control w-full">
                <label id="PasswordInput" className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="w-4 h-4 opacity-60">
                        <path fillRule="evenodd"
                              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"/>
                    </svg>
                    <input id="password" type="password" className="grow" placeholder="Password" autoComplete="off"/>
                </label>
            </div>
            <button className="btn btn-neutral w-full mt-4" onClick={handleRegister}>Register</button>
        </div>
    )
}