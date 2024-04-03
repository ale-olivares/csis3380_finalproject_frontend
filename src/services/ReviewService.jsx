import axios from 'axios';
import authHeader from './AuthHeader';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const addReview = async (userId, productId, productSubtypeId, title, comment, rating, orderId, itemId) => {
    try{

        const response = await axios.put(`${BASE_URL}/add-user-review`, 
            {
                userId,
                productId,
                productSubtypeId,
                title,
                comment,
                rating,
                orderId,
                itemId
            },
            {
                headers: { ...authHeader()}
            });
        return response.data;
    }
    catch(error){
        console.error('Error while adding the user review', error);
        throw error;
    }
    
};

export const deleteReview = async (userId, productId, productSubtypeId, orderId, orderItemId) => {
    
    try{

        const response = await axios.put(`${BASE_URL}/deleteReview/${userId}`, 
            {
                productId,
                productSubtypeId,
                orderId,
                orderItemId,
            },
            {
                headers: { ...authHeader()}
            });

        return response;
    }
    catch(error){
        console.error('Error while deleting the user review', error);
        throw error;
    }
    
}

export const getReviewFromUser = async (userId, reviewId) => {
    
    try{

        const response = await axios.get(`${BASE_URL}/getUserReview/${userId}/${reviewId}`, 
            {
                headers: { ...authHeader()}
            });

        return response;
    }
    catch(error){
        console.error('Error while deleting the user review', error);
        throw error;
    }
    
}