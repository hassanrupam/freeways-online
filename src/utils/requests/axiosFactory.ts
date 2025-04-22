import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";

// Function to create an Axios instance
const createAxiosInstance = (baseURL: string): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Method to update headers dynamically
    instance.setHeaders = (newHeaders: Record<string, string>) => {
        instance.defaults.headers.common = { ...instance.defaults.headers.common, ...newHeaders };
    };

    // Request Interceptor
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            return config;
        },
        (error: AxiosError) => Promise.reject(error)
    );

    return instance;
};

// Extend AxiosInstance type to include `setHeaders` method
declare module "axios" {
    export interface AxiosInstance {
        setHeaders: (headers: Record<string, string>) => void;
    }
}

export default createAxiosInstance;
