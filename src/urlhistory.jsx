import "./urlhistory.css";

import Navbar from "./navbar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import model1 from "./assets/model1.png";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UrlHistory() {
  const navigate=useNavigate()
  const { userid } = useAuth();
  const scrollRef = useRef(null);
  const outRef = useRef(null);
  const [record, setRecord] = useState([]);
  const [historyrefresh, sethistoryrefresh] = useState(0);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${day} ${month.toUpperCase()}`;
  }

  const redirect = (shortCode) => {
    window.open(
      `http://127.0.0.1:5000/analytics/${shortCode}`,
      "_blank",
      "noopener"
    );
  };
  const handleDelete = (shortCode) => {
    toast
      .promise(
        axios.delete("http://127.0.0.1:5000/admin/delete", {
          data: { shortCode: shortCode },
        }),
        {
          loading: "Deleting",
          success: "Deleted",
          error: "Delete failed",
        }
      )
      .then((response) => {
        sethistoryrefresh((prev) => prev + 1);
      });
  };
  useEffect(() => {
    console.log(localStorage.getItem("userid"));
    axios
      .post("http://127.0.0.1:5000/admin/all", {
        userid: userid,
      })
      .then((response) => {
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
  }, [historyrefresh]);

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
                    <img
                      src={`data:image/png;base64,${item.base64img}`}
                      alt=""
                    />
                    <div className="columnflex">
                      <div className="info">
                        <p>Created at :{formatDate(item.createdAt)}</p>
                        <p>
                          short url{" "}
                          <a href="" onClick={()=>{redirect(item.shortCode)}}>
                            short/{item.shortCode}
                          </a>
                        </p>
                        <p className="anbtn" onClick={()=>navigate("/dashboard") }>View Analytics</p>
                      </div>
                      <div className="actionbtn">
                        <button
                          className="copy-button"
                          onClick={() => handleDelete(item.shortCode)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            fill="#000000"
                            height="800px"
                            width="800px"
                            version="1.1"
                            id="Layer_1"
                            viewBox="0 0 284.011 284.011"
                            xml:space="preserve"
                          >
                            <g>
                              <g>
                                <path d="M235.732,66.214l-28.006-13.301l1.452-3.057c6.354-13.379,0.639-29.434-12.74-35.789L172.316,2.611    c-6.48-3.079-13.771-3.447-20.532-1.042c-6.76,2.406-12.178,7.301-15.256,13.782l-1.452,3.057L107.07,5.106    c-14.653-6.958-32.239-0.698-39.2,13.955L60.7,34.155c-1.138,2.396-1.277,5.146-0.388,7.644c0.89,2.499,2.735,4.542,5.131,5.68    l74.218,35.25h-98.18c-2.797,0-5.465,1.171-7.358,3.229c-1.894,2.059-2.839,4.815-2.607,7.602l13.143,157.706    c1.53,18.362,17.162,32.745,35.588,32.745h73.54c18.425,0,34.057-14.383,35.587-32.745l11.618-139.408l28.205,13.396    c1.385,0.658,2.845,0.969,4.283,0.969c3.74,0,7.328-2.108,9.04-5.712l7.169-15.093C256.646,90.761,250.386,73.175,235.732,66.214z     M154.594,23.931c0.786-1.655,2.17-2.905,3.896-3.521c1.729-0.614,3.59-0.521,5.245,0.267l24.121,11.455    c3.418,1.624,4.878,5.726,3.255,9.144l-1.452,3.057l-36.518-17.344L154.594,23.931z M169.441,249.604    c-0.673,8.077-7.55,14.405-15.655,14.405h-73.54c-8.106,0-14.983-6.328-15.656-14.405L52.35,102.728h129.332L169.441,249.604z     M231.62,96.835l-2.878,6.06L83.057,33.701l2.879-6.061c2.229-4.695,7.863-6.698,12.554-4.469l128.661,61.108    C231.845,86.509,233.85,92.142,231.62,96.835z" />
                              </g>
                            </g>
                          </svg>
                        </button>
                        <button className="copy-button" aria-label="Copy link">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M5.8335 8.33337L10.0002 12.5L14.1668 8.33337"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M10 12.5V2.5"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
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
