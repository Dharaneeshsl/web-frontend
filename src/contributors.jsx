import "./contributors.css";
import { useEffect, useRef } from "react";
export default function Contributors() {
  var data = {
    "Ahamed Shalman H": { role:"Frontend/Backend",login: "cpushalman", commits: 87, prs: 6 },
    "Hari Prakash": { role:"Frontend", login: "whiteshadefthp", commits: 8, prs: 2 },
    "Dharaneesh SL": { role:"Frontend",login: "Dharaneeshsl", commits: 5, prs: 2 },
    "Subha Subbiah": { role:"Backend",login: "subha - subbiah", commits: 8, prs: 21 },
    "Preethi PS": { role:"Backend",login: "PreethiCodes", commits: 47, prs: 7 },
    "Arrvindh PK": {role:"Backend", login: "ARRVINDHPK", commits: 12, prs: 11 },
    "Pravin Ramanna": {role:"Backend", login: "pravin2221", commits: 11, prs: 8 },
  };
  const coms = {
    cpushalman: 79,
    whiteshadefthp: 3,
    Dharaneeshsl: 5,
    PreethiCodes: 47,
    "subha-subbiah": 8,
    ARRVINDHPK: 12,
    pravin2221: 11,
    akashShanmugraj: 2,
  };
  const pulls = {
    PreethiCodes: 7,
    "subha-subbiah": 21,
    cpushalman: 6,
    ARRVINDHPK: 11,
    pravin2221: 8,
    akashShanmugraj: 2,
    whiteshadefthp: 1,
    Dharaneeshsl: 2,
  };

  return (
    <>
      <div className="contributors-root">
        <h1>Contributors</h1>
        {Object.entries(data).map(([key,value])=>(
          <div className="contributors" key={key}>
          <div className="profile"></div>
          <div className="details">
            <div className="name">
              <p>{key}</p>
            </div>
            <div className="git">
              <p>github:@{value.login}</p>{" "}
            </div>
            <div className="cont">
              <div className="commits">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-git-commit"
                >
                  <circle cx="12" cy="12" r="4" />
                  <line x1="1.05" y1="12" x2="7" y2="12" />
                  <line x1="17.01" y1="12" x2="22.96" y2="12" />
                </svg>
              </div>
              <p>{value.commits}</p>
              <div className="pulls">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  width="800px"
                  height="800px"
                  viewBox="0 0 512 512"
                >
                  <title>ionicons-v5-d</title>
                  <path d="M192,96a64,64,0,1,0-96,55.39V360.61a64,64,0,1,0,64,0V151.39A64,64,0,0,0,192,96ZM128,64A32,32,0,1,1,96,96,32,32,0,0,1,128,64Zm0,384a32,32,0,1,1,32-32A32,32,0,0,1,128,448Z" />
                  <path d="M416,360.61V156a92.1,92.1,0,0,0-92-92H304V32a16,16,0,0,0-27.31-11.31l-64,64a16,16,0,0,0,0,22.62l64,64A16,16,0,0,0,304,160V128h20a28,28,0,0,1,28,28V360.61a64,64,0,1,0,64,0ZM384,448a32,32,0,1,1,32-32A32,32,0,0,1,384,448Z" />
                </svg>
              </div>
              <p>{value.prs}</p>
            </div>
            <div className="role">
              <p>{value.role}</p>
            </div>
          </div>
        </div>
        ))}
        
      </div>
    </>
  );
}
