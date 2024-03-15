import React, { useEffect, useState } from "react";
import { getPurchaseOrder as getPurchaseOrderService } from '../../services/OrderService';

const PaymentCanceledComponent = () => {

    const [purchaseOrder, setpurchaseOrder] = useState({ items: [] });

    // Format the creation date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {

        const userId = '65f3913e01f56991cc55c6dd';
        const orderId = '65f3947d580d6c30fa8427e0';

        const getPurchaseOrder = async (userId, orderId) => {
            const response = await getPurchaseOrderService(userId, orderId);
            setpurchaseOrder(response);
        }

        getPurchaseOrder(userId, orderId);

    }, []);

    /*
    return (
        <div className="container pt-40 px-40 pb-40 md:mx-auto min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Payment Canceled</h1>
                <p className="text-lg">Your payment has been canceled.</p>
            </div>
        </div>
    )
    */
    return (
        <div className="container pt-40 px-40 pb-40 md:mx-auto min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Payment Success</h1>
                <p className="text-lg">Your payment has been successful.</p>
            </div>
            {
                !purchaseOrder ? (
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold">Order Details:</h2>
                        <div className="mt-4">
                            <p><strong>Order Status:</strong> {purchaseOrder.order_status}</p>
                            <p><strong>Order Date:</strong> {formatDate(purchaseOrder.created_at)}</p>
                            <p><strong>Stripe Session ID:</strong> {purchaseOrder.stripe_session_id}</p>
                        </div>

                        <h3 className="text-xl font-semibold mt-6">Items Ordered:</h3>
                        <div className="mt-4">
                            <table className="table-auto w-full text-left">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2">Product</th>
                                        <th className="px-4 py-2">Quantity</th>
                                        <th className="px-4 py-2">Unit Price</th>
                                        <th className="px-4 py-2">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchaseOrder.items.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-4 py-2">Product Name Placeholder</td> {/* Replace placeholder as needed */}
                                            <td className="px-4 py-2">{item.quantity}</td>
                                            <td className="px-4 py-2">${item.unit_price}</td>
                                            <td className="px-4 py-2">${item.quantity * item.unit_price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) :
                (
                    <h1>Hello</h1>
                )
            }
            
        </div>
    );
}

export default PaymentCanceledComponent;