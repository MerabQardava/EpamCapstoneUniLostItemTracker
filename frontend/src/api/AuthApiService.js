import {apiClient} from "./ApiClient";

export const register = (userData) => {
    return apiClient.post('/register', {
        username: userData.username,
        password: userData.password,
        fullName: userData.fullName,
        email: userData.email,
    });
};


export const login = (userData) => {
    const formData = new URLSearchParams();
    formData.append('username', userData.username);
    formData.append('password', userData.password);

    return apiClient.post('/login', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};