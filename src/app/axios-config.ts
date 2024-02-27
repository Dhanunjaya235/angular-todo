import axios from "axios";
import { baseAPIURL } from "./contants";

export function AxiosConfig() {
    const ApiWrapper = axios.create({ baseURL: baseAPIURL });

    ApiWrapper.interceptors.request.use((config) => {

        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }

        return config;
    },
        (error) => {
            return Promise.reject(error);
        });

    return ApiWrapper;
}