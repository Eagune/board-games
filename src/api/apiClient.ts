import { message as Message } from "antd";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

import { Result, ResultEnum } from "@/types/api";

// 创建 axios 实例
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
    timeout: 50000,
    headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截
axiosInstance.interceptors.request.use(
    (config) => {
        // 在请求被发送之前做些什么
        config.headers.Authorization = "Bearer Token";
        return config;
    },
    (error) => {
        // 请求错误时做些什么
        return Promise.reject(error);
    }
);

// 响应拦截
axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => {
        if (!res.data) throw new Error("sys.api.apiRequestFailed");
        return res.data;
    },
    (error: AxiosError<Result>) => {
        const { response, message } = error || {};
        let errMsg = "";
        try {
            errMsg = response?.data?.message || message;
        } catch (error) {
            throw new Error(error as unknown as string);
        }
        // 对响应错误做点什么
        if (errMsg) {
            Message.error(errMsg);
        }
        Message.error(errMsg);
        return Promise.reject(error);
    }
);

class APIClient {
    get<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: "GET" });
    }

    post<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: "POST" });
    }

    put<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: "PUT" });
    }

    delete<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: "DELETE" });
    }

    request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            axiosInstance
                .request<any, AxiosResponse<Result>>(config)
                .then((res: AxiosResponse<Result>) => {
                    resolve(res as unknown as Promise<T>);
                })
                .catch((e: Error | AxiosError) => {
                    reject(e);
                });
        });
    }
}
export default new APIClient();
