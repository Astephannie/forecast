import React, { useEffect, useState } from "react";
import { Current } from "./containers/Current/Current";
import { Daily } from "./containers/Daily/Daily";
import { Hourly } from "./containers/Hourly/Hourly";
import { useRequest } from "./hooks/request";
import { getCity, getOneCall } from "./api/openweather";
import {
  formatLocalDate,
  getLocation,
  errorCodeMessage,
  getGeoLocationStatus,
  getGeoLocationMessage,
} from "./utils/utils";

const App = () => {
  const [position, setPosition] = useState({ lat: null, lon: null });
  const [unit, setUnit] = useState("F");
  const [data, setData] = useState({});
  const [selectDay, setSelectDay] = useState("");
  const [geolocationStatus, setGeolocationStatus] = useState(null);

  const {
    data: success,
    loading,
    error,
    makeRequest: getData,
  } = useRequest({
    request: getOneCall,
    lazy: true,
  });

  const { data: city, makeRequest: getCityData } = useRequest({
    request: getCity,
    lazy: true,
  });

  useEffect(() => {
    getLocation((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      setPosition({ lat, lon });
    });
    if (localStorage.getItem("Unit")) {
      setUnit(localStorage.getItem("Unit"));
    } else {
      localStorage.setItem("Unit", unit);
    }

    getGeoLocationStatus()
      .then((status) => {
        setGeolocationStatus(status);
      })
      .catch((error) => console.log({ error }));
  }, []);

  useEffect(() => {
    if (position.lat !== null && position.lon !== null) {
      getData({ lat: position.lat, lon: position.lon });
      getCityData({ lat: position.lat, lon: position.lon });
    }
  }, [position]);

  useEffect(() => {
    if (success) {
      setData(success);
      setSelectDay(formatLocalDate(success.daily[0].dt));
    }
  }, [success]);

  const changeUnit = (unit) => {
    setUnit(unit);
    localStorage.setItem("Unit", unit);
  };

  return (
    <div className="container">
      <></>
      {position.lat === null && position.lon === null && (
        <p className="initial-message">
          {getGeoLocationMessage(geolocationStatus)}
        </p>
      )}
      {loading && <p className="initial-message">Loading ...</p>}
      {error && (
        <p className="initial-message">{errorCodeMessage(error.status)}</p>
      )}
      {data?.current && data?.daily.length > 0 && data?.hourly.length > 0 && (
        <>
          <Current
            current={data.current}
            pop={data.hourly[0].pop}
            unit={unit}
            setUnit={changeUnit}
            daily={data.daily}
            selectDay={selectDay}
            city={city}
          />
          <Daily
            daily={data.daily}
            unit={unit}
            setSelectDay={setSelectDay}
            selectDay={selectDay}
          />
          <Hourly hourly={data.hourly} unit={unit} />
        </>
      )}
    </div>
  );
};

export { App };
