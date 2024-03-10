// src/services/CartService.jsx
import axios from 'axios';
import authHeader from './AuthHeader';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const addToCart = async (userId, productId, productSubtypeIdentifier, grindType, quantity) => {
    try {
        
        const response = await axios.post(`${BASE_URL}/cart`, {
            userId,
            product: {
                id: productId,
                subtypeIdentifier: productSubtypeIdentifier,
                grindType: grindType,
                quantity
            }},
            {
                headers: { ...authHeader()}
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error adding to cart', error);
        return error.response.data;
    }
};
