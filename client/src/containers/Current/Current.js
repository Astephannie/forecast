import React from "react";
import {
  capitalize,
  formatLocalDate,
  kelvinToCelsius,
  kelvinToFahrenheit,
  mpsToKmph,
  mpsToMph,
} from "../../utils/utils";

const Current = ({
  current = {},
  pop = 0,
  unit = "",
  setUnit = () => {},
  selectDay = "",
  daily = [],
  city = {},
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
    <section className="frame">
      <div id="current" className="flex">
        <div className="frame-left center">
          <div className="temperature">
            {isCurrentDay ? (
              <>
                <img
                  src={`static/icons/${currentWeatherIcon}.svg`}
                  alt={`${currentWeatherIconDescription}`}
                  className="icon-weather"
                ></img>
                <h2>
                  {unit === "F"
                    ? kelvinToFahrenheit(data.temp)
                    : kelvinToCelsius(data.temp)}
                  °
                </h2>
              </>
            ) : (
              <>
                <img src={`static/icons/maxTemp.svg`} alt="Temperature"></img>
                <h3>
                  {unit === "F"
                    ? kelvinToFahrenheit(data.temp.max)
                    : kelvinToCelsius(data.temp.max)}
                  °
                </h3>
                <img src={`static/icons/minTemp.svg`} alt="Temperature"></img>
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
          <h4>{currentDescription}</h4>
        </div>
        <div className="frame-right right">
          <p className="country">{`${city?.country}`}</p>
          <h2>{city?.name}</h2>
          <p className="date">{`${dayOfWeek} ${isCurrentDay ? time : ""}`}</p>
          <div className="detail">
            <p>
              <strong>Humidity: </strong> {currentHumidity} %
            </p>
            <p>
              <strong>Wind: </strong>
              {unit === "F"
                ? `${mpsToMph(currentWind)} mph`
                : `${mpsToKmph(currentWind)} km/h`}
            </p>
            <p>
              <strong>Precipitation: </strong> {currentPrecipitation} %
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Current };
