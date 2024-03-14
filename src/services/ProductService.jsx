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

export const getProducts = async (filters = {}) => {
    try{
        const queryString = new URLSearchParams(filters).toString();
        const url = queryString ? `${BASE_URL}/products?${queryString}` : `${BASE_URL}/products`;
        const response = await axios.get(url);
        return response.data;
    }
    catch(error){
        console.error('Error while fetching products', error);
        throw error;
    }
    
};

export const getCountries = async () => {
    try{

        const response = await axios.get(`${BASE_URL}/countries`);
        return response.data;
        
    }
    catch(error){
        console.error('Error while fetching countries', error);
        throw error;
    }
    
}


