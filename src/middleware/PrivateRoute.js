import React,{useEffect,useState} from 'react';
import { Route, Navigate } from 'react-router-dom';
import { CheckLogin } from "../service/AuthService";
import Loading from '../view/Loading';
const PrivateRoute = ({ path, element:Element,next_page_url,Add_History,getHistorys,History,setHistory}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // console.log(History);
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user_i = localStorage.getItem('user_i')
      // Gọi API để kiểm tra trạng thái đăng nhập
      const response = await CheckLogin({user_id: user_i}); 
      setIsAuthenticated(response.data.is_valid);
    } catch (error) {
      // Xử lý lỗi khi gọi API
      setIsAuthenticated(false);
    }
  };
  if(isAuthenticated === null){
      return <Loading></Loading>
  }else{
      if (isAuthenticated) {
          return <Element setHistory={setHistory} next_page_url={next_page_url} Add_History={Add_History} getHistorys ={getHistorys} History={History}/>;
      } else {
          return <Navigate to="/auth/Login" />;
      }
  }
  
};
export default PrivateRoute;
