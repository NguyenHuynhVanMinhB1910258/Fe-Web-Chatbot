import React, { useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import Username from '../assets/user-octagon.svg'
import Password from '../assets/frame.svg'
import './SignUp.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {Register} from '../service/AuthService'

export default function SignUp() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [password_confirmation,setPassword_Confirmation] = useState('')
  const [email,setEmail] = useState('')
  const [isShowPassword,setisShowPassword] = useState(false)

  const checkInput = () => {
    let isValid  = true
    let arrInput = ['username', 'password', 'rePassword'];
    console.log('username',username)
    for (let i=0; i<arrInput.length; i++){
        if(!arrInput[i] || arrInput[1]!==arrInput[2]){
            isValid = false;
            alert("missing parameter: "+arrInput[i]);
            break;
        }
    }
    return isValid;
  }
  const handleRegister = async () => {
    let isValid = true;
    if(isValid){
      const data = {username, password, password_confirmation, email};
      // axios.post('http://192.168.0.7:5000/api/register',data).then((res)=>{
      //     console.log('kq', res);
      // })
      // console.log(data);
      let rp = await Register(data);
      // rp.then(res=>console.log(res)).catch(e => console.log(e))
      // console.log(rp);
    }
  }
  const handleShowHidenPassword = () => {
    setisShowPassword(!isShowPassword)
  }
  return (

    <div className="Content-SignUp">
      <div className='row'>
        <div className='col-6'>
          <div className='signup'>
            <div className='title-signup'>
              <span>Sign-in Your Account</span>
            </div>
            <div className='input-signup'>
              <div className='row'>
                <div className='col-3'>
                  <img src={Username}></img>
                </div>
                <div className='col-9'>
                  <input placeholder='Username'
                    onChange={(event)=>{setUsername(event.target.value)}}
                    value ={username}>
                </input>
                </div>
              </div>
              <div className='row'>
                <div className='col-3'>
                  <img src={Password}></img>
                </div>
                <div className='col-9'>
                  <input placeholder='Password' 
                    type={isShowPassword ? 'text' : 'password'}
                    onChange={(event)=>{setPassword(event.target.value)}}
                    value ={password}>
                  </input>
                  <span onClick={()=>{handleShowHidenPassword()}} className='input-password'>
                      <i className={isShowPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}></i>
                    </span>
                </div>
              </div>
              <div className='row'>
                <div className='col-3'>
                  <img src={Password}></img>
                </div>
                <div className='col-9'>
                  <input placeholder='Re-Password'
                    type={isShowPassword ? 'text' : 'password'}
                    onChange={(event)=>{setPassword_Confirmation(event.target.value)}}
                    value ={password_confirmation}>
                  </input>
              
                </div>
              </div>
              <div className='row'>
                <div className='col-3'>
                  <img src={Password}></img>
                </div>
                <div className='col-9'>
                  <input placeholder='Email'
                    onChange={(event)=>{setEmail(event.target.value)}}
                    value ={email}>
                  </input>
                </div>
              </div>
              <button className='btn-signup' onClick={()=>{handleRegister()}}>
                  Sign Up
              </button>
            </div>
            <div className='footer-signup'>
              <div className='row'>
                <div className='col-9'>
                  <span>Already have an account?</span>
                </div>
                <div className='col-3'>
                  <Link to='/login'><span>Log in</span></Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-1'>
          <div className="vertical-line"></div>
        </div>
        <div className='col-5'>
          <div className='signup-left'>
            <img className='logo' src={Logo}></img>
            <div className='text-signup'>
              <span>Welcome to signup CHATABC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
