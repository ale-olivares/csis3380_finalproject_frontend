import React, { useEffect, useState } from "react";
import UserProfileOrderDetailComponent from "./UserProfileOrderDetail";

const UserProfileOrdersComponent = ({ orderItems }) => {

    return (
        <>
            <div className="px-40 pb-40 md:mx-auto min-h-screen bg-gray-50">
                <h1 className="text-2xl font-semibold text-gray-800">User Orders</h1>
                {orderItems && orderItems.length > 0 ? 
                
                    orderItems.map((order, index) => (
                        <div key={index} >
                            <UserProfileOrderDetailComponent order={order} />
                        </div>
                    ))
                    :
                    <div>No orders found</div>
            }
                                
            </div>
        </>
    )
}

export default UserProfileOrdersComponent;
/*

*/