import './login.css'
import React, { useEffect } from 'react';


 function Login() {

    useEffect(()=>{

        const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
    },[]);

    return (
        <>  
        <div class="main">
            <div class="container" id="container">
                <div class="form-container sign-up">
                    <form>
                        <h1><b>Create Account</b></h1>
                        <input type="text" placeholder="Name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <button>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in">
                    <form>
                        <h1><b>Sign In</b></h1>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <a href="#">Forget Your Password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
            <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                   
                    <button class="hidden" id="login">Sign In</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1> Hello! </h1>
                    <p>Register  with  your  email</p>
                    <button class="hidden" id="register">Sign Up</button>
                </div>
            </div>
            </div>
            </div>
  
        </div>
        
        </>
    );
}

export default Login;