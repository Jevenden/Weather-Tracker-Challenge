// Moment variable to store the date in the format I wanted
let date = moment().format("dddd") + ", " + moment().format("MMMM Do");

// API Key from OpenWeather
let APIKey = "b25eb13e2b9805c00e7a51eb01cd4a27";

// Eventlistener that activates the initial API call when the user clicks the search button
$("#submitBTN").on("click", getWeather);

// Eventlistener that re-activates a previous API call when the user clicks on a previously searched-for city
$(document).on("click", ".cityButton", recall);

// Sets local storge to an array
if (localStorage.getItem("cities") == null) {
  localStorage.setItem("cities", "[]");
}

// Loops over local storage and creates clickable buttons out of the previously searched cities
window.onload = function () {
  prevCities = JSON.parse(localStorage.getItem("cities"));
  for (i = 0; i < prevCities.length; i++) {
    let city = prevCities[i];
    $(".prevSearches").append(
      $(document.createElement("button")).prop({
        type: "button",
        innerHTML: city,
        class: "cityButton",
      })
    );
  }
};

// Function to make the initial API call, save the search to local storage,
// and make the second API call for UVI and the 5-day forecast
function getWeather(event) {
  event.preventDefault();
  city = $("#searchField").val().toUpperCase();
  $("#searchField").val("");

  let queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    if (response.cod == 200) {
      console.log(response);
      saveCity(city);
      getUVI(response);
    }
  });
}

// Checks if the city the user searched for is already in local memory and, if not,
// saves the user's search to local storage and creates a clickable re-search
// button when the user searches
function saveCity(city) {
  let searchedCities = JSON.parse(localStorage.getItem("cities"));
  let check = searchedCities.indexOf(city);
  if (check === -1) {
    searchedCities.push(city);
    localStorage.setItem("cities", JSON.stringify(searchedCities));

    $(".prevSearches").append(
      $(document.createElement("button")).prop({
        type: "button",
        innerHTML: city,
        class: "cityButton",
      })
    );
  }
}

// Translates the previous search into a variable to be used to search again
function recall() {
  let city = this.innerHTML;
  displayPrevious(city);
}

// Re-submits the search when the user clicks on a button created by a previous search,
// repopulates the current and 5-day forecast, but does not re-commit to local storage
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
    getUVI(response);
  });
}

// Function to make a second API call to retrieve information on the UV Index and a 5-day forecast,
// displays the information on the DOM, and calls functions to display the remaining information
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
    $(".uvBlock").html("UV Index: " + data.current.uvi);
    $(".weatherIcon").html("<img src=" + iconURL + ">");
    $(".weatherDesc").html(description);
    console.log(data);
    forecast(data);
    displayWeather(response);
  });
}

// Displays the current-day weather info from the API call
function displayWeather(response) {
  $("#currentCity").html(response.name);
  $("#currentDate").html(date);
  $(".tempBlock");
  $(".tempBlock").html("Temperature: " + response.main.temp + "°F");
  $(".tempBlock").html("Wind Speed: " + response.wind.speed + " MPH");
  $(".tempBlock").html("Humidity: " + response.main.humidity + "%");
}

// Loops through the second API call and displays the 5-day forecast
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

    // Colors the current day forecast based on UV index
    if (data.daily[i].uvi <= 2) {
      $("#fore" + i).css("background-color", "lightblue");
    } else if (data.daily[i].uvi > 7) {
      $("#fore" + i).css("background-color", "tomato");
    } else {
      $("#fore" + i).css("background-color", "lightyellow");
    }
    //Colors the 5-day forecast based on UV index
    if (data.current.uvi <= 2) {
      $("#uvIndex").css("background-color", "lightblue");
    } else if (data.current.uvi > 7) {
      $("#uvIndex").css("background-color", "tomato");
    } else {
      $("#uvIndex").css("background-color", "lightyellow");
    }
  }
}
