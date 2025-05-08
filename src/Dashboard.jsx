import React from "react";
import Analytics from "./analytics";
import Navbar from "./navbar"
import "./Dashboard.css";

function Dashboard()
{
    return(
        <><div className="rootd"><div className="nav"><Navbar /></div>
      <div className="analytics"><Analytics /></div></div>
      
    </>
    );
}
export default Dashboard;