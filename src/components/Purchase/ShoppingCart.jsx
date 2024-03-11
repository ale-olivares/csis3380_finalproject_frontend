import React, {useEffect, useState} from "react";
import { getCurrentUser } from '../../services/AuthService';
import { getCart as getCartService, removeFromCart as removeFromCartService } from '../../services/CartService';
import defaultProductImage from '../../assets/img/default_500_500.png';
import { FaTrash } from 'react-icons/fa';

const ShoppingCartComponent = () => {
    
    const [cartItems, setCartItems] = useState({items: []});
    const [isLoading, setIsLoading] = useState(true);
    const [subtotal, setSubtotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [total, setTotal] = useState(0);

    const calculateSubtotal = () => {
        let newSubtotal = 0;
        
        cartItems.items.forEach((item) => {
            newSubtotal += (parseInt(item.quantity) * parseInt(item.unitPrice) / 100);
        });
    
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
                const cart = await getCartService(userId);
                if (!cart){
                    setCartItems({items: []});
                }else{
                    setCartItems(cart);
                }
                
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

    const handlRemoveItem = async (itemId) => {
        const cartItem = cartItems.items[itemId];
        const userId = getCurrentUser().id;
        try {
            await removeFromCartService(userId, cartItem.productSubtype._id);
            const newCartItems = cartItems.items.filter((item, index) => index !== itemId);
            setCartItems({items: newCartItems});
        }
        catch (error) {
            console.error('Error while removing item from cart', error);
        }
    };

    // In your render or return statement
    if (isLoading) {
        return <div>Loading cart...</div>;
    }

    return (
        <div className="container pt-40 px-40 pb-40 md:mx-auto min-h-screen">
            { cartItems.items.length > 0 ? (
                <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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
                                    <td className="p-4">
                                        <img src={defaultProductImage} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                        {item.product.name} 
                                        <br/>
                                        {item.grindType.name}
                                        <br/>
                                        {item.productSubtype.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.quantity}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        ${(parseInt(item.quantity) * parseInt(item.unitPrice)/100).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => {handlRemoveItem(index)}}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline flex items-center justify-center"
                                        >
                                            <FaTrash aria-label="Remove item" />
                                        </button>
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
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Checkout
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
    )
}

export default ShoppingCartComponent;