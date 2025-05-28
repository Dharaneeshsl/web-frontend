import { use, useEffect } from "react";
import "./landingpage.css";
import Spline from "@splinetool/react-spline";
import { gsap } from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
    const navigate = useNavigate();
  const [disp, setDisp] = useState(false);
  function splineEvents(e) { setTimeout(() => {
        console.log(e)
        if (e.target.name === "Login"){
            navigate("/login");
        
        } else if (e.target.name === "QR"){
            navigate("/home");
        }
    },2000);
    };
  useEffect(() => {
    document.body.style.overflow='hidden';
    
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const randomChar = () =>
        chars[Math.floor(Math.random() * (chars.length - 1))],
      randomString = (length) =>
        Array.from(Array(length)).map(randomChar).join("");
    const card = document.querySelector(".box");
    const letters = card.querySelector(".box-letters");

    const handleOnMove = (e) => {
      letters.innerText = randomString(2500);
    };

    document.onmousemove = (e) => handleOnMove(e);

    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create(
      "hop",
      "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1 "
    );
    function splitTextIntoSpans(selector) {
      let elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        let text = element.innerText;
        let splitText = text
          .split("")
          .map(function (char) {
            return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
          })
          .join("");
        element.innerHTML = splitText;
      });
    }

    function animateCounter() {
      const counter = document.querySelector(".counter p");
      let curr = 0;
      const updateInterval = 300;
      const maxDuration = 2000;
      const end = 100;
      const startTime = Date.now();

      function updateCounter() {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < maxDuration) {
          curr = Math.min(curr + Math.floor(Math.random() * 30) + 5, end);
          counter.textContent = curr;
          setTimeout(updateCounter, updateInterval);
        } else {
          counter.textContent = curr;
          setTimeout(() => {
            gsap.fromTo(
              counter,
              { y: -20 },
              {
                y: -40,
                duration: 1,
                ease: "power3.inOut",
                onComplete: revealLandingPage,
              }
            );
          }, -500);
        }
      }
      updateCounter();
    }
    gsap.to(".counter p", {
      y: -20,
      duration: 1,
      ease: "power3.inOut",
      delay: 1,
      onComplete: animateCounter,
    });
    function revealLandingPage() {
      gsap.to(".hero", {
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
        duration: 2,
        ease: "hop",
        onStart: () => {
          const split = new SplitText(".header h1", { type: "words" });

          gsap.to(".hero", {
            transform: "translate(-50%, -50%) scale(1)",
            duration: 2.25,
            ease: "power3.inOut",
            delay: 0.25,
          });
          gsap.to(".overlay", {
            clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
            duration: 2,
            delay: 0.5,
            ease: "hop",
          });
          gsap.to(".hero-gradient img", {
            scale: 1,
            duration: 2.25,
            delay: 0.25,
            ease: "power3.inOut",
            onStart: () => {
              setDisp(true);
            },
          });

          gsap.fromTo(
            split.words,
            { y: 500 },
            {
              y: 0,
              stagger: 0.1,
              duration: 2,
              delay: 0.5,
              ease: "power4.inOut",
            }
          );
        },
      });
    }
    return(()=>{
      document.body.style.overflow='auto';
    })
  }, []);
  return (
    <>
      <div className="backgroundlanding">
        <div className="hideoverflow">
          <div className="counter">
            <p>0</p>
          </div>
          <section className="hero">
            <div className="overlay"></div>
            <nav>
              <div className="nav-col">
                <div className="nav-items">
                  <p>Qreator</p>
                </div>
              </div>
              <div className="nav-col nav-col1">
                <div className="nav-items">
                  <p>Home</p>
                </div>
                <div className="nav-items">
                  <p>About</p>
                </div>
                <div className="nav-items">
                  <p>Contact Us</p>
                </div>
              </div>
            </nav>

            <div className="header">
              <h1>
                Build Stunning QRs <br /> with us.
              </h1>
            </div>
            <div className="hero-gradient">
              <div className="box">
                <div className="box-letters"></div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="wrapvisible">
        <div className="wrapper">
          <div className="canvas-container">
            {disp ? (
              <Spline
                scene="https://prod.spline.design/L5jSVUgZLc-SRGoZ/scene.splinecode"
                onSplineMouseDown={splineEvents}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
