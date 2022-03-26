import React from "react";
import {
  capitalize,
  kelvinToCelsius,
  kelvinToFahrenheit,
} from "../../utils/utils";

const Current = ({ current = {}, pop = 0, unit = "", setUnit = () => {} }) => {
  const date = new Date(current.dt * 1000);
  const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }); // 01:12 PM
  const currentDate = dayOfWeek + " " + time;
  const currentWeatherIcon = current.weather[0].icon;
  const currentWeatherIconDescription = current.weather[0].main;
  const currentDescription = capitalize(current.weather[0].description);
  const currentHumidity = current.humidity;
  const currentWind = current.wind_speed;
  const currentPrecipitation = Math.round(pop * 100);

  const changeUnit = (e) => {
    const unit = e.target.value;
    setUnit(unit);
  };
  return (
    <div className="frame">
      <div id="current" className="flex">
        <div className="frame-left center">
          <div className="temperature">
            <img
              src={`/icons/${currentWeatherIcon}.svg`}
              alt={`${currentWeatherIconDescription}`}
            ></img>
            <h2>
              {unit === "F"
                ? kelvinToFahrenheit(current.temp)
                : kelvinToCelsius(current.temp)}
              °
            </h2>
            <div className="degrees">
              <button
                className={unit === "F" ? "selected" : ""}
                value="F"
                onClick={changeUnit}
              >
                F
              </button>
              <button
                className={unit === "C" ? "selected" : ""}
                value="C"
                onClick={changeUnit}
              >
                C
              </button>
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
