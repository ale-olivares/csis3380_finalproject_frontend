// src/services/PaymentService.jsx
import axios from 'axios';
import authHeader from './AuthHeader';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const makeStripeCheckout = async (items, userId) => {
    try {
        
        const response = await axios.post(`${BASE_URL}/stripe-checkout`, {
            items,
            userId
        },
        {
            headers: { ...authHeader()}
        }
        );

        return response.data;

    } catch (error) {
        console.error('Error while starting Stripe checkout', error);
        return error.response.data;
    }
};

export const updateShoppingCartSessionId = async (userId, sessionId) => {
    try {
        
        const response = await axios.post(`${BASE_URL}/update-session-id-shopping-cart`, {
            userId,
            sessionId
        },
        {
            headers: { ...authHeader()}
        }
        );

        return response.data;

    } catch (error) {
        console.error('Error while updating shopping cart session', error);
        return error.response.data;
    }
}

export const getStripeSession = async (sessionId) => {
    try {
        
        const response = await axios.get(`${BASE_URL}/stripe-session/${sessionId}`,
        {
            headers: { ...authHeader()}
        }
        );

        return response.data;

    } catch (error) {
        console.error('Error while fetching Stripe session', error);
        return error.response.data;
    }
}

export const saveOrder = async (order,userId) => {
    try {

        const response = await axios.post(`${BASE_URL}/save-purchase-order`, 
        {
            order,
            userId
        },
        {
            headers: { ...authHeader()}
        }
        );

        return response.data;

    } catch (error) {
        console.error('Error while saving order', error);
        return error.response.data;
    }
}