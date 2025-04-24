import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../Routes/Routes';
import { store } from '../Store/store';

// Axios default configurations
axios.defaults.baseURL = 'http://localhost:5286/api/';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(request =>{
  const token = store.getState().account.user?.token;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
})

// Axios response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Ensure error.response exists before destructuring
    const { response } = error;
    if (response) {
      const { data, status } = response as AxiosResponse;
      switch (status) {
        case 400:
          if (data.Errors) {
            const modelErrors: string[] = [];
            for (const key in data.Errors) {
              modelErrors.push(data.Errors[key]);
            }
            throw modelErrors;
          }
          toast.error(data.title);
          break;
        case 401:
          toast.error(data.title);
          break;
        case 500:
          router.navigate('/sever-error', { state: { error: data, status } });
          break;
        case 404:
          router.navigate('/notfound', { state: { error: data, status } });
          break;
        default:
          toast.error('An unknown error occurred');
          break;
      }
    } else {
      // Handle network or request errors where error.response is undefined
      toast.error('Network error. Please check your connection or try again later.');
    }
    console.log(error.response);
    return Promise.reject(error.response);
  }
);

// Simplified query methods
const queries = {
  get: (url: string) =>
    axios
      .get(url)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => {
        throw error;
      }),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => {
        throw error;
      }),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => {
        throw error;
      }),
  delete: (url: string) =>
    axios
      .delete(url)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => {
        throw error;
      }),
};

// Error queries
const Errors = {
  get400Error: () => queries.get('/error/bad-request'),
  get401Error: () => queries.get('/error/unauthorized'),
  get404Error: () => queries.get('/error/not-found'),
  get500Error: () => queries.get('/error/sever-error'),
  getValidationError: () => queries.get('/error/validation-error'),
};

// Catalog operations
const catalog = {
  list: () => queries.get('products'),
  details: (id: number) => queries.get(`products/${id}`),
};

// Cart operations
const Cart = {
  get: () => queries.get('cart'),
  addItem: (ProductID: number, quantity = 1) =>
    queries.post(`cart?ProductID=${ProductID}&quantity=${quantity}`, {}),
  deleteItem: (ProductID: number, quantity = 1) =>
    queries.delete(`cart?ProductID=${ProductID}&quantity=${quantity}`),
};

// Account operations
const Account = {
  login: (data: { username: string; password: string }) =>
    queries.post('account/login', data),
  register: (formData: FormData) => queries.post('account/register', formData),
  getUser:()=>queries.get("account/getuser")
};

// Exporting request object
const request = {
  catalog,
  Errors,
  Cart,
  Account,
};

export default request;
