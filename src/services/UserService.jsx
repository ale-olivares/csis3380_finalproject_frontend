import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const getUsers = async (filters = {}) => {
    try{
        const queryString = new URLSearchParams(filters).toString();
        const url = queryString ? `${BASE_URL}/users?${queryString}` : `${BASE_URL}/users`;
        const response = await axios.get(url);
        return response.data;
    }
    catch(error){
        console.error('Error while fetching users', error);
        throw error;
    }
    
};