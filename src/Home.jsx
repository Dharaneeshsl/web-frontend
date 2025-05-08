import { useEffect } from "react";
import "./Home.css";
import Navbar from "./navbar.jsx";
import Recents from "./recents.jsx";
import Generate from "./generate.jsx";
import { RefreshProvider } from "./RefreshContext.jsx";

function Home() {
  useEffect(() => {
    let cursor = document.querySelector(".cursor");
    window.addEventListener("mousemove", (e) => {
      let cursor = document.getElementById("cursor");
      setTimeout(() => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
      }, 50);
    });

    document.querySelectorAll("h1, p, a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (
          el.tagName === "P" ||
          el.tagName === "H1" ||
          el.tagName === "A" ||
          el.tagName === "BUTTON"
        ) {
          cursor.classList.add("active");
        }
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
      });
    });

    const dashboard = document.querySelector(".dashboard-container");
    if (dashboard) {
      dashboard.addEventListener("mouseenter", (e) => {
        if (e.target === dashboard) {
          cursor.style.display = "none";
        }
      });
      dashboard.addEventListener("mouseleave", (e) => {
        if (e.target === dashboard) {
          cursor.style.display = "block";
        }
      });
    }
  }, []);

  return (
    <div id="rootforHome">
      <div className="qr"></div>
      <div className="cursor" id="cursor"></div>
      <div className="nav" id="nav">
        <Navbar />
      </div>
      <RefreshProvider>
        {/* Scoped overflow hidden */}
        <div className="content-container">
          <div className="recents" id="Recents">
            <Recents />
          </div>
          <div className="generate-section">
            <Generate />
          </div>
        </div>
      </RefreshProvider>
    </div>
  );
}

export default Home;
