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

  let description = response.data.condition.description;
  let currentDescription = document.querySelector("#current-description");

  let humidity = response.data.temperature.humidity;
  let currentHumidity = document.querySelector("#humidity");

  let pressure = response.data.temperature.pressure;
  let currentPressure = document.querySelector("#pressure");

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");

  let city = response.data.city;
  let currentCity = document.querySelector("#cityInput");

  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  currentDescription.innerHTML = description;
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  currentPressure.innerHTML = `Pressure: ${pressure}%`;
  currentWind.innerHTML = `Wind: ${wind} km/h`;

  currentCity.innerHTML = `${city}`;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b75146af46et20c8d83f2ao3006e4a7d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
          
      <div class="col">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
         <br/>
        <div class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temperature.maximum
        )}°</div>
      
          
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temperature.minimum
          )}°</div>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//axios makes HTTP requests from the browser and handles the transformation of request and response data.
//here it uses the url to pull all the data in the displayTemp function.

function search(city) {
  let apiKey = "b75146af46et20c8d83f2ao3006e4a7d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

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
  lon = position.coords.longitude;
  lat = position.coords.latitude;

  let apiKey = "b75146af46et20c8d83f2ao3006e4a7d";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=${units}`;

  //axios pulls all the data from displayTemp but for the current location.
  https: axios.get(apiUrl).then(displayTemp);
}

//this function uses the geolocation navigator to find the user's current lon and lat
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
