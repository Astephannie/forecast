import React, { useEffect } from "react";
import { Current } from "./containers/Current/Current";
import { Daily } from "./containers/Daily/Daily";
import { Hourly } from "./containers/Hourly/Hourly";
import { useRequest } from "./hooks/request";
import { getOneCall } from "./api/openweather";
const App = () => {
  const { data, loading, error } = useRequest({
    request: getOneCall,
    params: { lat: "38.8951", lon: "-77.0364" },
  });

  useEffect(() => {
    if (error) {
      console.log({ error });
    }
  }, [error]);

  return (
    <div className="container">
      {data?.current && data?.daily.length > 0 && data?.hourly.length > 0 ? (
        <>
          <Current current={data.current} pop={data.hourly[0].pop} />
          <Daily daily={data.daily} />
          <Hourly hourly={data.hourly} />
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export { App };
