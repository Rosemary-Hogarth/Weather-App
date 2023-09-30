let currentDate = new Date();
let h1 = document.querySelector("h1");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let time = currentDate.getHours();
let minutes = currentDate.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

h1.innerHTML = `${day} ${time}:${minutes}`;

function displayTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = temp;
  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = description;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let pressure = response.data.main.pressure;
  let currentPressure = document.querySelector("#pressure");
  currentPressure.innerHTML = `Pressure: ${pressure}`;
  let city = response.data.name;
  let currentCity = document.querySelector("#cityInput");
  currentCity.innerHTML = `${city}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showCityName(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  let h2 = document.querySelector("h2");

  h2.innerHTML = citySearch.value;
  let apiKey = "3e29a63c22228ff8f4a04b82fdde6e77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp).catch(handleError);
}

let form = document.querySelector("form");
form.addEventListener("submit", showCityName);

function handleError(error) {
  console.log(error);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3e29a63c22228ff8f4a04b82fdde6e77";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function searchPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentCity = document.querySelector("#current-location");
currentCity.addEventListener("click", searchPosition);

//  function showFahrenheit(event) {
//   event.preventDefault();
//   let tempSearch = document.querySelector("#button");
//   let p = document.querySelector("p");
//   let celcius = 30;
//   let fahrenheit = (celcius * 9) / 5 + 32;
//   p.innerHTML = `${fahrenheit}`;
// }

// let button = document.querySelector("#button");
// button.addEventListener("click", showFahrenheit);

// function showCelcius(event) {
//   event.preventDefault();
//   let tempFind = document.querySelector("#press");
//   let p = document.querySelector("p");
//   let celcius = 30;
//   p.innerHTML = `${celcius}`;
// }

// let press = document.querySelector("#press");
// // press.addEventListener("click", showCelcius);
