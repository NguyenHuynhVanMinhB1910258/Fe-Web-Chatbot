import React, {useEffect, useRef,useState} from "react";
import { Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './view/LoginPage';
import Main from "./view/Main";
import ChatContainer from "./components/ChatContainer";
import Welcome from "./components/Welcome";
import PrivateRoute from "./middleware/PrivateRoute";
import ProtectRoute from "./middleware/ProtectRoute"
import WelcomePage from"./view/WelcomePage"
import { createHistory, getHistory} from '../src/service/historyService';

import axios from "axios";

function Router() {
    const [History,setHistory ]= useState('');
    const [next_page_url,setURL] = useState(null);
    // const [IsLoggedIn ,setIsLoggedIn] = useState(false)
    const getHistorys = async () => {
        const id = localStorage.getItem('user_i')
        let rp = await getHistory(id);
        setHistory(rp.data)
        // console.log(rp);
        if(rp.url_next_page !==null)
        setURL(rp.url_next_page.replace('http://', 'https://'))
        else(setURL(null))
    }
    const Add_History = (obj) =>{
        setHistory([obj,...History])
    }
    const get_next_page_histoty = () =>{
        console.log('a');
        const token = localStorage.getItem('token');
        if(next_page_url!==null){
            axios.get(next_page_url,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                    console.log(res.data)
                    setHistory([...History,...res.data.data])
                    // console.log(res.data.url_next_pag)
                    if(res.data.url_next_page !== null)
                    setURL(res.data.url_next_page.replace('http://', 'https://'))
                    else setURL(null)

                }
            ).catch(
                e =>console.log(e)
            )
        }
       
    }
    useState(async ()=>{
        getHistorys();
    })
   
    return (
        <Routes>
            <Route path="/" element = {<WelcomePage />}/>
            <Route path='/auth/:params' element= {<LoginPage />}/>
            {/* <Route path='/sign-up' element={<SignUp />}/> */}
            <Route path='/chat' element={<PrivateRoute setHistory={setHistory} next_page_url={next_page_url} Add_History={get_next_page_histoty} getHistorys ={getHistorys} History={History} element={Main}/>}>
                 <Route path='/chat/' element={<Welcome Add_History={Add_History} getHistorys ={getHistorys}/>} />
                 <Route path='/chat/history/:id' element={<ProtectRoute element={ChatContainer}/>} />
            </Route>
        </Routes>
    )
}
export default Router;
