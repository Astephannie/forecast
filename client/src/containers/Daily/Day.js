import React from "react";
import {
  capitalize,
  formatLocalDate,
  kelvinToCelsius,
  kelvinToFahrenheit,
} from "../../utils/utils";

const Day = ({
  forecast = {},
  unit = "F",
  setSelectDay = () => {},
  selectDay,
}) => {
  const date = new Date(forecast.dt * 1000);
  const dayOfWeek = date.toLocaleString("en-us", { weekday: "short" });
  const day = date.getDate();
  const forecastDate = dayOfWeek + " " + day;
  const forecastIcon = forecast.weather[0].icon;
  const forecastIconDescription = forecast.weather[0].main;
  const forecastDescription = forecast.weather[0].description;

  const changeDay = () => {
    setSelectDay(formatLocalDate(forecast.dt));
  };

  return (
    <div
      className={`frame-daily center margin-top ${
        formatLocalDate(forecast.dt) === selectDay ? "selected" : ""
      }`}
      onClick={changeDay}
    >
      <h3>{forecastDate}</h3>
      <img
        src={`/icons/${forecastIcon}.svg`}
        alt={forecastIconDescription}
      ></img>
      <h4 className="margin-0">{forecastIconDescription}</h4>
      <div className="temperature margin-top">
        <span className="max_temperature">
          {unit === "F"
            ? kelvinToFahrenheit(forecast.temp.max)
            : kelvinToCelsius(forecast.temp.max)}
          °
        </span>
        <span className="min_temperature">
          {unit === "F"
            ? kelvinToFahrenheit(forecast.temp.min)
            : kelvinToCelsius(forecast.temp.min)}
          °
        </span>
      </div>
      <p>{capitalize(forecastDescription)}</p>
    </div>
  );
};

export { Day };
