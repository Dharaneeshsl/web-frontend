import React, { useEffect, useState } from "react";
import "./analytics.css";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  CartesianGrid,
} from "recharts";
import asset2 from "./assets/model1.png";
import "./analytics.css";
import logo from "./assets/logo.png";

const mainChartData = [
  { name: "JAN", uv: 400 },
  { name: "FEB", uv: 870 },
  { name: "MAR", uv: 600 },
  { name: "APR", uv: 780 },
  { name: "MAY", uv: 590 },
  { name: "JUN", uv: 450 },
];

const ctrChartData = [
  { name: "A", pv: 24 },
  { name: "B", pv: 13 },
  { name: "C", pv: 98 },
  { name: "D", pv: 39 },
  { name: "E", pv: 48 },
  { name: "F", pv: 38 },
  { name: "G", pv: 43 },
];

const regionChartData = [
  { name: "A", pv: 10 },
  { name: "B", pv: 30 },
  { name: "C", pv: 20 },
  { name: "D", pv: 50 },
  { name: "E", pv: 40 },
  { name: "F", pv: 70 },
  { name: "G", pv: 60 },
];

const deviceChartData = [
  { name: "A", pv: 5 },
  { name: "B", pv: 15 },
  { name: "C", pv: 8 },
  { name: "D", pv: 25 },
  { name: "E", pv: 18 },
  { name: "F", pv: 30 },
  { name: "G", pv: 22 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-default-tooltip">
        <p className="recharts-tooltip-label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

function Analytics({ id }) {
  const longUrl = "https://helloworld.com";
  const shortUrl = "https://sh.rt/xyz";
  const [chartData, setChartData] = useState();
  const [analyticsQR, setAnalyticsQR] = useState();
  const [record, setRecord] = useState();
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    axios
      .get(`https://web-backend-sdfc.onrender.com/analytics/analytics/${id}`)
      .then((response) => {
        setAnalyticsQR(response.data.base64img);
        setRecord(response.data);
        setShowContent(true);
        console.log(response.data);
        const clicks = response.data.click_data;

        // Step 1: Count clicks per day
        const clickCounts = {};
        clicks.forEach((click) => {
          const date = click.date_time.substring(0, 10);
          // assumes 'YYYY-MM-DD'
          clickCounts[date] = (clickCounts[date] || 0) + 1;
        });

        // Step 2: Convert to array and sort by date
        const sortedDates = Object.entries(clickCounts).sort(
          ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
        );

        // Step 3: Take the last 7 days
        const last7 = sortedDates.slice(-7);

        // Step 4: Format for Recharts or similar
        // Step 4: Format for Recharts or similar
        const formatted = last7.map(([date, count]) => ({
          date: new Date(date)
            .toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })
            .toUpperCase(),
          clicks: count,
        }));
        setChartData(formatted);

        console.log(record);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const highlightedPoint = mainChartData.find((p) => p.uv === 870);

  return (
    <div className="rootforanalytics">
      {showContent && (
        <div className="dashboard-cont">
          <img src={logo} alt="" className="gold-logo" />
          <div className="dashboard-grid">
            <div className="grid-item item-statistics">
              <div className="flex3">
                <div className="flex1">
                  <div className="widget-title statlarge">Statistics</div>
                  <div className="subtitle statsmall">Total Clicks</div>
                </div>
                <div className="flex2">
                  <div className="large-value intlarge">{record.totalClicks}</div>
                  <div className="percentage-change positive-change intsmall">
                    +12.75%
                  </div>
                </div>
              </div>
              <div className="main-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 10, left: -30, bottom: 5 }}
                  >
                    <CartesianGrid
                      vertical={true}
                      horizontal={false}
                      strokeDasharray="3 6"
                      stroke="#333"
                    />
                    <XAxis
                      dataKey="date"
                      interval={0}
                      axisLine={false}
                      tickLine={false}
                      fontSize={10}
                      tickCount={12}
                      stroke="#888"
                    />
                    <YAxis hide={true} domain={["dataMin-3", "dataMax+5"]} />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ stroke: "#555", strokeDasharray: "3 3" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="#8884d8"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{
                        r: 6,
                        fill: "#8884d8",
                        stroke: "#1a1a1a",
                        strokeWidth: 2,
                      }}
                    />
                    {highlightedPoint && (
                      <ReferenceDot
                        x={highlightedPoint.name}
                        y={highlightedPoint.uv}
                        r={8}
                        fill="#fff"
                        stroke="#8884d8"
                        strokeWidth={2}
                        isFront={true}
                      >
                        <text
                          x={highlightedPoint.name}
                          y={highlightedPoint.uv}
                          dy={-12}
                          fontSize="10"
                          fill="#fff"
                          textAnchor="middle"
                        >
                          {highlightedPoint.uv}
                        </text>
                      </ReferenceDot>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid-item item-qrcode">
              <div className="qr-code-container">
                <img src={`data:image/png;base64,${analyticsQR}`} alt="" />
              </div>
              <div className="qr-details">
                <span>
                  <span className="label">Created at:</span>{" "}
                  <span className="value">12 Feb</span>
                </span>
                <span>
                  <span className="label">Expiry at:</span>{" "}
                  <span className="value">15 Feb</span>
                </span>
                <span>
                  <span className="label">Long URL:</span>{" "}
                  <span className="value">{longUrl}</span>
                </span>
                <div className="short-url-section">
                  <span className="short-url-text value">{shortUrl}</span>
                  <div className="short-url-icons">
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

                    <button className="copy-button" aria-label="Copy link">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-item item-ctr">
              <div className="widget-title">
                <h1>CTR</h1>
              </div>
              <div className="large-value">
                <p>5.69%</p>
              </div>
              <div className="percentage-change negative-change">
                <p>-7.49%</p>
              </div>

              <div className="chart-container">
                <ResponsiveContainer width="90%" height="100%">
                  <LineChart
                    data={ctrChartData}
                    margin={{ top: 10, right: 5, left: 5, bottom: 0 }}
                  >
                    <Tooltip wrapperStyle={{ display: "none" }} />
                    <Line
                      type="linear"
                      dataKey="pv"
                      stroke="#ff6666"
                      strokeWidth={5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid-item item-region">
              <div className="widget-title">
                <h1>Region</h1>
              </div>
              <div className="large-value">
                <p>4</p>
              </div>
              <div className="percentage-change positive-change">
                <p>+18.30%</p>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="90%" height="100%">
                  <LineChart
                    data={regionChartData}
                    margin={{ top: 10, right: 5, left: 5, bottom: 0 }}
                  >
                    <Tooltip wrapperStyle={{ display: "none" }} />
                    <Line
                      type="linear"
                      dataKey="pv"
                      stroke="#33cc99"
                      strokeWidth={5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid-item item-device">
              <div className="widget-title">
                <h1>Device</h1>
              </div>
              <div className="large-value">
                <p>9</p>
              </div>
              <div className="percentage-change positive-change">
                <p>+21.01%</p>
              </div>

              <div className="chart-container">
                <ResponsiveContainer width="90%" height="100%">
                  <LineChart
                    data={deviceChartData}
                    margin={{ top: 10, right: 5, left: 5, bottom: 0 }}
                  >
                    <Tooltip wrapperStyle={{ display: "none" }} />
                    <Line
                      type="linear"
                      dataKey="pv"
                      stroke="#5599ff"
                      strokeWidth={5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
