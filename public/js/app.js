const showPosition = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  fetch(`/getForecast/?lat=${lat}&lon=${lon}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
};

getLocation();
