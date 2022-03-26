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
