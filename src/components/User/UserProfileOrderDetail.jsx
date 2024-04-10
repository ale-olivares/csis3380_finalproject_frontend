import React, { useEffect, useState } from "react";
import { FaStar, FaTrash, FaEye } from 'react-icons/fa';
import UserAddReviewComponent from "./UserAddReview";
import UserReviewSuccessComponent from "./UserReviewSuccess";
import { getCurrentUser } from "../../services/AuthService";
import { deleteReview, getReviewFromUser } from "../../services/ReviewService";
import { NavLink, useNavigate } from "react-router-dom";

const UserProfileOrderDetailComponent = ({ order }) => {
    
    const [subtotal, setSubtotal] = useState(0);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showReviewSuccessModal, setShowReviewSuccessModal] = useState(false);
    const [deleteReviewModal, setDeleteReviewModal] = useState(false);
    const [productId, setProductId] = useState(null)
    const [subproductTypeId, setSubproductTypeId] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [orderItemId, setOrderItemId] = useState(null);
    const [action, setAction] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState('');
    const [shortMessage, setShortMessage] = useState('');

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

    useEffect(() => {
        calculateSubtotal();
    }, [order]);

    // Function to handle opening the review modal
    const openReviewModal =  async (productId, productSubtypeId, orderId, orderItemId, reviewId, action) => {
        setProductId(productId);
        setSubproductTypeId(productSubtypeId);
        setOrderId(orderId);
        setOrderItemId(orderItemId);
        setAction(action);
        if (action == 2){
            
            const response = await getReviewFromUser(getCurrentUser().id, reviewId);
            
            if (response.status === 200){
                const review = response.data;
                setShortMessage(review.title);
                setComment(review.comment);
                setUserRating(review.rating);
            }
        }
        
        setShowReviewModal(true);
    };

    // Function to handle closing the review modal
    const closeReviewModal = () => {
        setOrderId(null);
        setProductId(null);
        setShowReviewModal(false);
    };

    // Function to handle opening the review success modal
    const openReviewSuccessModal = () => {
        setOrderId(null);
        setProductId(null);
        setShowReviewModal(false);
        setShowReviewSuccessModal(true);
    };

    // Function to handle closing the review modal
    const closeReviewSuccessModal = () => {
        window.location.reload();
    };

    const removeReview = async (productId, productSubtypeId, orderId, orderItemId) => {
        console.log(productId);
        const user = getCurrentUser();
        const response = await deleteReview(user.id, productId, productSubtypeId, orderId, orderItemId);

        if (response.status === 200) {

            setDeleteReviewModal({
                showModal: true,
                modalMessage: response.data.message,
                modalTitle: "Success",
                modalType: "success"
            });
        }
        else {
            setDeleteReviewModal({
                showModal: true,
                modalMessage: "There was an error, please try again later",
                modalTitle: "Error",
                modalType: "error"
            });
        }
    }

    if (!(order && order.items)) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="mt-10 p-4 md:p-6 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col md:flex-row justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Order #: {order.order_number.toString().padStart(7, '0')}</h2>
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
                            <tr className="bg-gradient-to-r from-gray-200 to-gray-300">
                                <th className="w-1/6 px-4 py-2 rounded-l-lg"></th>
                                <th className="w-1/6 px-4 py-2">Product</th>
                                <th className="w-1/6 px-4 py-2">Quantity</th>
                                <th className="w-1/6 px-4 py-2">Unit Price</th>
                                <th className="w-1/6 px-4 py-2">Subtotal</th>
                                <th className="w-1/6 px-4 py-2 rounded-r-lg">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {order.items.map((item, index) => (
                                <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <td className="p-4 flex justify-center items-center">
                                        <img src={item.product.product_subtypes[0].image_url} className="w-16 md:w-24 lg:w-32 mx-auto max-w-full max-h-full" alt="Product" />
                                    </td>
                                    <td className="px-4 py-2">
                                        <NavLink to={`/product/${item.product.prod_id}`} className="font-semibold hover:underline">
                                            {item.product.name}
                                            <br />
                                            {item.grind_type.name}
                                            <br />
                                            {item.product.product_subtypes[0].weight.name}
                                        </NavLink>
                                    </td>
                                    <td className="px-4 py-2">{item.quantity}</td>
                                    <td className="px-4 py-2">${item.unit_price}</td>
                                    <td className="px-4 py-2">${(item.quantity * item.unit_price).toFixed(2)}</td>
                                    {
                                        order.order_status.toLowerCase() === 'delivered' ? (
                                            item.product_rated === false ?
                                                (
                                                    <td className="px-4 py-2" >
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded"
                                                                onClick={() => openReviewModal(item.product._id.toString(), item.product_subtype.toString(), order._id.toString(), item._id.toString(), null, 1)}
                                                            >
                                                                <FaStar className="mr-2" /> Rate
                                                            </button>
                                                        </div>
                                                    </td>
                                                ) :
                                                (<td className="px-4 py-2">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => removeReview(item.product._id.toString(), item.product_subtype.toString(), order._id.toString(), item._id.toString())}
                                                            className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded mr-2" // Add a right margin for spacing
                                                        >
                                                            <FaTrash aria-label="Remove item" size={24} /> Delete Rating
                                                        </button>
                                                        <button
                                                            onClick={() => openReviewModal(item.product._id.toString(), item.product_subtype.toString(), order._id.toString(), item._id.toString(), item.review_id, 2)}
                                                            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded"
                                                        >
                                                            <FaEye aria-label="View Rating" size={24} /> View Rating
                                                        </button>

                                                    </div>
                                                </td>
                                                )
                                            ) :
                                            (<td className="px-4 py-2">N/A</td>)
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
                            <span>${order.total_taxes.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total</span>
                            <span>${order.total_purchase.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                {showReviewModal && (
                    <UserAddReviewComponent onClose={closeReviewModal} openReviewSuccessModal={openReviewSuccessModal} productId={productId} subproductTypeId={subproductTypeId} orderId={orderId} orderItemId={orderItemId} shortMessageInit={shortMessage} commentInit={comment} actionInit={action} userRatingInit={userRating} />
                )}
                {showReviewSuccessModal && (
                    <UserReviewSuccessComponent onClose={closeReviewSuccessModal} />
                )}
                {deleteReviewModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="my-modal">
                        <div className="p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="text-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{deleteReviewModal.modalTitle}</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">{deleteReviewModal.modalMessage}</p>
                                </div>
                                <div className="items-center px-4 py-3">
                                    {
                                        deleteReviewModal.modalType === 'error' ? (
                                            <button
                                                id="error-btn"
                                                onClick={() => setDeleteReviewModal(null)}
                                                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                OK
                                            </button>
                                        ) : (
                                            <button
                                                id="ok-btn"
                                                onClick={() => window.location.reload() }
                                                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            >
                                                OK
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default UserProfileOrderDetailComponent;
