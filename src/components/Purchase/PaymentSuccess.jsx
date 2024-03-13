import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/AuthService";
import { getCart as getCartService, removeCart as removeCartService } from '../../services/CartService';
import { getStripeSession as getStripeSessionService } from '../../services/PaymentService';
import { saveOrder as saveOrderService } from '../../services/PaymentService';
import { useNavigate } from "react-router-dom";

const PaymentSuccessComponent = () => {

    const navigate = useNavigate();

    useEffect(() => {

        const user = getCurrentUser();

        const getCartData = async () => {

            await getCartService(user.id).then((response) => {

                const cartItems = response;

                if (cartItems) {
                    // Proceed to review the session Id
                    if (cartItems.sessionId) {
                        // Review the status of the payment
                        getStripeSessionService(cartItems.sessionId).then((response) => {
                            
                            if (response.payment_status === 'paid') {
                                // We can generate the order
                                const items = cartItems.items.map((item) => {
                                    return {
                                        product: item.product._id,
                                        productSubtype: item.productSubtype._id,
                                        grindType: item.grindType._id,
                                        quantity: item.quantity,
                                        unitPrice: item.unitPrice
                                    }
                                });

                                const purchaseOrder = {
                                    user: user.id,
                                    items,
                                    createdAt: new Date(),
                                    updatedAt: null,
                                    sessionId: cartItems.sessionId,
                                    status: 'pending'
                                }
                                
                                // Save the order
                                saveOrderService(purchaseOrder).then((response) => {
                                    if (response) {
                                        
                                        // Clear the shopping cart
                                        removeCartService(cartItems._id);

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

    return (
        <div className="container pt-40 px-40 pb-40 md:mx-auto min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Payment Success</h1>
                <p className="text-lg">Your payment has been success</p>
            </div>
        </div>
    )
}

export default PaymentSuccessComponent;