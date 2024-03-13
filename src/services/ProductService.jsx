import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

export const getProductDetails = async (productId) => {
    try{
        const response = await axios.get(`${API_URL}product/${productId}`);
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
        // console.log(queryString);
        const url = queryString ? `${API_URL}products?${queryString}` : `${API_URL}products`;
        // console.log(url);
        const response = await axios.get(url);
        //console.log(response.data); 
        return response.data;
    }
    catch(error){
        console.error('Error while fetching products', error);
        throw error;
    }
    
};

export const getCountries = async () => {
    try{
        const response = await axios.get(`${API_URL}countries`);
        return response.data;
        
    }
    catch(error){
        console.error('Error while fetching countries', error);
        throw error;
    }
    
}


