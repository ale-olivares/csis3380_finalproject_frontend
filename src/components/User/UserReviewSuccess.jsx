import React from "react";
import { FaTimes } from 'react-icons/fa';

const UserReviewSuccessComponent = ({onClose}) => {

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Thank you for your review</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">We appreciate your feedback!</p>
                </div>
                <button
                    className="absolute top-0 right-0 m-3"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
}

export default UserReviewSuccessComponent;