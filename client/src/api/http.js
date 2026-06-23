import axios from 'axios';

const http = axios.create({ baseURL: '/api', withCredentials: true });
let refreshPromise = null;

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const isAuthRoute = original?.url?.startsWith('/auth/login') || original?.url?.startsWith('/auth/register') || original?.url?.startsWith('/auth/refresh');
    if (error.response?.status === 401 && !original?._retry && !isAuthRoute) {
      original._retry = true;
      refreshPromise ||= http.post('/auth/refresh').finally(() => { refreshPromise = null; });
      await refreshPromise;
      return http(original);
    }
    return Promise.reject(error);
  }
);

export default http;
