import React, { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa';
import UserAddReviewComponent from "./UserAddReview";
import UserReviewSuccessComponent from "./UserReviewSuccess";

const UserProfileOrderDetailComponent = ({ order }) => {

    const [subtotal, setSubtotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [total, setTotal] = useState(0);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showReviewSuccessModal, setShowReviewSuccessModal] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [productId, setProductId] = useState(null);

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

    // Function to handle opening the review modal
    const openReviewModal = (orderId, productId) => {
        setOrderId(orderId);
        setProductId(productId);
        setShowReviewModal(true);
    };

    // Function to handle closing the review modal
    const closeReviewModal = () => {
        setOrderId(null);
        setProductId(null);
        setShowReviewModal(false);
        openReviewSuccessModal();
    };

    // Function to handle opening the review success modal
    const openReviewSuccessModal = () => {
        setShowReviewSuccessModal(true);
    };

    // Function to handle closing the review modal
    const closeReviewSuccessModal = () => {
        setShowReviewSuccessModal(false);
    };

    if (!(order && order.items)) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="mt-10 p-4 md:p-6 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col md:flex-row justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Order #: {order.order_number.toString().padStart(10, '0')}</h2>
                    <p className={`text-md md:text-lg font-semibold ${order.order_status.toLowerCase() === 'pending' ? 'text-blue-500' :
                        order.order_status.toLowerCase() === 'in process' ? 'text-orange-500' :
                            order.order_status.toLowerCase() === 'delivered' ? 'text-green-500' :
                                order.order_status.toLowerCase() === 'delayed' ? 'text-red-500' : 'text-gray-800'
                        } capitalize`}>
                        {order.order_status}
                    </p>
                </div>
                <div className="mt-4 text-gray-600">
                    <p><strong>Date:</strong> {formatDate(order.created_at)}</p>
                </div>
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full table-auto text-left">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg">
                                <th className="px-4 py-2 rounded-l-lg">Product</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Unit Price</th>
                                <th className="px-4 py-2">Subtotal</th>
                                <th className="px-4 py-2 rounded-r-lg"> Action</th>
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
                                    {
                                        order.order_status.toLowerCase() === 'delivered' &&
                                            item.product_rated === false ?
                                            (
                                                <td className="px-4 py-2" >
                                                    <button
                                                        className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded"
                                                        onClick={() => openReviewModal(order._id, item.product._id)}
                                                    >
                                                        <FaStar className="mr-2" /> Rate
                                                    </button>
                                                </td>
                                            ) :
                                            (<td className="px-4 py-2" ></td>)
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-10">
                    <div className="w-full md:w-2/3 lg:w-1/3">
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
                {showReviewModal && (
                    <UserAddReviewComponent onClose={closeReviewModal} orderId={orderId} productId={productId} />
                )}
                {showReviewSuccessModal && (
                    <UserReviewSuccessComponent onClose={closeReviewSuccessModal} />
                )}
            </div>
        </>
    )
}

export default UserProfileOrderDetailComponent;
