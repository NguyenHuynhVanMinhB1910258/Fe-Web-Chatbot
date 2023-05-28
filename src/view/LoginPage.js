import React, { useEffect, useState, useRef } from "react";
import "./Login.scss";
// import { Routes, Route, Link } from "react-router-dom";
import { useNavigate, useLocation, useParams, useHistory, Navigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { Login, Register } from "../service/AuthService";
import Typed from "typed.js";
import "bootstrap/dist/css/bootstrap.min.css";
const Welcome = ({ content }) => {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [content],
      typeSpeed: 50,
    });
    return () => {
      typed.destroy();
    };
  });
  return (
    <>
      <div className="welcome-logo">
        <img style={{ animation: "rotateIn 0.5s" }} src={Logo}></img>
      </div>
      <div className="welcome-text" ref={el}></div>
    </>
  );
};
const SignIn = ({ HadaleRotuer }) => {
  const navigate = useNavigate();
  // const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error_message, setError] = useState("");
  const [isShowPassword, setisShowPassword] = useState('password');
  const HadaleLogin = (e) => {
    e.preventDefault();
    const data = { email, password }
    const res = Login(data)
    res.then((res) => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user_i', res.data.id)
      navigate("/chat") // Điều hướng đến trang kế tiếp
      window.location.reload();
    })
      .catch(e => {
        if (e.response.status === 422)
          setError(e.response.data)
      })
  }
  const handleShowHidenPassword = () => {
    isShowPassword === 'text' ? setisShowPassword('password') : setisShowPassword('text')
  }
  return (
    <>
      <p className="login-title">Login</p>
      <form onSubmit={(e) => { HadaleLogin(e) }}>
        <div className="input-group">
          <div className="input-background">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Email"
            />
            <i
              type="button"
              onClick={() => setEmail("")}
              style={{ fontSize: 20, marginTop: 10, marginLeft: 10 }}
              className="fa-regular fa-circle-xmark"
            ></i>
          </div>
        </div>
        {error_message.email && error_message.email.map((m, i) => <p className="message-error" key={i}>{m}</p>)}
        <div className="input-group">
          <div className="input-background">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              style={{ width: "89%" }}
              type={isShowPassword}
              placeholder="Password"
            />
            {
              isShowPassword === 'text' ? <i class="fa-sharp fa-regular fa-eye" onClick={() => { handleShowHidenPassword() }} style={{ fontSize: 20, marginTop: 10, marginLeft: 10 }}></i> : <i class="fa-regular fa-eye-slash" onClick={() => { handleShowHidenPassword() }} style={{ fontSize: 20, marginTop: 10, marginLeft: 10 }}></i>
            }
          </div>
        </div>
        {error_message.password && error_message.password.map((m, i) => <p className="message-error" key={i}>{m}</p>)}
        <div className="forgot-password-text">
          <p>Recover Password ?</p>
        </div>
        <div className="submit-btn">
          <button>Login</button>
        </div>
      </form>
      <div className="group-navigate">
        <p style={{ color: "white", fontSize: 16 }}>Don't have an account?</p>
        <p
          style={{ color: "white", fontSize: 16 }}
          type="button"
          onClick={() => {
            HadaleRotuer("Signup");
          }}
        >
          Sign up
        </p>
      </div>
    </>
  );
};

const SignUp = ({ HadaleRotuer }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConf] = useState("");
  const [error_message, setError] = useState("")
  const [isShowPassword, setisShowPassword] = useState('password');
  const HandleSignUp = (e) => {
    e.preventDefault();
    const data = { email, password, password_confirmation }
    const res = Register(data)
    res.then(res => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user_i', res.data.id)
      navigate("/chat") // Điều hướng đến trang kế tiếp
      window.location.reload();
    }).catch(e => {
      if (e.response.status === 422)
        setError(e.response.data)
    })
    // console.log({email,password});
  }
  const handleShowHidenPassword = () => {
    isShowPassword === 'text' ? setisShowPassword('password') : setisShowPassword('text')
  }
  return (
    <>
      <p className="login-title">Create Your Account</p>
      {/* input Email */}
      <form onSubmit={(e) => HandleSignUp(e)}>
        <div className="input-group">
          <div className="input-background">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email" placeholder="Email" />
            <i
              style={{ fontSize: 20, marginTop: 10, marginLeft: 10 }}
              className="fa-regular fa-circle-xmark"
            ></i>
          </div>
        </div>
        {error_message.email && error_message.email.map((m, i) => <p className="message-error" key={i}>{m}</p>)}
        {/* input password */}
        <div className="input-group">
          <div className="input-background">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              style={{ width: "89%" }}
              type={isShowPassword}
              placeholder="Password"
            />
            {
              isShowPassword === 'text' ? <i class="fa-sharp fa-regular fa-eye" onClick={() => { handleShowHidenPassword() }} style={{ fontSize: 20, marginTop: 10, marginLeft: 10 }}></i> : <i class="fa-regular fa-eye-slash" onClick={() => { handleShowHidenPassword() }} style={{ fontSize: 20, marginTop: 10, marginLeft: 10 }}></i>
            }
          </div>
        </div>
        {error_message.password && error_message.password.map((m, i) => <p className="message-error" key={i}>{m}</p>)}
        {/* input password-conf */}
        <div className="input-group">
          <div className="input-background">
            <>
              <input
                onChange={(e) => {
                  setPasswordConf(e.target.value);
                }}
                value={password_confirmation}
                style={{ width: "95%" }}
                type={isShowPassword}
                placeholder="Password"
              />
            </>
          </div>
        </div>
        {error_message.password && error_message.password.map((m, i) => <p className="message-error" key={i}>{m}</p>)}
        <div style={{ marginTop: 10 }} className="submit-btn">
          <button>Sign up</button>
        </div>
      </form>
      <div className="group-navigate">
        <p style={{ color: "white", fontSize: 16 }}>Already have an account?</p>
        <p
          style={{ color: "white", fontSize: 16 }}
          type="button"
          onClick={() => HadaleRotuer("Login")}
        >
          Login
        </p>
      </div>
    </>
  );
};
export default function LoginPage(props) {
  const params = useParams();
  // const state  = location.state;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setisShowPassword] = useState(false);
  const [router, setRouter] = useState(params.params);
  // console.log(router === "Signup");
  const handleLogin = async () => {
    let isValid = true;
    if (isValid) {
      const data = { username, password };
      console.log(data);
      let rp = await Login(data);
      console.log("haha", rp);
      if (rp) {
        localStorage.setItem("token", rp.data.token);
        localStorage.setItem("userID", rp.data.id);
        navigate("../");
      }
    }
  };
  const HadaleRotuer = (router) => {
    setRouter(router);
  };
  const handleShowHidenPassword = () => {
    setisShowPassword(!isShowPassword);
  };
  if (router !== 'Login' && router !== 'Signup') {
    return (<Navigate to="/" />)
  } else {
    return (
      <div className="Content-login">
        <div className="Background">
          <div className="Ellipse1" />
          <div className="Ellipse2" />
        </div>
        <div className="content">
          <div className="page-in">
            {router === "Signup" ? (
              <SignUp HadaleRotuer={HadaleRotuer} />
            ) : (
              <SignIn HadaleRotuer={HadaleRotuer} />
            )}
          </div>
          <div className="signup-content">
            {router === "Signup" ? (
              <SignUp HadaleRotuer={HadaleRotuer} />
            ) : (
              <Welcome content={'Welcome LOG IN CHAT ABC'} />
            )}
          </div>
          <div className="vertical-line"></div>
          <div className="login-content">
            {router === "Login" ? (
              <SignIn HadaleRotuer={HadaleRotuer} />
            ) : (
              <Welcome content={'Welcome SIGN-UP CHAT ABC'} />
            )}
          </div>
        </div>
      </div>
    );
  }
}