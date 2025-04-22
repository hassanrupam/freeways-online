// import useNotification from "../hooks/useNotifications";
import { internalAxios } from "./axiosInstances";
import { getRequest, postRequest, putRequest } from "./requestHelper";

export const getApiFromOutboundMiddleware = async (
    url: string,
    successCallback?: (data: any) => void,
    errorCallBack?: (data?:any) => void,
) => {
    // const { errorNotification } = useNotification();
    await getRequest(internalAxios, url).then((response) => {
        if (successCallback) {
            successCallback(response);
        }
        return response;
    }).catch((err) => {
        if (errorCallBack) {
            errorCallBack(err?.response?.data??null);
        }
        // const errorMessage:AppErrorMessage = parseErrorMessage(err?.response?.data);
        // errorNotification(errorMessage.head,errorMessage.body);
    });
}


export const postApiFromOutboundMiddleware = async (
    url: string,
    body: any,
    successCallback?: (data: any) => void,
    errorCallBack?: (data?:any) => void,
) => {
    // const { errorNotification } = useNotification();
    await postRequest(internalAxios, url, body).then((response) => {
        if (successCallback) {
            successCallback(response);
        }
        return response;
    }).catch((err) => {
        if (errorCallBack) {
            errorCallBack(err?.response?.data??null);
        }
        // const errorMessage:AppErrorMessage = parseErrorMessage(err?.response?.data);
        // errorNotification(errorMessage.head,errorMessage.body);
    });
}


export const putApiFromOutboundMiddleware = async (
    url: string,
    body: any,
    successCallback?: (data: any) => void,
    errorCallBack?: (data?:any) => void,
) => {
    // const { errorNotification } = useNotification();
    await putRequest(internalAxios, url, body).then((response) => {
        if (successCallback) {
            successCallback(response);
        }
        return response;
    }).catch((err) => {
        if (errorCallBack) {
            errorCallBack(err?.response?.data??null);
        }
        // const errorMessage:AppErrorMessage = parseErrorMessage(err?.response?.data);
        // errorNotification(errorMessage.head,errorMessage.body);
    });
}
