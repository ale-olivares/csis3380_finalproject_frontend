import React, {useEffect, useState} from "react";
import { getCurrentUser } from '../../services/AuthService';
import { getCart as getCartService, removeFromCart as removeFromCartService } from '../../services/CartService';
import { makeStripeCheckout as stripeCheckoutService, updateShoppingCartSessionId as updateCartSessionIdService } from '../../services/PaymentService';
import defaultProductImage from '../../assets/img/default_500_500.png';
import { FaTrash, FaCreditCard } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';

const ShoppingCartComponent = () => {
    
    const [cartItems, setCartItems] = useState({items: []});
    const [isLoading, setIsLoading] = useState(true);
    const [subtotal, setSubtotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [total, setTotal] = useState(0);
    const [modal, setModal] = useState(null);

    const calculateSubtotal = () => {
        let newSubtotal = 0;
        
        if (cartItems && cartItems.items.length > 0){
            cartItems.items.forEach((item) => {
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
        
        // If user is not logged in, redirect to login page
        if (!getCurrentUser()) {
            window.location.href = "/login";
        }

        const getCart = async () => {
            try {
                const userId = getCurrentUser().id;
                await getCartService(userId).then((response) => {
                    
                    if (!response){
                        setCartItems({items: []});
                    }else{
                        setCartItems(response);
                    }
                });
            }
            catch (error) {
                console.error('Error while fetching shopping cart items', error);
            }
            finally 
            {
                setIsLoading(false); // Set loading to false after fetching
            }
        };

        getCart();

    },[]);

    useEffect(() => {
        calculateSubtotal();
    }, [cartItems]);

    useEffect(() => {
        calculateTaxes();
    }, [subtotal]);

    useEffect(() => {
        calculateTotal();
    }, [subtotal, taxes]);

    const handleRemoveItem = async (itemId) => {
        const cartItem = cartItems.items[itemId];
        const userId = getCurrentUser().id;
        try {
            await removeFromCartService(userId, cartItem.product_subtype._id);
            const newCartItems = cartItems.items.filter((item, index) => index !== itemId);
            setCartItems({items: newCartItems});
            
            // Set modal
            setModal({
                showModal: true,
                modalMessage: "Product has been removed from the cart.",
                modalTitle: "Success",
                modalType: "success"
            });

        }
        catch (error) {
            console.error('Error while removing item from cart', error);
        }
    };

    const handleStripeCheckout = async () => {

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

        const response = await stripeCheckoutService(cartItems.items, getCurrentUser().id);

        // Update the shopping cart by adding the Stripe Session Id
        const stripe_session_id = response.stripe_session_id;
        
        await updateCartSessionIdService(getCurrentUser().id, stripe_session_id).then((response) => {
            
            const result = stripe.redirectToCheckout({
                sessionId: stripe_session_id,
            });
    
            if (result.error) {
                console.error('Error while starting Stripe checkout', result.error);
            }
        })
        .catch((error) => {
            console.error('Error while updating shopping cart session', error);
        });

    }

    // In your render or return statement
    if (isLoading) {
        return <div>Loading cart...</div>;
    }

    return (
        <>
            <div className="container pt-40 px-40 pb-40 md:mx-auto min-h-screen">
                { cartItems && cartItems.items.length > 0 ? (
                    <>
                    <h3 className="text-3xl font-semibold leading-7 text-gray-900 py-5">My Cart</h3>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                                <tr>
                                    <th scope="col" className="px-16 py-3">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.items.map((item,index) => (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={index} >
                                        <td className="p-4 flex justify-center items-center">
                                            <img src={defaultProductImage} className="w-16 md:w-32 mx-auto max-w-full max-h-full" alt="Product"/>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900">
                                            {item.product.name} 
                                            <br/>
                                            {item.grind_type.name}
                                            <br/>
                                            {item.product_subtype.name}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                                            ${(parseInt(item.quantity) * parseFloat(item.unit_price)).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-center"> {/* text-center can help horizontally center the content */}
                                            <div className="flex justify-center items-center"> {/* Flex container to align the button */}
                                                <button
                                                onClick={() => handleRemoveItem(index)}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline flex items-center justify-center"
                                                >
                                                <FaTrash aria-label="Remove item" size={24} />
                                                </button>
                                            </div>
                                        </td>
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
                            <div className="flex justify-end mt-10">
                            <button 
                                onClick={handleStripeCheckout} 
                                style={{ backgroundColor: '#635BFF', color: 'white', padding: '12px 24px' }} // Added more padding
                                className="hover:bg-blue-700 text-white rounded flex items-center justify-center gap-2">
                                <FaCreditCard />
                                Pay with Stripe
                            </button>
                            </div>
                        </div>
                    </div>
                    </>
                )
                :
                (    <div className="text-center">
                        <h1 className="text-3xl font-bold">Your cart is empty</h1>
                        <p className="text-gray-500">Looks like you haven't added anything to your cart yet</p>
                    </div>
                )}
            </div>
            {modal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="my-modal">
                    <div className="p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{modal.modalTitle}</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">{modal.modalMessage}</p>
                            </div>
                            <div className="items-center px-4 py-3">
                                {
                                    modal.modalType === 'error' ? (
                                        <button 
                                            id="error-btn" 
                                            onClick={() => setModal(null)} 
                                            className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            OK
                                        </button>
                                    ) : (
                                        <button 
                                            id="ok-btn" 
                                            onClick={() => setModal(null)} 
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
        </>
    )
}

export default ShoppingCartComponent;