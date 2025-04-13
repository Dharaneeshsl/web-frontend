import "./recents.css";

function Recents(){
  return (
    
    <div className="dashboard-container">
      <div className="childelements">
      <div className="title">
      <h1>Recents</h1>
      </div>
      
      <div className="card-grid">
        <div className="card qr-card qrpos">
            <div className="qr-img">
            
            <div className="qr-content">
            <a href="###"><p className="qr-link">short/whg6u</p></a>
          </div> 
            </div>
          
          <div className="qr-actions">
            <a href="#" className="analytics-link">View Analytics&gt;&gt;&gt;</a>
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
          <p className="card-value large-value">18</p>
        </div>

       
        <div className="card ctr-card">
           <p className="card-label ctr">CTR</p>
           <p className="card-value rotated-value">5.32%</p>
        </div>
        <div className="emp2"></div>

       
        <div className="card region-card">
          <p className="card-label">Expiry</p>
          <p className="card-value">23/04</p>
        </div>
      </div>
      </div>
    </div>
  );
}
export default Recents;