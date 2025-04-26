import './scrollcards.css';
import asset2 from "./assets/asset2.png";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);
function ScrollCards() {
  useGSAP(() => {

    const stickySection = document.querySelector(".steps");
    const stickHeight = window.innerHeight * 3;
    const cards = document.querySelectorAll(".hiscard");
    const totalCards = cards.length;

    if (!stickySection || cards.length === 0) {
      console.error("Sticky section or cards not found in the DOM.");
      return;
    }

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickHeight}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      markers: false,

      onUpdate: (self) => {
        gsap.set(stickySection, {x: 0, y: 0});
        positionCards(self.progress);
      },
    });

    const getRadius = () => {
      return window.innerWidth < 900
        ? window.innerWidth * 7.5
        : window.innerWidth * 2.5;
    };

    const arcAngle = Math.PI * 0.4;
    const startAngle = Math.PI / 2 - arcAngle / 2;

    function positionCards(progress = 0) {
      const radius = getRadius();
      const totalTravel = 1 + totalCards / 7.5;
      const adjustedProgress = (progress * totalTravel - 1) * 0.75;

      cards.forEach((card, i) => {
        const normalizedProgress = (totalCards - 1 - i) / totalCards;
        const cardProgress = normalizedProgress + adjustedProgress;
        const angle = startAngle + arcAngle * cardProgress;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const rotation = (angle - Math.PI / 2) * (180 / Math.PI);
        gsap.set(card, {
          x: x,
          y: -y + radius,
          rotation: -rotation,
          transformOrigin: "center center",
        });
      });
    }

    positionCards(0);
  });
  return (
    <>
      <div className="history-content">

        <section className='intro'></section>
        
        <section className="steps">
    
          <div className="hiscards">
            <div className="hiscard">
              <div className="card-img">
                <img src={asset2} alt="" />
              </div>
              <div className="card-content">
                <p>short/dejde</p>
              </div>
            </div>
            <div className="hiscard">
              <div className="card-img">
                <img src={asset2} alt="" />
              </div>
              <div className="card-content">
                <p>short/sjdoij</p>
              </div>
            </div>
            <div className="hiscard">
              <div className="card-img">
                <img src={asset2} alt="" />
              </div>
              <div className="card-content">
                <p>short/dejde</p>
              </div>
            </div>
            <div className="hiscard">
              <div className="card-img">
                <img src={asset2} alt="" />
              </div>
              <div className="card-content">
                <p>short/sjdoij</p>
              </div>
            </div>
            <div className="hiscard empty"> </div>
            <div className="hiscard empty"></div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ScrollCards;
