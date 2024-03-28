import React, { useState } from 'react';

const ConfirmPassword = () => {

    return (
        <div className="min-h-screen items-center mt-7 text-center bg-gray-50 py-9 px-4 sm:px-4 lg:px-3">
            <h2 className="text-2xl font-semibold">Request password sent</h2>
            <br />
            <p>You have submitted a password change request.</p>
            <p>A password recovery link has been sent to you by email. <br />When you receive it, click the link
                to open a window where you can enter a new password.
            </p>

        </div>

    )

};

export default ConfirmPassword;