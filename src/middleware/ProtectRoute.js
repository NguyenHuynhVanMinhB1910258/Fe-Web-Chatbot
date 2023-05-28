import React,{useEffect,useState} from 'react';
import { Navigate,useParams } from 'react-router-dom';
import { CheckHistory } from "../service/AuthService";
import Loading1 from "../view/Loading/Loading1";
const ProtectRoute = ({ path, element:Element,next_page_url,Add_History,getHistorys,History,setHistory}) => {
  const params = useParams();
  const {id} = params;
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // console.log(History);
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
    //   const user_i = localStorage.getItem('user_i')
      // Gọi API để kiểm tra trạng thái đăng nhập
      const response = await CheckHistory({history_id: id}); 
      setIsAuthenticated(response.data.is_valid);
    //   console.log(response.data.is_valid);
    } catch (error) {
      // Xử lý lỗi khi gọi API
      setIsAuthenticated(false);
    }
  };
  if(isAuthenticated === null){
      return <Loading1></Loading1>
  }else{
      if (isAuthenticated) {
          return <Element />;
      } else {
          return <Navigate to="/chat" />;
      }
  }
  
};
export default ProtectRoute;
