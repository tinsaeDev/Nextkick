import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) throw new Error('API_BASE_URL must be defined');

const getAccessToken = () => sessionStorage.getItem('access_token');

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Override `post`, `get`, `put`, etc. to unwrap `.data`
const withUnwrap = <T = any, D = any>(
  axiosCall: Promise<AxiosResponse<T, D>>
): Promise<T> => {
  return axiosCall
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      throw {
        message: err.message,
        status: err.response?.status ?? 500,
        data: err.response?.data ?? null,
      };
    });
};

const apiClient = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    withUnwrap<T>(axiosInstance.get(url, config)),

  post: <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig) =>
    withUnwrap<T>(axiosInstance.post<T>(url, data, config)),

  put: <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig) =>
    withUnwrap<T>(axiosInstance.put<T>(url, data, config)),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    withUnwrap<T>(axiosInstance.delete<T>(url, config)),
};

export default apiClient;
