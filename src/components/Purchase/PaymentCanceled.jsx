import React from "react";
import defaultImageCanceled from '../../assets/img/canceled.png';

const PaymentCanceledComponent = () => {

    return (
        <div className="container pt-40 px-40 pb-40 md:mx-auto min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Payment Canceled</h1>
                <img src={defaultImageCanceled} alt="Success" className="mx-auto mt-6 mb-6 w-48 h-auto object-cover" />
                <p className="text-lg">Your payment has been canceled.</p>
            </div>
        </div>
    )

}

export default PaymentCanceledComponent;