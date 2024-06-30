import axios from 'axios';
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;
// NODE_ENV에 따른 백엔드 URL 설정
const backendURL = process.env.NODE_ENV === 'production' ? BACKEND_PROXY : LOCAL_BACKEND;

const api = axios.create({
  baseURL: backendURL + '/api',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  function (error) {
    console.log('REQUEST ERROR', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response ? error.response.data : { message: 'Unknown error' };
    console.log('RESPONSE ERROR', error);
    return Promise.reject(error);
  },
);

export default api;
