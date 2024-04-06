import React, { useEffect, useState } from "react";
import UserProfileOrderDetailComponent from "./UserProfileOrderDetail";

const UserProfileOrdersComponent = ({ orderItems }) => {

    return (
        <>
            <div className="px-4 md:px-10 lg:px-40 pb-20 md:mx-auto min-h-screen bg-gray-50">
                <h1 className="text-2xl font-semibold text-gray-800 pt-10 pb-5">User Orders</h1>
                {orderItems && orderItems.length > 0 ?
                    orderItems.map((order, index) => (
                        <div key={index} className="mb-5">
                            <UserProfileOrderDetailComponent order={order} />
                        </div>
                    ))
                    :
                    <div className="text-center text-gray-500 mt-10">No orders found</div>
                }
            </div>

        </>
    )
}

export default UserProfileOrdersComponent;
/*

*/