import React, { use } from "react";
import "./history.css";
import Navbar from "./navbar";
import ScrollCards from "./scrollcards";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function History() {
   useEffect(() => {const lenis = new Lenis();

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
         gsap.ticker.lagSmoothing(0);},  []);
    return (
       <> 
       <Navbar></Navbar>
         <div className="history-container">
            <div className="logo"><h1>History</h1></div>
        <ScrollCards/>
                
                
          </div>
       </>
    );
}

export default History;