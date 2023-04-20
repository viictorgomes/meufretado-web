import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const API_URL = 'http://192.168.1.50:5001';

const AxiosInstance = axios.create({
    baseURL: API_URL,
});

export const requestAPI = <T = unknown, R = AxiosResponse<T>>(
    url?: string,
    config?: Omit<AxiosRequestConfig, 'url' | 'baseURL'>
  ): Promise<R> =>
  AxiosInstance.request<T, R>({
      url,
      ...config,
    });

export const API = AxiosInstance;