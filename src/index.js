//calling the date and time from inside js.

let currentDate = document.querySelector("#current-date-data");
let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentTime.getDay()];
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
  currentPressure.innerHTML = `Pressure: ${pressure}%`;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind} km/h`;
  let city = response.data.name;
  let currentCity = document.querySelector("#cityInput");
  currentCity.innerHTML = `${city}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let celsiusTemperature = response.data.main.temp;
}

//the event here is the form being submitted when the user searches for a city.

function showCityName(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  let h2 = document.querySelector("h2");

  h2.innerHTML = citySearch.value;
  let apiKey = "3e29a63c22228ff8f4a04b82fdde6e77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=metric`;

  //axios makes HTTP requests from the browser and handles the transformation of request and response data.
  //here it uses the url to pull all the data in the displayTemp function.

  axios.get(apiUrl).then(displayTemp).catch(handleError);
}

// when the form is used and the city is submitted, the event listener calls the showCityName function.

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

  //axios pulls all the data from displayTemp but for the current location.
  axios.get(apiUrl).then(displayTemp);
}

//this function uses the geolocation navigator to find the users current lon and lat
function searchPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

//when the current button is clicked, the event listener calls the searchPosition function
let currentCity = document.querySelector("#current-location");
currentCity.addEventListener("click", searchPosition);

// let celsiusTemperature = null;

// function showCelsius(event) {
//   event.preventDefault();
//   let p = document.querySelector("#press");

//   let celsius = 30;
//   p.innerHTML = `${celsius}`;
// }

// let press = document.querySelector("#press");
// press.addEventListener("click", showCelsius);

// searchPosition(Berlin);
