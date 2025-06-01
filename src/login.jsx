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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessToken, setAccessToken] = useState();
  const { userid, setUserid } = useAuth();
  const [showStrengthBar, setShowStrengthBar] = useState(false);
  const { triggerRefresh } = useContext(RefreshContext);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
  });

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
      return true;
    }
  };

  // Password strength check
  const checkPasswordStrength = (password) => {
    let score = 0;

    // Check length
    if (password.length >= 8) score += 1;
    // Check for numbers
    if (/\d/.test(password)) score += 1;
    // Check for special chars
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    // Check for uppercase
    if (/[A-Z]/.test(password)) score += 1;

    setPasswordStrength({ score });
    return score >= 2; // At least moderate strength
  };

  // Confirm password validation
  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      return true;
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Validate all fields
    const isEmailValid = validateEmail(email);
    const isPasswordStrong = checkPasswordStrength(password);
    const isPasswordMatch = validateConfirmPassword(password, confirmPassword);

    if (!isEmailValid) {
      toast.error("Enter a valid email");
      return;
    }
    if (!isPasswordStrong) {
      toast.error("Enter a stronger password");
      return;
    }
    if (!isPasswordMatch) {
      toast.error("Passwords does not match");
      return;
    }

    if (passwordStrength.score < 2) {
      toast.error("Please choose a stronger password");
      return;
    }

    toast
      .promise(
        axios.post("https://web-backend-sdfc.onrender.com/auth/register", {
          email: email,
          password: password,
        }),
        {
          loading: "Creating user...",
          success: "Sent Activation Link",
          error: (err) => {
            if (err.response?.status === 409) {
              return "User already exists";
            }
            return "Registration failed";
          },
        }
      )
      .then((response) => {
        navigate("/activate");
        console.log(response.data);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    toast
      .promise(
        axios.post("https://web-backend-sdfc.onrender.com/auth/login", {
          email: email,
          password: password,
        }),
        {
          loading: "Signing in",
          success: "Signed in",
          error: (error) => {
            if (error.response?.status === 401) {
              return "Invalid credentials";
            }
            if (error.response?.status === 403) {
              return "Activation required";
            }
            return "Login failed";
          },
        }
      )
      .then((response) => {
        console.log(response.data.access_token);
        setAccessToken(response.data.access_token);
        localStorage.setItem("accessToken", response.data.access_token);
        handleuserid(response.data.access_token).then(() => {
          navigate("/home");
        });
      });
  };

  function handleuserid(token) {
    return toast
      .promise(
        axios.get("https://web-backend-sdfc.onrender.com/auth/userid", {
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

    return () => {
      registerBtn.removeEventListener("click", () => {});
      loginBtn.removeEventListener("click", () => {});
    };
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
                    localStorage.setItem("email", e.target.value);
                    validateEmail(e.target.value);
                  }}
                  onBlur={() => {
                    if (!email) {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                  placeholder="Email"
                  className={errors.email ? "error-input" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}

                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkPasswordStrength(e.target.value);
                    if (confirmPassword) {
                      validateConfirmPassword(e.target.value, confirmPassword);
                    }
                  }}
                  onFocus={() => setShowStrengthBar(true)}
                  onBlur={() => !password && setShowStrengthBar(false)}
                  placeholder="Password"
                />

                {/* Password Strength Bar - only shown when focused/has content */}
                {(showStrengthBar || password) && (
                  <div className="password-strength-container">
                    <div
                      className={`password-strength-bar strength-${passwordStrength.score}`}
                      style={{
                        width: `${(passwordStrength.score / 4) * 100}%`,
                      }}
                    ></div>
                  </div>
                )}

                <input
                  type="password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(password, e.target.value);
                  }}
                  placeholder="Confirm Password"
                  className={errors.confirmPassword ? "error-input" : ""}
                />
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword}
                  </span>
                )}

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
                    localStorage.setItem("email", e.target.value);
                    validateEmail(e.target.value);
                  }}
                  onBlur={() => {
                    if (!email) {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                  placeholder="Email"
                  className={errors.email ? "error-input" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}

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
                  <h1>Hello!</h1>
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
