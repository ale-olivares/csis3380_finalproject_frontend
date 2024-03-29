import axios from 'axios';
import authHeader from './AuthHeader';

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

export const getCategories = async () => {
    try{

        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data;
        
    }
    catch(error){
        console.error('Error while fetching categories', error);
        throw error;
    }
    
}

export const getGrindTypes = async () => {
    try{

        const response = await axios.get(`${BASE_URL}/grindTypes`);
        return response.data;
        
    }
    catch(error){
        console.error('Error while fetching grind types', error);
        throw error;
    }
    
}

export const getWeights = async () => {
    try{

        const response = await axios.get(`${BASE_URL}/weights`);
        return response.data;
        
    }
    catch(error){
        console.error('Error while fetching weights', error);
        throw error;
    }
    
}



export const getProductList = async (filters={}) => {
    try{
        const queryString = new URLSearchParams(filters).toString();
        const url = queryString ? `${BASE_URL}/productList?${queryString}` : `${BASE_URL}/productList`;
        const response = await axios.get(url,
            {
                headers: { ...authHeader()}
            }
        );
        return response.data;
        
    }
    catch(error){
        console.error('Error while fetching product list', error);
        throw error;
    }
};


export const updateProduct = async (product, indexSubtype) => {
    try{
        const response = await axios.put(`${BASE_URL}/editProduct/${product._id}`, {product, indexSubtype},
        {
            headers: { ...authHeader()}
        }
        );
        return response.data;
    }
    catch(error){
        console.error('Error while updating product', error);
        throw error;
    }
}