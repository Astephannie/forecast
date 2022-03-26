import React from "react";

const Day = ({ forecast }) => {
  const date = new Date(forecast.dt * 1000);

  const forecastDate = `${date.toLocaleString("en-us", {
    weekday: "short",
  })} ${date.getDate()}`;
  const forecastMinTemperature = Math.round(
    (9 / 5) * (forecast.temp.min - 273) + 32
  );
  const forecastMaxTemperature = Math.round(
    (9 / 5) * (forecast.temp.max - 273) + 32
  );
  const forecastIcon = forecast.weather[0].icon;
  const forecastIconDescription = forecast.weather[0].main;
  const forecastDescription = forecast.weather[0].description;
  return (
    <div className="frame-daily center margin-top">
      <h3>{forecastDate}</h3>
      <img
        src={`/icons/${forecastIcon}.svg`}
        alt={forecastIconDescription}
      ></img>
      <h4 className="margin-0">{forecastIconDescription}</h4>
      <div className="temperature margin-top">
        <span className="max_temperature">{forecastMaxTemperature}°</span>
        <span className="min_temperature">{forecastMinTemperature}°</span>
      </div>
      <p>${forecastDescription}</p>
    </div>
  );
};

export { Day };
