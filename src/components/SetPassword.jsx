import React, { useState } from 'react';
import { setNewPassword } from '../services/AuthService';

const SetPassword = () => {

    const [password, setPassword] = useState('');

    async function changePassword(e) {
        e.preventDefault();
        try {

            const passwordResponse = await setNewPassword(password);
            setMessage(passwordResponse.message);


        } catch (e) {
            console.log(e);
        }
        console.log("Password changed successfully");


    };

    return (
        <div className="min-h-screen text-center justify-center bg-gray-50 py-12 px-4 sm:px-4 lg:px-8">
            <h2 className="text-2xl font-semibold">Enter your new password</h2>
            <br />
            <p>Please enter your new password for your account:</p>
            <br />
            <form className="space-y-4" onSubmit={changePassword}>
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

            </form>

        </div>

    )

};

export default SetPassword;