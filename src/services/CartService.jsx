// src/services/CartService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Adjust based on your actual API endpoint

export const addToCart = async (userId, productId, productSubtypeIdentifier, grindType, quantity) => {
    try {
        const response = await axios.post(`${BASE_URL}/cart`, {
            userId,
            product: {
                id: productId,
                subtypeIdentifier: productSubtypeIdentifier,
                grindType: grindType,
                quantity
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart', error);
        throw error;
    }
};
