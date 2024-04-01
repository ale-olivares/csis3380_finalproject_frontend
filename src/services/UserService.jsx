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

export const getUsers = async (filters = {}) => {
    try{
        const queryString = new URLSearchParams(filters).toString();
        const url = queryString ? `${BASE_URL}/users?${queryString}` : `${BASE_URL}/users`;
        const response = await axios.get(url, 
        {
            headers: { ...authHeader()}
        });
        return response.data;
    }
    catch(error){
        console.error('Error while fetching users', error);
        throw error;
    }
    
};

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/signup`, userData, {
            headers: { ...authHeader() }
        });
        return response.data;
    } catch (error) {
        console.error('Error while creating user', error);
        throw error;
    }
    
};

export const updateUser = async (userId,userData) => {
    try {
        const response = await axios.put(`${BASE_URL}/update/${userId}`, userData, {
            headers: { ...authHeader() }
        });
        return response.data;
    } catch (error) {
        console.error('Error while updating user', error);
        throw error;
    }  
};


export const inactivateUser = async (userId) => {
    try {
        const response = await axios.put(`${BASE_URL}/inactivate/${userId}`, {}, {
            headers: { ...authHeader() }
        });

        return response.data;

    } catch (error) {
        console.error('Error while inactivating user', error);
        throw error;
    }  
};


