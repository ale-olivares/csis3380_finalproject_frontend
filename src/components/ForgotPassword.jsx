import React, { useState } from 'react';
import { requestPasswordReset } from '../services/AuthService';
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {

  const [email, setEmail] = useState('');

  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('test here');

    try {

      const response = await requestPasswordReset(email);
      console.log(response);
      if (response.status == 200) {
        //redirect to component with message to confirm password test
        history('/confirmPassword');
        console.log("Password request sent");

      } else {
        console.log("An error occurred");
      }


    } catch (e) {
      console.log(e);
    }


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-4 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold">Forgot Password</h2>
        <p>Please enter the email that you used when you were registered in our website</p>
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br></br>
        <div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm  font-medium rounded-md text-white bg-brightColor hover:bg-hoverColor hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset Password
          </button>


        </div>

      </form>
    </div>
  );
};

export default ForgotPassword;