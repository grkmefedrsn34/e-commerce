import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../Routes/Routes';

axios.defaults.baseURL = 'http://localhost:5286/api/';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(response =>{
    return response ;
},(error:AxiosError)=>{
    const {data,status} = error.response as AxiosResponse;
    switch(status)
    {
        case 400:
            if(data.Errors){
                const modelErrors:string[]=[];
                for(const key in data.Errors){ 
                     modelErrors.push(data.Errors[key]);
                }
                throw modelErrors
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            router.navigate("/sever-error",{state:{error:data,status:status}});
             break;
        case 404:
            router.navigate("/notfound",{state:{error:data,status:status}});
            break;
        default:
            break;
    }
    console.log(error.response)
    return Promise.reject(error.response);
})

const queries = {
    get : (url:string)=>axios.get(url).then((response:AxiosResponse)=>response.data),
    post:(url:string,body:{})=>axios.post(url,body).then((response:AxiosResponse)=>response.data),
    put:(url:string,body:{})=>axios.put(url,body).then((response:AxiosResponse)=>response.data),
    delete:(url:string)=>axios.delete(url).then((response:AxiosResponse)=>response.data)

}

const Errors = {
    get400Error : () => queries.get("/error/bad-request"),
    get401Error : () => queries.get("/error/unauthorized"),
    get404Error : () => queries.get("/error/not-found"),
    get500Error : () => queries.get("/error/sever-error"),
    getValidationError : () => queries.get("/error/validation-error"),
}

const catalog={
    list:()=>queries.get("products"),
    details:(id:number) => queries.get(`products/${id}`),
}

const Cart = {
    get: () => queries.get("cart"),  // ✅ artık çağırabilirsin: Cart.get()
    addItem : (ProductID:Number,quantity=1) => queries.post(`cart?ProductID=${ProductID}&quantity=${quantity}`,{}),
    deleteItem : (ProductID:Number,quantity=1) => queries.delete(`cart?ProductID=${ProductID}&quantity=${quantity}`)
}


const request ={
    catalog,
    Errors,
    Cart
}

export default request;