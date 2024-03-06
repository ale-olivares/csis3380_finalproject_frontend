import axios from 'axios';

const API_URL = 'http://localhost:8080/api/product';

export const getProductDetails = async (productId) => {
    try{
        const response = await axios.get(`${API_URL}/${productId}`);
        return response.data;
    }
    catch(error){
        console.error('Error while fetching product details', error);
        throw error;
    }
    
};