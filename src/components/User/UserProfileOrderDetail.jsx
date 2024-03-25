import React, { useEffect, useState } from "react";

const UserProfileOrderDetailComponent = ({ order }) => {

    const [subtotal, setSubtotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [total, setTotal] = useState(0);

    // Format the creation date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const calculateSubtotal = () => {
        let newSubtotal = 0;

        if (order && order.items.length > 0) {
            order.items.forEach((item) => {
                newSubtotal += (parseInt(item.quantity) * parseFloat(item.unit_price));
            });
        }

        setSubtotal(newSubtotal);
    };

    const calculateTaxes = () => {
        setTaxes(subtotal * 0.13);
    };

    const calculateTotal = () => {
        setTotal(subtotal + taxes);
    };

    useEffect(() => {
        calculateSubtotal();
    }, [order]);

    useEffect(() => {
        calculateTaxes();
    }, [subtotal]);

    useEffect(() => {
        calculateTotal();
    }, [subtotal, taxes]);

    if (!(order && order.items)) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800">Order Number: {order.order_number.toString().padStart(10,'0')}</h2>
                <div className="mt-4 text-gray-600">
                    <p><strong>Order Status:</strong> {order.order_status}</p>
                    <p><strong>Order Date:</strong> {formatDate(order.created_at)}</p>
                </div>

                <h3 className="text-xl font-semibold mt-6 text-gray-800">Items Ordered:</h3>
                <div className="mt-4">
                    <table className="table-auto w-full text-left">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg">
                                <th className="px-4 py-2 rounded-l-lg">Product</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Unit Price</th>
                                <th className="px-4 py-2 rounded-r-lg">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => (
                                <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <td className="px-4 py-2">
                                        {item.product.name}
                                        <br />
                                        {item.grind_type.name}
                                        <br />
                                        {item.product_subtype.name}</td>
                                    <td className="px-4 py-2">{item.quantity}</td>
                                    <td className="px-4 py-2">${item.unit_price}</td>
                                    <td className="px-4 py-2">${(item.quantity * item.unit_price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mt-10">
                    <div className="w-1/3">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Taxes</span>
                            <span>${taxes.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfileOrderDetailComponent;
