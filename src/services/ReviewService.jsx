import axios from 'axios';
import authHeader from './AuthHeader';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const addReview = async (userId, productId, title, comment, rating, orderId) => {
    try{
        const response = await axios.put(`${BASE_URL}/add-user-review`, 
            {
                userId,
                productId,
                title,
                comment,
                rating,
                orderId
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
