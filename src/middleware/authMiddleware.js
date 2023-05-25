// authMiddleware.js
import { CheckLogin } from "../service/AuthService";
export const checkAuth = async (nextState, replace, callback) => {
    // Kiểm tra trạng thái đăng nhập ở đây
    // const token = localStorage.getItem('token');
    console.log('a')
    const user_i = localStorage.getItem('user_i');
    const isLoggedIn = await CheckLogin({user_id: user_i}) // Lấy trạng thái đăng nhập từ localStorage, Redux store, hoặc API
  
    if (!isLoggedIn) {
        // Nếu không đăng nhập, điều hướng người dùng đến trang đăng nhập
        replace('auth/Login');
    }

    callback();
};
