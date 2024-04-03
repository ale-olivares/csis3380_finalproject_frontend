import React, { useState, useEffect } from 'react';
import { login, getCurrentUser, logout } from '../../services/AuthService';
import { getCart as getCartService } from '../../services/CartService';
import { useCart } from '../../contexts/CartContext';

const DevLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { totalItemsCart, updateCartCount } = useCart();

    const addToCart = (updatedTotalCart) => {
        updateCartCount(updatedTotalCart);
      };

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginResponse = await login(username, password);
        if (loginResponse.message) 
        {
            setMessage(loginResponse.message);
        }
        else 
        {
            setMessage('Login Successful');
            
            // Update the shopping cart items count LocalStorage
            const cart = await getCartService(getCurrentUser().id);
            
            if (!cart){
                addToCart(0)
            }
            else{
                if (cart.items.length > 0) {
                    addToCart(cart.items.length)
                } else {
                    addToCart(0)
                }
            }

            console.log(localStorage.getItem('cartItemsCount'))

        }
    }

    const handleLogout = () => {
        
        logout();
        addToCart(0);
        window.location.reload();
    }

    return (
        <div className="container pt-40 pb-40 px-40 md:mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Login (For Development Purposes - Test)</h2>
            {getCurrentUser() ?
                <div>
                    <p>You are already logged in</p> 
                    <p><strong>USER: </strong> {getCurrentUser().username}</p>
                    <p><strong>TOKEN: </strong>{getCurrentUser().accessToken}</p>
                    <button onClick={handleLogout} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Logout</button>
                </div>
                :
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
                </form>
            }
            <p>{message}</p>
        </div>
    );


}

export default DevLogin;