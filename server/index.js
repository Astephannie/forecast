const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const appid = process.env.API_KEY;
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/app.html"));
});

app.get("/getForecast/", (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${appid}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
