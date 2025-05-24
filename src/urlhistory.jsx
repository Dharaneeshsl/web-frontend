import "./urlhistory.css";

import Navbar from "./navbar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import model1 from './assets/model1.png'
export default function UrlHistory() {
  const scrollRef = useRef(null);
  const outRef = useRef(null);
  const [record, setRecord] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/analytics/all").then((response) => {
      setRecord(response);
      console.log(response.data);
    });
    const el = scrollRef.current;
    const out = outRef.current;

    const onWheel = (e) => {
      // 1. Scroll manually
      el.scrollTop += e.deltaY;

      // 2. Highlight logic
      const items = el.querySelectorAll(".items");
      const containerRect = el.getBoundingClientRect();

      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestItem = null;
      let minDistance = Infinity;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - containerCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestItem = item;
        }
      });

      items.forEach((item) => {
        item.classList.remove("urlactive");
        item.style.opacity = "0.3";
        item.style.transform = "scale(1)";
      });

      if (closestItem) {
        closestItem.classList.add("urlactive");
        closestItem.style.opacity = "1";
        closestItem.style.transform = "scale(1.2)";
      }
    };

    out.addEventListener("wheel", onWheel);

    return () => {
      out.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <>
      <div className="listbg" ref={outRef}>
        <div className="visib">
          <div className="listcont" ref={scrollRef}>
            <div className="itemlist">
              <div className="nullitem"></div>
              {Array.isArray(record.data) &&
                record.data.map((item, idx) => (
                  <div className="items" key={idx}>
                    <img src={model1} alt="" />
                    <div className="info">
                    <p>{item.longUrl}</p>
                    <p>short/{item.shortCode}</p></div>
                  </div>
                ))}
              <div className="nullitem"></div>
            </div>
          </div>

          <div className="logo">
            <h1>History</h1>
          </div>
        </div>
      </div>
    </>
  );
}
