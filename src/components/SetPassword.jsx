import React, { useState } from 'react';
import { setNewPassword } from '../services/AuthService';

const SetPassword = () => {

    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const user = getCurrentUser();


    async function changePassword(e) {
        e.preventDefault();
        try {

            //Passing user id to change password 
            const passwordResponse = await setNewPassword(user.id, password);
            setMessage(passwordResponse.message);
            console.log("Password changed successfully");


        } catch (e) {
            console.log(e);
        }


    };

    return (
        <div className="min-h-screen text-center justify-center bg-gray-50 py-12 px-4 sm:px-4 lg:px-8">
            <h2 className="text-2xl font-semibold">Enter your new password</h2>
            <br />
            <p>Please enter your new password for your account:</p>
            <br />
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Repeat Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="mt-1 p-2 w-1/4 border rounded-md"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative w-50 items-center flex justify-center py-2 px-4 border border-transparent text-sm  font-medium rounded-md text-white bg-brightColor hover:bg-hoverColor hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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