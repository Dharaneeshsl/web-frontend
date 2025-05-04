import React from 'react';
import './analytics.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';

<<<<<<< HEAD
import QRCODE from "./assets/asset-analytics.png"
import './analytics.css';


const mainChartData = [
  { name: 'JAN', uv: 400 },
  { name: 'FEB', uv: 870 },
  { name: 'MAR', uv: 600 },
  { name: 'APR', uv: 780 },
  { name: 'MAY', uv: 590 },
  { name: 'JUN', uv: 450 },
];

const ctrChartData = [
  { name: 'A', pv: 24 }, { name: 'B', pv: 13 }, { name: 'C', pv: 98 },
  { name: 'D', pv: 39 }, { name: 'E', pv: 48 }, { name: 'F', pv: 38 },
  { name: 'G', pv: 43 },
];

const regionChartData = [
    { name: 'A', pv: 10 }, { name: 'B', pv: 30 }, { name: 'C', pv: 20 },
    { name: 'D', pv: 50 }, { name: 'E', pv: 40 }, { name: 'F', pv: 70 },
    { name: 'G', pv: 60 },
];

const deviceChartData = [
    { name: 'A', pv: 5 }, { name: 'B', pv: 15 }, { name: 'C', pv: 8 },
    { name: 'D', pv: 25 }, { name: 'E', pv: 18 }, { name: 'F', pv: 30 },
    { name: 'G', pv: 22 },
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

function Analytics() { 
=======
function Analytics() {
  const mainChartData = [
    { name: 'JAN', uv: 400 },
    { name: 'FEB', uv: 870 },
    { name: 'MAR', uv: 600 },
    { name: 'APR', uv: 780 },
    { name: 'MAY', uv: 590 },
    { name: 'JUN', uv: 450 },
  ];
  
  const ctrChartData = [
    { name: 'A', pv: 24 }, { name: 'B', pv: 13 }, { name: 'C', pv: 98 },
    { name: 'D', pv: 39 }, { name: 'E', pv: 48 }, { name: 'F', pv: 38 },
    { name: 'G', pv: 43 },
  ];
  
  const regionChartData = [
      { name: 'A', pv: 10 }, { name: 'B', pv: 30 }, { name: 'C', pv: 20 },
      { name: 'D', pv: 50 }, { name: 'E', pv: 40 }, { name: 'F', pv: 70 },
      { name: 'G', pv: 60 },
  ];
  
  const deviceChartData = [
      { name: 'A', pv: 5 }, { name: 'B', pv: 15 }, { name: 'C', pv: 8 },
      { name: 'D', pv: 25 }, { name: 'E', pv: 18 }, { name: 'F', pv: 30 },
      { name: 'G', pv: 22 },
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
  }; // Rename this function if your file is called Analytics.jsx
>>>>>>> 9bda773afbe10e65e765dc1e36d5a7a0b9e231ea
  const longUrl = "https://helloworld.com";
  const shortUrl = "https://sh.rt/xyz";

  const highlightedPoint = mainChartData.find(p => p.uv === 870);

  return (
    <div className="dashboard-grid">
      <div className="grid-item item-statistics">
        <div className="widget-title">Statistics</div>
        <div className="subtitle">Total Clicks</div>
        <div className="large-value">1,027</div>
        <div className="percentage-change positive-change">+12.75%</div>
        <div className="main-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={mainChartData}
                margin={{ top: 5, right: 10, left: -30, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                fontSize={10}
                stroke="#888"
              />
              <YAxis hide={true} domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#555', strokeDasharray: '3 3' }} />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6, fill: '#8884d8', stroke: '#1a1a1a', strokeWidth: 2 }}
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
                    <text x={highlightedPoint.name} y={highlightedPoint.uv} dy={-12} fontSize="10" fill="#fff" textAnchor="middle">
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
<<<<<<< HEAD
         
=======
       
>>>>>>> 9bda773afbe10e65e765dc1e36d5a7a0b9e231ea
        </div>
        <div className="qr-details">
           <span><span className="label">Created dt:</span> <span className="value">12 Feb</span></span>
           <span><span className="label">Expiry dt:</span> <span className="value">15 Feb</span></span>
           <span><span className="label">Long URL:</span> <span className="value">{longUrl}</span></span>
           <div className="short-url-section">
             <span className="short-url-text">{shortUrl}</span>
             <div className="short-url-icons">
<<<<<<< HEAD
             <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="11" fill="#cccccc"/>

  <rect x="5" y="5" width="8" height="8"
        fill="none"
        stroke="#333333"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round" />

  <rect x="8" y="8" width="8" height="8"
        fill="#cccccc"
        stroke="#333333"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round" />
</svg>
=======
               
>>>>>>> 9bda773afbe10e65e765dc1e36d5a7a0b9e231ea
             </div>
           </div>
        </div>
      </div>

      <div className="grid-item item-ctr">
        <div className="widget-title">CTR</div>
        <div className="large-value">5.69%</div>
        <div className="percentage-change negative-change">-7.49%</div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ctrChartData} margin={{ top: 10, right: 5, left: 5, bottom: 0 }}>
              <Tooltip wrapperStyle={{ display: 'none' }} />
              <Line type="monotone" dataKey="pv" stroke="#ff6666" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-item item-region">
        <div className="widget-title">Region</div>
        <div className="large-value">4</div>
        <div className="percentage-change positive-change">+18.30%</div>
         <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={regionChartData} margin={{ top: 10, right: 5, left: 5, bottom: 0 }}>
              <Tooltip wrapperStyle={{ display: 'none' }} />
              <Line type="monotone" dataKey="pv" stroke="#33cc99" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-item item-device">
        <div className="widget-title">Device</div>
        <div className="large-value">9</div>
        <div className="percentage-change positive-change">+21.01%</div>
         <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={deviceChartData} margin={{ top: 10, right: 5, left: 5, bottom: 0 }}>
              <Tooltip wrapperStyle={{ display: 'none' }} />
              <Line type="monotone" dataKey="pv" stroke="#5599ff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;