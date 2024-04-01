import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/AuthService";
import { getCart as getCartService, removeCart as removeCartService } from '../../services/CartService';
import { getStripeSession as getStripeSessionService } from '../../services/PaymentService';
import { saveOrder as saveOrderService } from '../../services/PaymentService';
import { useNavigate } from "react-router-dom";
import defaultImageSuccess from '../../assets/img/success.png';
import { useCart } from '../../contexts/CartContext';

const PaymentSuccessComponent = () => {

    const navigate = useNavigate();
    const [orderItems, setOrderItems] = useState({items: []});
    const [subtotal, setSubtotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [total, setTotal] = useState(0);
    const { totalItemsCart, updateCartCount } = useCart();

    useEffect(() => {

        const user = getCurrentUser();

        const getCartData = async () => {

            await getCartService(user.id).then((response) => {

                const cartItems = response;

                if (cartItems) {
                    // Proceed to review the session Id
                    if (cartItems.stripe_session_id) {
                        // Review the status of the payment
                        getStripeSessionService(cartItems.stripe_session_id).then((response) => {
                            
                            if (response.payment_status === 'paid') {
                                // We can generate the order
                                const items = cartItems.items.map((item) => {
                                    console.log(item);
                                    return {
                                        product: item.product._id,
                                        product_subtype: item.product_subtype,
                                        grind_type: item.grind_type._id,
                                        quantity: item.quantity,
                                        unit_price: item.unit_price,
                                        product_rated: false
                                    }
                                });

                                const purchaseOrder = {
                                    user: user.id,
                                    items,
                                    created_at: new Date(),
                                    updated_at: null,
                                    stripe_session_id: cartItems.stripe_session_id,
                                    status: 'pending',
                                    total_taxes: parseFloat(response.total_details.amount_tax) / 100,
                                    total_purchase: parseFloat(response.amount_total) / 100
                                }

                                console.log(purchaseOrder)

                                // Set subtotal
                                setSubtotal(parseFloat(response.amount_subtotal) / 100)
                                
                                // Set total taxes
                                setTaxes(parseFloat(response.total_details.amount_tax) / 100)
                                
                                // Set total purchase
                                setTotal(parseFloat(response.amount_total) / 100)
                                
                                // Save the order
                                saveOrderService(purchaseOrder, getCurrentUser().id).then((response) => {
                                    if (response) {
                                        
                                        // Clear the shopping cart
                                        removeCartService(cartItems._id);
                                        updateCartCount(0);
                                        
                                        // Set orderItems
                                        setOrderItems(response);
                                        

                                    }
                                });

                            }
                            else {
                                navigate('/cart');
                            }
                        });



                    }
                }
                else {
                    navigate('/cart');
                }
            });

        }

        getCartData();

    }, []);

    // Format the creation date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!(orderItems && orderItems.items)) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container pt-40 px-40 pb-40 md:mx-auto min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Payment Success</h1>
                <img src={defaultImageSuccess} alt="Success" className="mx-auto mt-6 w-48 h-auto object-cover" />
                <p className="text-lg text-gray-500 mt-2">Your payment has been successful.</p>
            </div>
            {orderItems && orderItems.items ? (
                <div className="mt-10 p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800">We received your order!</h2>
                    <div className="mt-4 text-gray-600">
                        <p><strong>Order Status:</strong> {orderItems.order_status}</p>
                        <p><strong>Order Date:</strong> {formatDate(orderItems.created_at)}</p>
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
                                {orderItems.items.map((item, index) => (
                                    <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                        <td className="px-4 py-2">
                                            {item.product.name} 
                                            <br/>
                                            {item.grind_type.name}
                                            <br/>
                                            {item.product.product_subtypes[0].weight.name}</td>
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
            ) : (
                <h1 className="text-center mt-10 text-xl font-semibold text-red-500">No order details available.</h1>
            )}
        </div>
    );
}

export default PaymentSuccessComponent;