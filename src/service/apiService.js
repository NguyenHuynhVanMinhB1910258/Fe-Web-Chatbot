
import axios from "axios";
const token = localStorage.getItem('token');
// console.log(token)


export default (baseURL) => {
    return axios.create({
        baseURL,
        headers: {
            authorization: `Bearer ${token}`
        },
    });
};