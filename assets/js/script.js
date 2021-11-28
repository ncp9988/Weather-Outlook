var cityInputEl = document.querySelector("#cityname")
var weatherContainer = document.querySelector("#weather-container")
var apiKey = "b76284fed56f40aa553158bccc226955"
var btn = document.querySelector("#btn")
var saveCity = document.querySelector("#save-city")



var getCityWeather = function (city) {
    //format OpenWeather One Call API
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b76284fed56f40aa553158bccc226955&units=imperial";
    console.log(apiUrl)

    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    var lat = data.coord.lat
                    var lon = data.coord.lon
                    forecast(lat, lon);
                    weatherContainer.innerHTML = `<h3>City: ${city}</h3>
                    <h6>Description:${data.weather[0].description}<span><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></span></h6>
                    <p>Humidity:${data.main.humidity}</p>
                    <p>Wind speed:${data.wind.speed}</p>
                    `
                });
            };
        })
};
var nameSumitHandler = function (event) {
    event.preventDefault();
    var cityname = cityInputEl.value;
    if (cityname) {
        getCityWeather(cityname);

        // clear content
        // weatherContainer.textContent = "";
        cityInputEl = "";
    } else {
        alert("Please enter a City");
    }
}

btn.addEventListener("click", nameSumitHandler);



var displayCity = function (city) {

    console.log(city)
    //check api
    if (city.length === 0) {
        weatherContainer.textContent = "No city found.";
        return;
    }
    weatherContainer.textContent = city;

    //loop over citys
    for (var i = 0; i < city.length; i++) {
        var citynameEl = city[i].main.name


        var titleEl = document.createElement("div");
        titleEl.textContent = citynameEl;

        //append to container
        citynameEl.appendChild(saveCity)

    }

}

var forecast = function (lat, lon) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    console.log(apiUrl)

    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    var daily = data.daily
                    for (let i = 1; i <= 5; i++) {
                        document.getElementById(`${i}`).innerHTML = `<div>
                        <h3>Day ${i}</h3>
                        <h4>Temp:${daily[i].temp.day}</h4>
                        <h6>Description:${daily[i].weather[0].description}<span><img src="https://openweathermap.org/img/wn/${daily[i].weather[0].icon}@2x.png" /></span></h6>
                    <p>Humidity:${daily[i].humidity}</p>
                    <p>Wind speed:${daily[i].wind_speed}</p>
                      </div>
                        `
                    }
                })
            }
        })

}

