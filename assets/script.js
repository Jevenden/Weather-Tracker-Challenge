// Variables for targeting elements in HTML
let searchField = $("#searchField");
let submitBTN = $("#submitBTN");
let currentCity = $("#currentCity");
let temp = $("#temp");
let tempBlock = $(".tempBlock");
let wind = $("#wind");
let windBlock = $(".windBlock");
let humidity = $("#humidity");
let humBlock = $(".humBlock");
let uvIndex = $("#uvIndex");
let currentDate = $("#currentDate");
let date = moment().format("MMMM Do YYYY");

// API Key from OpenWeather
let APIKey = "b25eb13e2b9805c00e7a51eb01cd4a27";

// Variable for storing the city that the user searched for
let city = "";

// Activates the API call when the user clicks the search button
$("#submitBTN").on("click", getWeather);

function getWeather(event) {
  event.preventDefault();
  city = searchField.val();
  let queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    displayWeather(response);
    getUVI(response);
  });
}

function displayWeather(response) {
  currentCity.html(response.name);
  currentDate.html(date);
  tempBlock;
  tempBlock.html("Temperature: " + response.main.temp + "°F");
  windBlock.html("Wind Speed: " + response.wind.speed + " MPH");
  humBlock.html("Humidity: " + response.main.humidity + "%");
}

function getUVI(response) {
  let lat = response.coord.lat;
  let lon = response.coord.lon;
  let queryURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=hourly,daily&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    displayUVI(data);
  });
}

function displayUVI(data) {
  if (data.current.uvi < 2) {
    uvIndex.css("background-color", "lightgreen");
  } else if (data.current.uvi > 7) {
    uvIndex.css("background-color", "lightred");
  } else {
    uvIndex.css("background-color", "lightyellow");
  }
}

// .catch(() => {
//   currentCity.html(" Please enter a valid city");

//
// }

// Random team advice
// .current.weather[0].icon

// .daily[0].weather[0].icon
// daily[1].weather[0].icon

// https://openweathermap.org/img/wn/${icon}@2x.png"

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function(response));
// }

// let { main, name, sys, weather } = data;

// var queryURL =
//   "http://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   "&appid=" +
//   APIKey

// https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}
