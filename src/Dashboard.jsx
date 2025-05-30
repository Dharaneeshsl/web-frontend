import React from "react";
import Analytics from "./analytics";
import Navbar from "./navbar"
import "./Dashboard.css";
import { useParams } from "react-router-dom";

function Dashboard()
{ 
  const {id}=useParams()  
  console.log(id)
   return(
        <><div className="rootd"><div className="nav"><Navbar /></div>
      <div className="analytics"><Analytics id={id} /></div></div>
      
    </>
    );
}
export default Dashboard;