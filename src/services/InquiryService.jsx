import axios from 'axios';
import authHeader from './AuthHeader';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const getInquiries = async (filters = {}) => {
    try{
        const queryString = new URLSearchParams(filters).toString();
        const url = queryString ? `${BASE_URL}/inquiries?${queryString}` : `${BASE_URL}/inquiries`;
        const response = await axios.get(url, 
        {
            headers: { ...authHeader()}
        });
        return response.data;
    }
    catch(error){
        console.error('Error while retrieving inquiries', error);
        throw error;
    }
    
};

export const openInquiry = async (inquiryId) => {
    try {
        const response = await axios.put(`${BASE_URL}/inquiry/${inquiryId}`, {}, {
            headers: { ...authHeader() }
        });
        return response.data;
    } catch (error) {
        console.error('Error while opening inquiry', error);
        throw error;
    }
    
}