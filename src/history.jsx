import React, { use } from "react";
import "./history.css";
import Navbar from "./navbar";
import ScrollCards from "./scrollcards";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import UrlHistory from "./urlhistory";
function History() {
  
    return (
       <> 
       <Navbar></Navbar>
       
       <div className="history-container">
         
       <div className="curve"></div>
       <div className="listcomp">
         <UrlHistory></UrlHistory></div>
   
       
       
                
                
         </div>
       </>
    );
}

export default History;