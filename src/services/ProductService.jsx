import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const getProductDetails = async (productId) => {
    try{
        console.log(BASE_URL)
        const response = await axios.get(`${BASE_URL}/product/${productId}`);
        return response.data;
    }
    catch(error){
        console.error('Error while fetching product details', error);
        throw error;
    }
    
};