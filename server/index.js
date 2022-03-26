const express = require("express");
const path = require("path");
const axios = require("axios");
const url = "https://api.openweathermap.org/data/2.5";
const app = express();
const appid = process.env.API_KEY || "9af1888128abd4b217988954ec61affd";
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "../client/build")));
console.log(path.join(__dirname, "../client/build/static"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
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
      `${url}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${appid}`
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

app.get("/api/get-city/", (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const filterCity = (obj) => obj.city;
  axios
    .get(`${url}/forecast?lat=${lat}&lon=${lon}&appid=${appid}`)
    .then((response) => {
      const data = response.data;
      res.json(filterCity(data));
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
