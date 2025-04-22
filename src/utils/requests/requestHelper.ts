import { AxiosInstance, AxiosResponse } from "axios";

/**
 * Generic function to handle API requests
 */
const request = async (
    axiosInstance: AxiosInstance,
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: any,
    params?: any
): Promise<any> => {
    
    try {
        const response: AxiosResponse = await axiosInstance({
            method,
            url,
            data,
            params,
        });
        return response.data;
    } catch (error: unknown) { 
        throw error;
    }
};


// ✅ Helper functions for specific HTTP methods
export const getRequest = (axiosInstance: AxiosInstance, url: string, params?: any) =>
    request(axiosInstance, url, "GET", undefined, params);

export const postRequest = (axiosInstance: AxiosInstance, url: string, data?: any) =>
    request(axiosInstance, url, "POST", data);

export const putRequest = (axiosInstance: AxiosInstance, url: string, data?: any) =>
    request(axiosInstance, url, "PUT", data);

export const deleteRequest = (axiosInstance: AxiosInstance, url: string) =>
    request(axiosInstance, url, "DELETE");

export const postFormDataRequest = (
    axiosInstance: AxiosInstance,
    url: string,
    formData: FormData
) => {
    return axiosInstance.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

