import { useEffect, useState} from "react";
import "./recents.css";
import model1 from "./assets/model1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RefreshContext,RefreshProvider } from "./RefreshContext.jsx";
import { useContext } from "react";


function Recents() {
  const { refreshKey,triggerRefresh ,qrCode,shortCode,setShortCode} = useContext(RefreshContext); // Access the refreshKey
  const navigate = useNavigate();
  const [clicks, setClicks] = useState(18);
  const [expiryDate, setExpiryDate] = useState("23/04");


  useEffect(() => {
    const dashboard = document.querySelector('.dashboard-container');

    if (dashboard) {
      dashboard.addEventListener('mousemove', (e) => {
        const rect = dashboard.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
  
        dashboard.style.setProperty('--x', `${x}%`);
        dashboard.style.setProperty('--y', `${y}%`);
      });
    }
  
    return () => {
      if (dashboard) {
        dashboard.removeEventListener('mousemove', () => {});
      }
    };
    axios
      .get("http://127.0.0.1:5000/analytics/recent")
      .then((response) => {
        setClicks(response.data.clicks);
        setExpiryDate(formatDate(response.data.expiryDate));
        setShortCode(response.data.shortCode);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recents:", error);
      });
  }, [refreshKey]);
  const handleAnchorClick = (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    
    // Make an API call
    axios
      .get(`http://127.0.0.1:5000/analytics/${shortCode}`) // Replace with your API endpoint
      .then((response) => {
        console.log("API Response:", response.data?window.open(response.data,"_blank", "noopener"):"No data found");
        triggerRefresh(); 
      })
      .catch((error) => {
        console.error("Error making API call:", error);
        alert("Failed to make API call."); // Optional: Show an error message
      });
      
  };
  

  // Function to handle anchor tag click
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${day} ${month.toUpperCase()}`;
  }

  return (
    
    <div className="dashboard-container">
      <div className="childelements">
        <div className="title">
          <h1>Recents</h1>
        </div>

        <div className="card-grid">
          <div className="card qr-card qrpos">
            <div className="qr-img">
              {qrCode?<img src={`data:image/png;base64,${qrCode}`} />:null}
              <div className="qr-content">
                <a href="###" onClick={handleAnchorClick}>
                  <p className="qr-link">short/{shortCode}</p>
                </a>
              </div>
            </div>

            <div className="qr-actions">
              <a href="/dashboard" className="analytics-link">
                View Analytics&gt;&gt;&gt;
              </a>
              <button className="copy-button" aria-label="Copy link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="emp1"></div>
          <div className="card clicks-card">
            <p className="card-label">Clicks</p>
            <p className="card-value large-value">{clicks}</p>
          </div>

          <div className="card ctr-card">
            <p className="card-label ctr">CTR</p>
            <p className="card-value rotated-value">5.32%</p>
          </div>
          <div className="emp2"></div>

          <div className="card region-card">
            <p className="card-label">Expiry</p>
            <p className="card-value exp">{expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recents;
