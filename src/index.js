//calling the date and time from inside js.

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

if (time < 10) {
  time = `0${time}`;
}
h1.innerHTML = `${day} ${time}:${minutes}`;

//let temp = Math.round(response.data.main.temp) --> data fetched from the json data sheet on openweather using apiUrl
//.documentqueryselector links the js to the html id
//currentTemp.innerHTML = temp displays the data in the html so you can see it on the webpage

function displayTemp(response) {
  let temperatureElement = document.querySelector("#temperature");

  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#current-description");

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");

  let pressure = response.data.main.pressure;
  let currentPressure = document.querySelector("#pressure");

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");

  let city = response.data.name;
  let currentCity = document.querySelector("#cityInput");

  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  currentDescription.innerHTML = description;
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  currentPressure.innerHTML = `Pressure: ${pressure}%`;
  currentWind.innerHTML = `Wind: ${wind} km/h`;
  currentCity.innerHTML = `${city}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//axios makes HTTP requests from the browser and handles the transformation of request and response data.
//here it uses the url to pull all the data in the displayTemp function.

function search(city) {
  let apiKey = "3e29a63c22228ff8f4a04b82fdde6e77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

//the event here is the form being submitted when the user searches for a city.
function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  search(citySearch.value);
}

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3e29a63c22228ff8f4a04b82fdde6e77";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  //axios pulls all the data from displayTemp but for the current location.
  axios.get(apiUrl).then(displayTemp);
}

//this function uses the geolocation navigator to find the users current lon and lat
function searchPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

// when the form is used and the city is submitted, the event listener calls the showCityName function.

let searchButton = document.querySelector("#temp");
searchButton.addEventListener("click", displayTemp);

//when the current button is clicked, the event listener calls the searchPosition function
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", searchPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Berlin");
