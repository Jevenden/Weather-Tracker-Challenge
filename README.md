# Weather-Tracker-Challenge

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Methodology

To begin with I created all the structural elements I would need in HTML, using Boostrap. Afterwards I implemented the necessary
API calls to get the required information from OpenWeather and the necessary Javascript to display the information dynamically
upon user input. Two API calls were required; one to make the search function by city, and another to retrieve the UVI and 5-day-forecast. That complete, I stored the previous searches to local memory and created clickable buttons for each search that would re-run the search and dynamically re-display the information upon click. Finally, I added some if statements to prevent invalid or repeat searches from being stored to user memory.

URL of deployed application: https://jevenden.github.io/Weather-Tracker-Challenge/

![screenshot](https://user-images.githubusercontent.com/102879070/173206795-1756b534-81cb-41fe-a26f-bf9e9cd7594d.jpg)
