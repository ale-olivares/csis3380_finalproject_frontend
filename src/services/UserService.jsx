import axios from 'axios';
import authHeader from './AuthHeader';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const getUserDetail = async (userId) => {
    try{
        const response = await axios.get(`${BASE_URL}/users/${userId}`, {
            headers: { ...authHeader()}
        });
        return response.data;
    }
    catch(error){
        console.error('Error while fetching user detail', error);
        throw error;
    }
    
};
