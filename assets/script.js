// Variables for targeting elements in HTML
let searchField = $("#searchField");
let submitBTN = $("#submitBTN");
let currentCity = $("#currentCity");
let temp = $("#temp");
let wind = $("#wind");
let humidity = $("#humidity");
let uvIndex = $("#uvIndex");

// API Key from OpenWeather
let APIKey = "b25eb13e2b9805c00e7a51eb01cd4a27";

// Variable for storing the city that the user searched for
let city = "";

// Activates the API call when the user clicks the search button
$("#submitBTN").on("click", getWeather);

function getWeather() {
  debugger;
  city = searchField.val();
  let queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then();
}

// var queryURL =
//   "http://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   "&appid=" +
//   APIKey
