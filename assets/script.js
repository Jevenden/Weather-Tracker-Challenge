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
let uvBlock = $(".uvBlock");
let weatherIcon = $(".weatherIcon");
let currentDate = $("#currentDate");
let weatherDesc = $(".weatherDesc");
let date = moment().format("dddd") + ", " + moment().format("MMMM Do");

// API Key from OpenWeather
let APIKey = "b25eb13e2b9805c00e7a51eb01cd4a27";

localStorage.setItem("cities", "[]");

// Activates the API call when the user clicks the search button
$("#submitBTN").on("click", getWeather);

$(document).on("click", ".cityButton", recall);

// Function to make it initial API call and call the display functions
function getWeather(event) {
  event.preventDefault();
  city = searchField.val();
  if (!city) {
    return;
  }

  let searchedCities = JSON.parse(localStorage.getItem("cities"));
  searchedCities.push(city);
  localStorage.setItem("cities", JSON.stringify(searchedCities));

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
    saveCity(city);
  });
}

function saveCity(city) {
  $(".prevSearchTitle").html("Previous Searches:");
  $(".prevSearches").append(
    $(document.createElement("button")).prop({
      type: "button",
      innerHTML: city,
      class: "cityButton",
      // click: displayPrevious(city),
    })
  );
}

function recall() {
  let city = this.innerHTML;
  displayPrevious(city);
}

function displayPrevious(city) {
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

// Function to display the current-day weather info from the API call
function displayWeather(response) {
  currentCity.html(response.name);
  currentDate.html(date);
  tempBlock;
  tempBlock.html("Temperature: " + response.main.temp + "°F");
  windBlock.html("Wind Speed: " + response.wind.speed + " MPH");
  humBlock.html("Humidity: " + response.main.humidity + "%");
}

// Function to make a second API call to retrieve information on the UV Index and a 5-day forecast
function getUVI(response) {
  let lat = response.coord.lat;
  let lon = response.coord.lon;
  let queryURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    let icon = response.weather[0].icon;
    let iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    let description = data.current.weather[0].description;
    uvBlock.html("UV Index: " + data.current.uvi);
    weatherIcon.html("<img src=" + iconURL + ">");
    weatherDesc.html(description);
    console.log(data);
    forecast(data);
  });
}

function forecast(data) {
  for (i = 0; i < 5; i++) {
    let iconCode = data.daily[i].weather[0].icon;
    let iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
    let foreTemp = data.daily[i].temp.day;
    let foreWind = data.daily[i].wind_speed;
    let foreHum = data.daily[i].humidity;
    let foreUV = data.daily[i].uvi;

    $("#foreDate" + i).html(
      moment()
        .add(i + 1, "days")
        .format("dddd") +
        ", " +
        moment()
          .add(i + 1, "days")
          .format("MMMM Do")
    );
    $("#foreIcon" + i).html("<img src=" + iconURL + ">");
    $("#foreTemp" + i).html("Temp: " + foreTemp);
    $("#foreWind" + i).html("Wind: " + foreWind);
    $("#foreHum" + i).html("Hum: " + foreHum + "%");
    $("#foreUV" + i).html("UV: " + foreUV);
    $(".forecast").css("border", "black solid 1px");
    $("#uvIndex").css("border", "black solid 1px");
    $(".uvKeyLight").html("Low UV Index").css("background-color", "lightblue");
    $(".uvKeyMed").html("Med UV Index").css("background-color", "lightyellow");
    $(".uvKeyHot").html("High UV Index").css("background-color", "tomato");

    if (data.daily[i].uvi <= 2) {
      $("#fore" + i).css("background-color", "lightblue");
    } else if (data.daily[i].uvi > 7) {
      $("#fore" + i).css("background-color", "tomato");
    } else {
      $("#fore" + i).css("background-color", "lightyellow");
    }

    if (data.current.uvi <= 2) {
      uvIndex.css("background-color", "lightblue");
    } else if (data.current.uvi > 7) {
      uvIndex.css("background-color", "tomato");
    } else {
      uvIndex.css("background-color", "lightyellow");
    }
  }
}
