import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { login, getCurrentUser } from '../services/AuthService';
import { getUserDetail } from '../services/UserService';
import { useCart } from '../contexts/CartContext';
import { getCart as getCartService} from '../services/CartService';


const Login = () => {

    const history = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { totalItemsCart, updateCartCount } = useCart();

    const addToCart = (updateTotalCart) => {
        updateCartCount(updateTotalCart);
    }

    async function handleLogin(e) {
        e.preventDefault();
        //logic to handle the login process
        try {

            const loginResponse = await login(username, password);
            if (loginResponse.message) {
                setMessage(loginResponse.message);
            }
            else {
                
                // Update the cart count
                const cart = await getCartService(getCurrentUser().id);
                
                if (!cart){
                    addToCart(0);
                    localStorage.setItem("cartItemsCount", 0);
                }
                else
                {
                    if (cart.items.length > 0){
                        addToCart(cart.items.length);
                        localStorage.setItem("cartItemsCount", cart.items.length.toString());
                    }else{
                        addToCart(0);
                        localStorage.setItem("cartItemsCount", 0);
                    }
                }
                
                //validate if user has requiredpassword field  = true 
                const user = await getUserDetail(getCurrentUser().id);
                if (user.required_change_password) {
                    console.log("Go to set password component");
                    history("/setPassword");
                } else {
                    console.log("Go to home");
                    history("/")
                }


                //history("/")
            }


        } catch (e) {
            console.log(e);
        }


        console.log('Logging in with:', { username, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm  font-medium rounded-md text-white bg-brightColor hover:bg-hoverColor hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                    <p>{message}</p>

                    <div className="text-center items-center justify-between">

                        <NavLink
                            to="/forgotPassword"
                            className="text-sm font-medium text-brightColor hover:text-indigo-500"
                        >
                            Forgot your password?
                        </NavLink>

                    </div>


                </form>
            </div>
        </div>
    );
};

export default Login;