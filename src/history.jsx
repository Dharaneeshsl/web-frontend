import React, { use } from "react";
import "./history.css";
import Navbar from "./navbar";
import ScrollCards from "./scrollcards";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function History() {
  
    return (
       <> 
       <Navbar></Navbar>
       
       <div className="history-container">
       <div className="curve"></div>
       <div className="logo"><h1>History</h1></div>
        <ScrollCards/>
                
                
         </div>
       </>
    );
}

export default History;