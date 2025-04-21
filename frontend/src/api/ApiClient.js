import axios from 'axios'

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080',
        withCredentials: true,
    }
);

// apiClient.interceptors.request.use(function (config) {
//
//     if (!config.url.endsWith('/login') && !config.url.endsWith('/register')) {
//         config.auth = {
//             username: "john_doe",
//             password: "password123",
//         };
//     }
//     return config;
// });
