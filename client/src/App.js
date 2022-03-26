import React, { useEffect, useState } from "react";
import { Current } from "./containers/Current/Current";
import { Daily } from "./containers/Daily/Daily";
import { Hourly } from "./containers/Hourly/Hourly";
import { useRequest } from "./hooks/request";
import { getOneCall } from "./api/openweather";
import { getLocation } from "./utils/utils";
import { DATA } from "./utils/data";

const App = () => {
  const [position, setPosition] = useState({ lat: null, lon: null });
  const [unit, setUnit] = useState("F");
  const [data, setData] = useState({});

  const {
    data: success,
    loading,
    error,
    makeRequest: getData,
  } = useRequest({
    request: getOneCall,
    lazy: true,
  });

  useEffect(() => {
    getLocation((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setPosition({ lat, lon });
    });
  }, []);

  useEffect(() => {
    if (position.lat !== null && position.lon !== null) {
      getData({ lat: position.lat, lon: position.lon });
    }
  }, [position]);

  useEffect(() => {
    if (success) {
      if (success?.name === "Error") {
        setData(DATA);
      } else {
        setData(success);
      }
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      console.log({ error });
    }
  }, [error]);

  return (
    <div className="container">
      {position.lat === null && position.lon === null && (
        <div>Give me permissions</div>
      )}
      {loading && <div>Loading ...</div>}
      {data?.current && data?.daily.length > 0 && data?.hourly.length > 0 && (
        <>
          <Current
            current={data.current}
            pop={data.hourly[0].pop}
            unit={unit}
            setUnit={setUnit}
          />
          <Daily daily={data.daily} unit={unit} />
          <Hourly hourly={data.hourly} unit={unit} />
        </>
      )}
    </div>
  );
};

export { App };
