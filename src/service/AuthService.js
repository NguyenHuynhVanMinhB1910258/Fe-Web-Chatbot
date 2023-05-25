import axios from 'axios'
import createApiClient from "./apiService";
const api = createApiClient('https://chatbotabc-l3ed-master-oteukwknoa-wm.a.run.app/');

const Login = async(data) => {
    return await api.post('api/login',data)
}

const Register = async (data) => {
    return await api.post('api/register',data)
}
const CheckLogin = async (data) =>{
    return await api.post('api/check_token',data)
}
const CheckHistory = async (data) =>{
    return await api.post('api/check_history',data)
}
export {
    Login,
    Register,
    CheckLogin,
    CheckHistory,
}

