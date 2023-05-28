import axios from "axios";
const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: process.env,
    headers: {Authorization: `Bearer ${token}`},

})
export {instance}