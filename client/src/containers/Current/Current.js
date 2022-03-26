import React from "react";
import { capitalize } from "../../utils/utils";

const Current = ({ current = {}, pop = 0 }) => {
  const date = new Date(current.dt * 1000);
  const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }); // 01:12 PM
  const currentDate = dayOfWeek + " " + time;
  const currentTempCelsius = current.temp - 273.15;
  const currentTempFahrenheit = Math.round((9 / 5) * currentTempCelsius + 32);
  const currentWeatherIcon = current.weather[0].icon;
  const currentWeatherIconDescription = current.weather[0].main;
  const currentDescription = capitalize(current.weather[0].description);
  const currentHumidity = current.humidity;
  const currentWind = current.wind_speed;
  const currentPrecipitation = Math.round(pop * 100);

  return (
    <div className="frame">
      <div id="current" className="flex">
        <div className="frame-left center">
          <div className="temperature">
            <img
              src={`/icons/${currentWeatherIcon}.svg`}
              alt={`${currentWeatherIconDescription}`}
            ></img>
            <h2>{currentTempFahrenheit}°</h2>
            <div className="degrees">
              <p className="selected">F</p>
              <p>C</p>
            </div>
          </div>
          <h3>{currentDescription}</h3>
        </div>
        <div className="frame-right right">
          <h2>Washington, DC</h2>
          <p className="date">{currentDate}</p>
          <p>
            <strong>Humidity: </strong> {currentHumidity} %
          </p>
          <p>
            <strong>Wind: </strong> {currentWind} m/sec
          </p>
          <p>
            <strong>Precipitation: </strong> {currentPrecipitation} %
          </p>
        </div>
      </div>
    </div>
  );
};

export { Current };
