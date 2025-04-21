import {apiClient} from "./ApiClient";

export const register = (userData) => {
    return apiClient.post('/register', {
        username: userData.username,
        password: userData.password,
        fullName: userData.fullName,
        email: userData.email,
    });
};