export const capitalize = (str) => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};

export const getLocation = (callback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  }
};

export const kelvinToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
};

export const kelvinToFahrenheit = (kelvin) => {
  return Math.round((9 / 5) * (kelvin - 273.15) + 32);
};

export const mpsToKmph = (mps) => {
  return Math.round(mps * 3.6);
};

export const mpsToMph = (mps) => {
  return Math.round(mps * 2.237);
};

export const formatLocalDate = (dt) => {
  const date = new Date(dt * 1000);
  return date.toLocaleString().split(",")[0];
};
