//my apiKey
let apiKey = "7b82360a89d434b6c2917003378b2c60";
let celsiusTemperature = null;

//Date
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let currentDate = document.querySelector("#current-date");

console.log(formatDate(new Date()));
currentDate.innerHTML = ` ${formatDate(new Date())}`;

function formatDate(current) {
  let day = now.getDay();
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  let finalDate = `${days[day]} ${hour}:${minute}`;
  return finalDate;
}

//Form
let form = document.querySelector("#my-input");
let button = document.querySelector("#search-button");
let currentButton = document.querySelector("#current-button");

form.addEventListener("submit", searchCity);
button.addEventListener("click", searchCity);
currentButton.addEventListener("click", showCurrent);

function searchCity(event) {
  event.preventDefault();
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let cityInput = document.querySelector("#city");
  let cityName = cityInput.value.toLowerCase();
  console.log(cityName);
  apiUrl = `${apiUrl}q=${cityName}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(addDescription);
}

//Temperature scale
let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");

fahrenheit.addEventListener("click", changeScale);
celsius.addEventListener("click", changeScaletoC);

function changeScale(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  //remove the active class
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperatureF = Math.round((celsiusTemperature * 9) / 5 + 32);
  console.log(temperatureF);
  temperature.innerHTML = `${temperatureF}`;
}

function changeScaletoC(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

//Find position and give current temperature
function showCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  apiUrl = `${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

//Show temperature
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  console.log(temperature);
  let title = document.querySelector("#temperature");
  title.innerHTML = `${temperature}`;
  let newCity = document.querySelector("#title-city");
  newCity.innerHTML = `${city}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let forecastDay = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[forecastDay];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<table class="table">`;

  forecast.forEach(function (forecastDay, index) {
    if ((index > 0) & (index < 5)) {
      forecastHTML =
        forecastHTML +
        ` <tr>
                <td>
               
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</div>
                  <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span><span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}° </span></div>
                </td>
                <td> <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        /></td><tr>
              `;
    }
  });

  forecastHTML = forecastHTML + `</table>`;
  forecastElement.innerHTML = forecastHTML;
}

function addDescription(response) {
  let newDescription = response.data.weather[0].main;
  console.log(newDescription);
  let description = document.querySelector("#description");
  description.innerHTML = `${newDescription}`;
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(addDescription);
  displayForecast;
}

search("Tokyo");
