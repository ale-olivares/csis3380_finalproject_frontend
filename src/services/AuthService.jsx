import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const login = async (username, password) => {
    
    try {
        const response = await axios.post(BASE_URL + "/auth/signin", {
            username,
            password
        });

        console.log(response.data)

        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;

    } catch (error) {
        console.error('Error logging in', error);
        return error.response.data;
        
    }
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const register = async (username, email, password) => {

    try {

        const response = await axios.post(BASE_URL + "/auth/signup", {
            username,
            email,
            password
        });

        return response.data;

    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }

};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
};