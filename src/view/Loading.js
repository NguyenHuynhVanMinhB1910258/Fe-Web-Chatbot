import React, { useRef } from 'react'

import Logo1 from '../assets/logo1.svg'
import Logo from '../assets/logo.svg'
import Typed from 'typed.js'
import './Loading.scss'
export default function Loading() {
    const type = useRef("");
    React.useEffect(() => {
        const typed = new Typed(type.current, {
          strings: ['.','..','...','....'],
          typeSpeed: 250,
          backSpeed: 0, 
          loop: true, 
          loopCount: Infinity
        });
        return () => {
            typed.destroy();
          };
    },[])
    
  return (
    <div className='content-loading'>
        <div className='logo-web'>
            <img src={Logo}></img>
            <div className='web-name'>Chat ABC</div>
            <p ref={type}></p>
        </div>
    </div>
  )
}
