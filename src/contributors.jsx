import "./contributors.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import asset1 from "./assets/model1.png";
import SplitText from "gsap/SplitText";
export default function Contributors() {
  const contributors = [
    { id: 3, name: "HARI PRAKKASH S" },
    { id: 4, name: "DHARANEESH S L" },

    { id: 6, name: "SUBHA SUBBIAH" },
    { id: 5, name: "PRAVIN RAMANAA S" },
    { id: 7, name: "PREETHI PS" },
    { id: 1, name: "AHAMED SHALMAN H" },
    { id: 2, name: "ARRVINDH PK" },
    { id: 1, name: "AHAMED SHALMAN H" },
    { id: 2, name: "ARRVINDH PK" },
    { id: 3, name: "HARI PRAKKASH S" },
    { id: 4, name: "DHARANEESH S L" },
    { id: 5, name: "PRAVIN RAMANAA S" },
    { id: 6, name: "SUBHA SUBBIAH" },
    { id: 7, name: "PREETHI PS" },
    { id: 1, name: "AHAMED SHALMAN H" },
    { id: 2, name: "ARRVINDH PK" },
    { id: 3, name: "HARI PRAKKASH S" },
    { id: 4, name: "DHARANEESH S L" },
    { id: 5, name: "PRAVIN RAMANAA S" },
    { id: 6, name: "SUBHA SUBBIAH" },
    { id: 7, name: "PREETHI PS" },
    { id: 1, name: "AHAMED SHALMAN H" },
    { id: 2, name: "ARRVINDH PK" },
    { id: 3, name: "HARI PRAKKASH S" },
    { id: 4, name: "DHARANEESH S L" },
    { id: 5, name: "PRAVIN RAMANAA S" },
    { id: 6, name: "SUBHA SUBBIAH" },
    { id: 7, name: "PREETHI PS" },
    { id: 1, name: "AHAMED SHALMAN H" },
    { id: 2, name: "ARRVINDH PK" },
    { id: 3, name: "HARI PRAKKASH S" },
    { id: 4, name: "DHARANEESH S L" },
    { id: 5, name: "PRAVIN RAMANAA S" },
    { id: 6, name: "SUBHA SUBBIAH" },
    { id: 7, name: "PREETHI PS" },
    { id: 1, name: "AHAMED SHALMAN H" },
    { id: 2, name: "ARRVINDH PK" },
    { id: 3, name: "HARI PRAKKASH S" },
    { id: 4, name: "DHARANEESH S L" },
    { id: 5, name: "PRAVIN RAMANAA S" },
    { id: 6, name: "SUBHA SUBBIAH" },
    { id: 7, name: "PREETHI PS" },
    { id: 1, name: "AHAMED SHALMAN H" },
    { id: 2, name: "ARRVINDH PK" },
    { id: 3, name: "HARI PRAKKASH S" },
    { id: 4, name: "DHARANEESH S L" },
    { id: 5, name: "PRAVIN RAMANAA S" },
    { id: 6, name: "SUBHA SUBBIAH" },
    { id: 7, name: "PREETHI PS" },
    { id: 1, name: "AHAMED SHALMAN H" },
    { id: 2, name: "ARRVINDH PK" },
    { id: 3, name: "HARI PRAKKASH S" },
    { id: 4, name: "DHARANEESH S L" },
    { id: 5, name: "PRAVIN RAMANAA S" },
    { id: 6, name: "SUBHA SUBBIAH" },
    { id: 7, name: "PREETHI PS" },
  ];

  const idToImageMap = {
    1: "https://plus.unsplash.com/premium_photo-1664102191724-97e85d71a61a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29vbCUyMGJveXxlbnwwfHwwfHx8MA%3D%3D",
    2: "https://images.unsplash.com/photo-1531875506263-dfcc69e73475?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    3: "https://plus.unsplash.com/premium_photo-1685125884840-9884a7b9c059?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGNvb2x8ZW58MHx8MHx8fDA%3D",
    4: "https://images.unsplash.com/photo-1508138221679-760a23a2285b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGNvb2x8ZW58MHx8MHx8fDA%3D",
    5: "https://plus.unsplash.com/premium_photo-1682098461191-c586a6793938?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29vbCUyMGJveXxlbnwwfHwwfHx8MA%3D%3D",
    6: "https://plus.unsplash.com/premium_photo-1685125884825-bd5681e1d65f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGNvb2x8ZW58MHx8MHx8fDA%3D",
    7: "https://images.unsplash.com/photo-1609743298585-be801883393f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNvb2x8ZW58MHx8MHx8fDA%3D",
  };
  const followRef = useRef(null); // Ref for the follow container
  const galleryRef = useRef(null);
  const firstFrame = useRef(null);
  const butRef = useRef(null); // Ref for the gallery container
  const svgarrow = useRef(null);
  const headref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    const headRef = headref.current;
    const follow = followRef.current;
    const gallery = galleryRef.current;
    const but = butRef.current;
    const arrow = svgarrow.current;
    const numberOfItems = 60;
    const radius = 1100;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angleIncrement = (2 * Math.PI) / numberOfItems;
    const firstframe = firstFrame.current;
    gsap.to(firstframe, {
      top: "0",
      duration: 3,
      ease: "power3.inOut",
    });

    const heading = document.querySelector(".heading h1");

    // Initialize SplitText after fonts are loaded
    const split = new SplitText(heading, { type: "chars" });

    console.log(split);
    gsap.fromTo(
      split.chars,
      {
        y: -100,
      },
      {
        y: 0,
        duration: 0.5,
        stagger: {
          each: 0.05,
          from: "center",
          grid: "auto",
        },
        ease: "power1.inOut",
        delay: 1,
      }
    );

    gsap.set(but, { width: 0 });
    gsap.fromTo(
      but,
      { width: 0 },
      { width: 150, duration: 4, ease: "power3.inOut" }
    );
    let s;

    gsap.set(gallery, { opacity: 0 });

    but.onclick = () => {
      gsap.to(firstframe, {
        top: "-100vh",
        duration: 3,
        ease: "power3.inOut",
      });
      gsap.set(gallery, {
        duration: 20,
        opacity: 1,
      });
    };

    for (let i = 0; i < 40; i++) {
      const item = document.createElement("div");
      item.className = "item";
      const p = document.createElement("p");
      p.textContent = contributors[i].name;
      item.appendChild(p);
      gallery.appendChild(item);
      const angle = i * angleIncrement;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const rotation = (angle * 180) / Math.PI;
      gsap.set(item, {
        x: x + "px",
        y: y + "px",
        rotation: rotation,
      });

      item.addEventListener("mouseover", () => {
        const img1 = document.createElement("img");
        img1.src = idToImageMap[contributors[i].id];
        img1.style.clipPath = "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";

        follow.appendChild(img1);

        gsap.to(img1, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",

          duration: 1,
          ease: "power3.Out",
        });
      });

      item.addEventListener("mouseout", () => {
        const imgs = follow.getElementsByTagName("img");
        if (imgs.length) {
          const lastImg = imgs[imgs.length - 1];
          Array.from(imgs).forEach((img, index) => {
            if (img !== lastImg) {
              gsap.to(img, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1,
                ease: "power3.Out",
                onComplete: () => {
                  setTimeout(() => {
                    img.remove();
                  }, 1000);
                },
              });
            }
          });
          gsap.to(lastImg, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "power3.Out",
            delay: 0.25,
          });
        }
      });
    }

    function updatePosition() {
      const scrollAmount = window.scrollY * 0.001;
      document.querySelectorAll(".item").forEach((item, index) => {
        const angle = index * angleIncrement + scrollAmount;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const rotation = (angle * 180) / Math.PI;
        gsap.to(item, {
          x: x + "px",
          y: y + "px",
          rotation: rotation,
          duration: 0.05,
          ease: "elastic.out(1,0.3)",
        });
      });
    }

    updatePosition();
    document.addEventListener("scroll", updatePosition);
    document.addEventListener("mousemove", function (e) {
      gsap.to(follow, {
        x: e.clientX - 150 + "px",
        y: e.clientY - 200 + "px",
        duration: 1,
        ease: "power3.Out",
      });
    });
  }, []);
  return (
    <>
      <div className="contrib-container">
        <div className="firstframe" ref={firstFrame}>
          <div className="wrapheading">
            <div className="heading">
              {" "}
              <h1 ref={headref}>CONTRIBUTORS</h1>
            </div>
          </div>
          <div className="viewbtn" ref={butRef}>
            <button className="here">Here</button>{" "}
            <div className="svgbg" ref={svgarrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="follow" ref={followRef}></div>
        <div className="cont">
          <div className="gallery" ref={galleryRef}></div>
        </div>
      </div>
    </>
  );
}
