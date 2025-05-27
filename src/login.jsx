import "./login.css";
import React, { useContext, useEffect, useState } from "react";
import logo from "./assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { RefreshContext } from "./RefreshContext";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState();
  const { userid, setUserid } = useAuth();
  const { triggerRefresh } = useContext(RefreshContext);

  const handleRegister = (e) => {
    e.preventDefault();
    toast
      .promise(
        axios.post("http://127.0.0.1:5000/auth/register", {
          email: email,
          password: password,
        }),
        {
          loading: "Creating user...",
          success: "User Created",
          error: "User already exists",
        }
      )
      .then((response) => {
        navigate("/activate")
        console.log(response.data);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    toast
      .promise(
        axios.post("http://127.0.0.1:5000/auth/login", {
          email: email,
          password: password,
        }),
        {
          loading: "Signing in",
          success: "Signed in",
         
        }
      )
      .then((response) => {
        
          console.log(response.data.access_token);
          setAccessToken(response.data.access_token);
          localStorage.setItem("accessToken", response.data.access_token);
          handleuserid(response.data.access_token).then(() => {
            navigate("/home");
          });
        
       
        // Save token
      })
      .catch((error) => {
        console.log(error);
         if (error.status===401){
          toast.error("Invalid credentials")
        }
        if(error.status===403){
          toast.error("Activation required")
        }
      });
  };

  function handleuserid(token) {
    return toast
      .promise(
        axios.get("http://127.0.0.1:5000/auth/userid", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          loading: "Fetching user info...",
          success: "User info loaded",
          error: "Failed to fetch user info",
        }
      )
      .then((response) => {
        setUserid(response.data.user_id);
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
                    localStorage.setItem("email",e.target.value);
                    console.log(localStorage.getItem("email"))
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
                    localStorage.setItem("email",e.target.value)
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
