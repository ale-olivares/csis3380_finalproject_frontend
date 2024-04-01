import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const login = async (username, password) => {

    try {
        const response = await axios.post(BASE_URL + "/auth/signin", {
            username,
            password
        });

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
    return JSON.parse(localStorage.getItem('user'));
};


export const requestPasswordReset = async (email) => {

    // Send password reset request to the backend

    try {
        const response = await axios.post(BASE_URL + '/request-reset-password', {
            email

        });
        return response.data

    } catch (error) {
        console.error('Error sending password reset request:', error);
    }
};

export const setNewPassword = async (userId, userPassword) => {
    //create component and pass variable as in getUserDetail 

    try {
        const response = await axios.put(`${BASE_URL}/changePassword/${userId}`, {
            userPassword
        });
        return response.data;
    }
    catch (error) {
        console.error('Error while changing the password', error);

    }


};

export const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.roles && user.roles.includes('ROLE_ADMIN');
};

