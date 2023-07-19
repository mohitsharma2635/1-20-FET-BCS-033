import axios from 'axios';

// Function to check if the JWT token is expired
const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
    return decodedToken.exp < Date.now() / 1000; // Compare the expiration time with the current time
};

// Axios instance with interceptors
const axiosInstance = axios.create({
    baseURL: 'http://20.244.56.144/train',
});

// Axios interceptor to renew the token when it's expired
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
};

const onTokenRefreshed = (token) => {
    refreshSubscribers.map((callback) => callback(token));
};

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry && !isRefreshing) {
            originalRequest._retry = true;

            // You should have a function here to get the new token from your backend
            const newToken = await YOUR_REFRESH_TOKEN_FUNCTION();

            if (newToken) {
                isRefreshing = false;
                onTokenRefreshed(newToken);
                return axiosInstance(originalRequest);
            } else {
                // Handle the case when token refresh failed or user is not authenticated
                // For example, you might want to redirect to the login page
                // Or you could throw an error and catch it in your components to handle it accordingly
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token && !isTokenExpired(token)) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
