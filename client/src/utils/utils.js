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

export const errorCodeMessage = (status) => {
  let errorMessage = "";

  if (status === 401) {
    errorMessage = "You need to check your Openweathermap API request.";
  }
  if (status === 404) {
    errorMessage =
      "The format of your Openweathermap API request is incorrect.";
  }
  if (status === 429) {
    errorMessage =
      "You have tried several times with your Openweathermap free plan subscription.";
  }
  if (status === 500 || status === 502 || status === 503 || status === 504) {
    errorMessage = "Contact Openweathermap for asistance";
  }

  return errorMessage;
};

export const getGeoLocationStatus = async () => {
  if (navigator.permissions) {
    const response = await navigator.permissions.query({ name: "geolocation" });
    if (response.state === "granted") {
      return "granted";
    } else if (response.state === "prompt") {
      return "prompt";
    } else {
      return "reject";
    }
  }
  return "unsupported";
};

export const getGeoLocationMessage = (status) => {
  if (status === "granted") {
    return "We are obtaining your location data.";
  }
  if (status === "reject") {
    return "You don't allow access to your location.";
  }
  if (status === "prompt") {
    return "You should allow access to your location to continue.";
  }
  if (status === "unsupported") {
    return "Geolocation is not supported by this browser.";
  }
  return "";
};
