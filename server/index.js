const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const appid = process.env.API_KEY || "33b8ca36ca13b6f00c924eda0ae2abce";
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/app.html"));
});

app.get("/api/get-one-call/", (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  const filterHourlyData = (obj) => {
    return {
      dt: obj.dt,
      temp: obj.temp,
      pop: obj.pop,
    };
  };

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${appid}`
    )
    .then((response) => {
      const data = response.data;
      const filteredHourly = data.hourly.map((e) => filterHourlyData(e));
      data.hourly = filteredHourly.splice(0, 25);
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
