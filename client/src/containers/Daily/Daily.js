import React from "react";
import { Day } from "./Day";

const Daily = ({ daily = [] }) => {
  return (
    <div className="frame">
      <h2 className="margin-0">Daily</h2>
      <div id="daily" className="flex">
        {daily.slice(0, 6).map((day) => (
          <Day key={day.dt} forecast={day} />
        ))}
      </div>
    </div>
  );
};

export { Daily };
