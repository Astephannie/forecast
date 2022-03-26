import React from "react";
import {
  capitalize,
  formatLocalDate,
  kelvinToCelsius,
  kelvinToFahrenheit,
} from "../../utils/utils";

const Current = ({
  current = {},
  pop = 0,
  unit = "",
  setUnit = () => {},
  selectDay = "",
  daily = [],
}) => {
  let data = {};
  const isCurrentDay = selectDay === formatLocalDate(daily[0].dt);
  if (isCurrentDay) {
    data = current;
  } else {
    data = daily.find((e) => formatLocalDate(e.dt) === selectDay);
  }

  const date = new Date(data.dt * 1000);
  const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }); // 01:12 PM
  const currentWeatherIcon = data.weather[0].icon;
  const currentWeatherIconDescription = data.weather[0].main;
  const currentDescription = capitalize(data.weather[0].description);
  const currentHumidity = data.humidity;
  const currentWind = data.wind_speed;
  const currentPrecipitation = isCurrentDay
    ? Math.round(pop * 100)
    : Math.round(data.pop * 100);

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
              src={`static/icons/${currentWeatherIcon}.svg`}
              alt={`${currentWeatherIconDescription}`}
            ></img>
            {isCurrentDay ? (
              <h2>
                {unit === "F"
                  ? kelvinToFahrenheit(data.temp)
                  : kelvinToCelsius(data.temp)}
                °
              </h2>
            ) : (
              <>
                <h3>
                  {unit === "F"
                    ? kelvinToFahrenheit(data.temp.max)
                    : kelvinToCelsius(data.temp.max)}
                  °
                </h3>
                <h3>
                  {unit === "F"
                    ? kelvinToFahrenheit(data.temp.min)
                    : kelvinToCelsius(data.temp.min)}
                  °
                </h3>
              </>
            )}

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
          <p className="date">{`${dayOfWeek} ${isCurrentDay ? time : ""}`}</p>
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
