import React from "react";

const LoadingComponent = () => {

    return (
        <div className="flex gap-4 justify-center items-center w-screen h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            <h1 className="text-2xl">Loading</h1>
        </div>
    

    )
}

export default LoadingComponent;