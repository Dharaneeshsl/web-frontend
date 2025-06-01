import toast from "react-hot-toast";
import "./activate.css";
import axios from "axios";

export default function Activate() {
  console.log(localStorage.getItem("email"));
  return (
    <div className="activate">
      <h1>Check your mail app for activation link</h1>
      <div className="openmail">
        <button
          className="mail activatebtn"
          onClick={() => window.open("https://mail.google.com", "_blank")}
        >
          Mail app
        </button>
        <button
          className="resend activatebtn"
          onClick={() => {
            if (localStorage.getItem("email")) {
              toast.promise(
                axios.get(
                  `https://web-backend-sdfc.onrender.com /auth/resend/${localStorage.getItem(
                    "email"
                  )}`
                ),
                {
                  loading: "sending link",
                  success: "Sent",
                }
              );
            } else {
              alert("No email found. Please register or login again.");
            }
          }}
        >
          Resend link
        </button>
      </div>
    </div>
  );
}
