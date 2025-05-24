import "./login.css";
import React, { useContext, useEffect, useState } from "react";
import logo from "./assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { RefreshContext } from "./RefreshContext";

function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState();
const{userid,setUserid}= useAuth();
const {triggerRefresh}=useContext(RefreshContext);

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/auth/register", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data.access_token);
        setAccessToken(response.data.access_token)
        localStorage.setItem("accessToken", response.data.access_token); 
        handleuserid(response.data.access_token).then(() => {
        navigate('/home');}
        )
       // Save token
       
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleuserid(token){


   return axios
        .get("http://127.0.0.1:5000/auth/userid", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          
          setUserid(response.data.user_id)
          console.log(response.data.user_id);
          localStorage.setItem("userid", response.data.user_id);
        triggerRefresh();
          
        })
        .catch((error) => {
          console.log(error);
        });
    
  }

  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("loginbtn");

    registerBtn.addEventListener("click", () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
      container.classList.remove("active");
    });
   
  }, []);

  return (
    <>
      <div className="main">
        <img src={logo} className="loginlogo" alt="" />
        <div className="container" id="container">
          <div className="containerin">
            <div className="whitebg"></div>
            <div className="form-container sign-up">
              <form onSubmit={handleRegister}>
                <h1 className="loginheading">Create Account</h1>
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                />
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                />
                <button type="submit">Sign Up</button>
              </form>
            </div>
            <div className="form-container sign-in">
              <form onSubmit={handleLogin}>
                <h1 className="loginheading">Sign In</h1>
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                />
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                />
                <a href="#">Forget Your Password?</a>
                <button type="submit">Sign In</button>
              </form>
            </div>
            <div className="toggle-container">
              <div className="toggle">
                <div className="toggle-panel toggle-left">
                  <h1>Welcome Back!</h1>

                  <button className="hidden" id="loginbtn">
                    Sign In
                  </button>
                </div>
                <div className="toggle-panel toggle-right">
                  <h1> Hello! </h1>
                  <p>Register with your email</p>
                  <button className="hidden" id="register">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
