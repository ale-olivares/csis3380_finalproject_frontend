import React from "react";
import defaultImageError from '../../assets/img/error.png';

const ErrorComponent = () => {

    return (
        <div className="container pt-40 px-40 pb-40 md:mx-auto min-h-screen">
            <div className="text-center">
                <h1 className="text-5xl font-bold">Ups!</h1>
                <img src={defaultImageError} alt="Success" className="mx-auto mb-6 w-49 h-auto error-cover" />
                <p className="text-lg">Sorry, the page you were looking for can't be found.</p>
            </div>
        </div>
    )

}

export default ErrorComponent;