import React ,{useState,useRef} from 'react'
import "./WelcomePage.scss";
import Logo from "../assets/logo.svg";
import {useNavigate, Link,} from "react-router-dom"
import Typed from 'typed.js';
export default function WelcomePage() {
  const el = useRef(null)
  const el3 = useRef(null)
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Welcome CHAT ABC'],
      typeSpeed: 50,
    });
    const typed3 = new Typed(el3.current, {
      strings: ['Welcome CHAT ABC'],
      typeSpeed: 50,
    });
    return () => {
      typed3.destroy();
      typed.destroy();
    };
  }, []);
  return (
    <div className='main'>
      <div className='content-left'>
        <div className='content'>
            <img style={{animation:'rotateIn 0.5s'}} src = {Logo}></img>
            <p ref={el}></p>
        </div>
      </div>
      <div className='content-rigth'>
        <div className='title'>
            <img style={{animation:'rotateIn 0.5s'}} src = {Logo}></img>
            <p ref={el3}></p>  
        </div>
        <div className='content'>
          <p>Log in with your OpenAI account to continue</p>
          <div className='group-btn'>

            <Link to={{pathname: '../auth/Signup',
                      }}>
              <button>Sign Up</button>
            </Link>
            <Link to={'../auth/Login'} state={'Login'}>
              <button style={{backgroundColor:"#4461F2"}}>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
