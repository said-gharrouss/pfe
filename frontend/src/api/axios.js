import axios from "axios";

const axiosClient = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL + "/api",
    timeout : 5000,
    withCredentials : true,
    withXSRFToken: true,
})

axiosClient.interceptors.request.use(function(request){

    const token = localStorage.getItem("token");

    if(token){
        request.headers.Authorization = "Bearer " + token;
    }
    return request
})


export {axiosClient}
