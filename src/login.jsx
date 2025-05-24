import './login.css'
import React, { useEffect } from 'react';
import logo from './assets/logo.png'

 function Login() {

    useEffect(()=>{

        const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('loginbtn');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
    },[]);

    return (
        <>  
        <div className="main">
            <img src={logo} className='loginlogo' alt="" />
    <div className="container" id="container"><div className="containerin">
        <div className="whitebg"></div>
        <div className="form-container sign-up">
            <form>
                <h1><b>Create Account</b></h1>
                <input type="text" placeholder="Name"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button>Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in">
            <form>
                <h1><b>Sign In</b></h1>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <a href="#">Forget Your Password?</a>
                <button>Sign In</button>
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                   
                    <button className="hidden" id="loginbtn">Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1> Hello! </h1>
                    <p>Register  with  your  email</p>
                    <button className="hidden" id="register">Sign Up</button>
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