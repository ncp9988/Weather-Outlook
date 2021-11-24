var cityInputEl = document.querySelector("#cityname")
var weatherContainer = document.querySelector("#weather-container")
var apiKey = "b76284fed56f40aa553158bccc226955"

var nameSumitHandler = function (event) {
    event.preventDefault();
    var cityname = cityInputEl.value.trim();

    if (cityname) {
        getCityWeather(cityname);

        //clear content
        weatherContainer.textContent = "";
        cityInputEl = "";
    } else {
        alert("Please enter a City");
    }
}
// var getCityWeather = function(city) {
//     //format OpenWeather One Call API
//     var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}"

//     // make a get request to url
//     fetch(apiUrl)
//         .then(function(response) {
//             // request was successful
//             if (response.ok) {
//                 console.log(response);
//                 response.json().then(function (data) {
//                     console.log(data);
//                     displayCity(data, city);
//                 });
//             };
//         })
// };

var getCityWeather =function() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`)
};
getCityWeather();