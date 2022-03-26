import React from "react";
import { Day } from "./Day";

const Daily = ({
  daily = [],
  unit = "F",
  setSelectDay = () => {},
  selectDay,
}) => {
  return (
    <div className="frame">
      <h2 className="margin-0">Daily</h2>
      <div id="daily" className="flex">
        {daily.slice(0, 6).map((day) => (
          <Day
            key={day.dt}
            forecast={day}
            unit={unit}
            setSelectDay={setSelectDay}
            selectDay={selectDay}
          />
        ))}
      </div>
    </div>
  );
};

export { Daily };
