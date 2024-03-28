// src/services/PaymentService.jsx
import axios from 'axios';
import authHeader from './AuthHeader';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const getPurchaseOrder = async (userId, orderId) => {
    try {
        
        const response = await axios.get(`${BASE_URL}/orders/${userId}/${orderId}`,
        {
            headers: { ...authHeader()}
        }
        );

        return response.data;

    } catch (error) {
        console.error('Error while fetching order', error);
        return error.response.data;
    }
}

export const getPurchaseOrders = async (userId) => {
    try {
        
        const response = await axios.get(`${BASE_URL}/orders/${userId}`,
        {
            headers: { ...authHeader()}
        }
        );

        return response.data;

    } catch (error) {
        console.error('Error while fetching orders', error);
        return error.response.data;
    }
}
