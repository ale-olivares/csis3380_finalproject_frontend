import React, { useState } from 'react';
import { setNewPassword, getCurrentUser } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';


const SetPassword = () => {

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');

    const user = getCurrentUser();

    const history = useNavigate();


    async function changePassword(e) {
        e.preventDefault();
        try {

            //Passing user id to change password 
            //if passwords match
            console.log(password1);
            console.log(password2);

            if (password1 == password2) {

                const password = password1;
                const passwordResponse = await setNewPassword(user.id, password);
                console.log(passwordResponse);
                if (passwordResponse.status == 200) {
                    //redirect to home to log in again
                    history('/');
                    console.log(passwordResponse.message);
                } else {
                    console.log("An error occurred");
                }

            } else {
                setMessage("Passwords don't match. Please try again");
            }

        } catch (e) {
            console.log(e);
        }


    };

    return (
        <div className="min-h-screen text-center justify-center bg-gray-50 py-12 px-4 sm:px-4 lg:px-8">
            <h2 className="text-2xl font-semibold">Enter your new password</h2>
            <br />
            <p>Please enter your new password for your account:</p>

            <form className="mt-8 space-y-6" onSubmit={changePassword}>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="mt-1 p-2 w-1/4 border rounded-md"
                        placeholder="Password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password2" className="sr-only">Password</label>
                    <input
                        id="password2"
                        name="password2"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="mt-1 p-2 w-1/4 border rounded-md"
                        placeholder="Repeat password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative w-1/5 justify-center  py-2 px-4 border border-transparent text-sm  font-medium rounded-md text-white bg-brightColor hover:bg-hoverColor hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Change Password
                    </button>
                </div>
                <p>{message}</p>
            </form>

        </div>

    )

};

export default SetPassword;