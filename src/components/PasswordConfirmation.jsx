import React from 'react';

const PasswordConfirmation = () => {

    //after this step the user has to login in again with the temporary password and it shoudld be redirected to the 
    //set password component to enter twice the password and confirm it 

    return (
        <div className="min-h-screen text-center justify-center bg-gray-50 py-12 px-4 sm:px-4 lg:px-8">
            <h2 className="text-2xl font-semibold">Password request sent!</h2>
            <br />
            <p>
                A password request has been set to the email that you have entered.<br></br> You can try to log in
                with the temporary password that you've received and you can set up a new one after that.
            </p>
            <br></br>
        </div>
    )


}

export default PasswordConfirmation;