//my apiKey
let apiKey = "7b82360a89d434b6c2917003378b2c60";

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
console.log(formatDate(new Date()));
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(new Date());

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
form.addEventListener("submit", searchCity);

let button = document.querySelector("#search-button");
button.addEventListener("click", searchCity);

let currentButton = document.querySelector("#current-button");
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
fahrenheit.addEventListener("click", changeScale);
let celsius = document.querySelector("#fahrenheit");
celsius.addEventListener("click", changeScale);

function changeScale() {
  let newScale = document.querySelector("#temperature");
  newScale.innerHTML = "75°";
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

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  console.log(temperature);
  let title = document.querySelector("#temperature");
  title.innerHTML = `${temperature}°`;
  let newCity = document.querySelector("#title-city");
  newCity.innerHTML = `${city}`;
}

function addDescription(response) {
  let newDescription = response.data.weather[0].main;
  console.log(newDescription);
  let description = document.querySelector("#description");
  description.innerHTML = `${newDescription}`;
}
