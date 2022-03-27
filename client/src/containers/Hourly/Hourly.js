import React from "react";
import { kelvinToCelsius, kelvinToFahrenheit } from "../../utils/utils";

const Hourly = ({ hourly, unit = "F" }) => {
  const getLabelFromDate = (dt) => {
    const date = new Date(dt * 1000);
    const str = date.toLocaleString();
    const hour = str.split(",")[1];
    const pureHour = hour.split(" ")[1];
    const part = hour.split(" ")[2];
    return pureHour.split(":")[0] + ":" + pureHour.split(":")[1] + part;
  };

  const generateTemperaturePoints = (temps) => {
    const max = Math.max(...temps);
    const min = Math.min(...temps);
    const cover = (max - min) / 100;
    const scaledTemps = temps.map((e) => Math.round((e - min) / cover) + 200);
    const invertedScaledTemps = scaledTemps.map((e) => 500 - (e + 50));
    const points = invertedScaledTemps.map((e, i) => [(i + 1) * 50, e]);
    return points;
  };

  const generatePointsStr = (points) => {
    let pointsStr = "";
    for (let point of points) {
      pointsStr += `${point[0]},${point[1]} `;
    }
    return pointsStr;
  };

  const splitData = hourly;
  const temps = splitData.map((e) => e.temp);
  const dts = splitData.map((e) => e.dt);
  const hours = dts.map((e) => getLabelFromDate(e));
  const points = generateTemperaturePoints(temps);
  const pointsStr = generatePointsStr(points);
  let tLabels = [];
  for (let i = 0; i < temps.length; i = i + 2) {
    tLabels.push(
      <text key={i} x={(i + 1) * 50} fill="#eee" y={points[i][1] - 20}>
        {unit === "F"
          ? kelvinToFahrenheit(temps[i]) + "°F"
          : kelvinToCelsius(temps[i]) + "°C"}
      </text>
    );
  }

  let xLabels = [];
  for (let i = 0; i < hours.length; i = i + 2) {
    xLabels.push(
      <text key={i} x={(i + 1) * 50} fill="#eee" y="470">
        {hours[i]}
      </text>
    );
  }
  return (
    <div className="frame">
      <h2 className="margin-0">Hourly</h2>
      <div className="hourly-graph">
        <svg
          version="1.2"
          viewBox="0 0 1300 500"
          xmlns="http://www.w3.org/2000/svg"
          className="graph"
          id="graph"
        >
          <title id="title">Hourly Temperature</title>
          <g className="labels x-labels" id="x-labels">
            {xLabels}
          </g>
          <g className="labels t-labels" id="t-labels">
            {tLabels}
          </g>
          <g className="grid y-grid" id="y-grid">
            <line x1="50" x2="1250" y1="450" y2="450"></line>
          </g>
          <g className="labels y-labels"></g>
          <polyline
            fill="none"
            stroke="#eee"
            strokeWidth="2"
            id="polyline"
            points={pointsStr}
          />
          <polygon
            fill="#eee"
            fillOpacity="0.2"
            stroke="none"
            points={`50,450 ${pointsStr} 1250,450`}
          ></polygon>
        </svg>
      </div>
    </div>
  );
};

export { Hourly };
