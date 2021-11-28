var cityInputEl = document.querySelector("#cityname")
var weatherContainer = document.querySelector("#weather-container")
var apiKey = "b76284fed56f40aa553158bccc226955"
var btn = document.querySelector("#btn")
var saveCity = document.querySelector("#save-city")
var previousSearch = JSON.parse(localStorage.getItem("WeatherDashboard")) || []


var getCityWeather = function (city) {
    //format OpenWeather One Call API
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b76284fed56f40aa553158bccc226955&units=imperial";
    console.log(apiUrl)

    // make a get request to url
        fetch(apiUrl)
            .then(function (response) {
                // request was successful
                if (response.ok) {
                    console.log (response);
                    response.json().then(function (data) {
                        console.log(data);
                        var lat = data.coord.lat
                        var lon = data.coord.lon
                        forecast(lat, lon);
                        weatherContainer.innerHTML = 
                        `<h3> ${city} (Today)
                        <span><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></span>
                        </h3>
                        <p>Temp: ${data.main.temp}</p>
                        <p>Humidity: ${data.main.humidity} %</p>
                        <p>Wind: ${data.wind.speed} MPH</p>
                        
                        `
                        previousSearch.push(city)
                        localStorage.setItem("WeatherDashboard", JSON.stringify(previousSearch))
                        displayCity()
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



var displayCity = function () {
    let city = JSON.parse(localStorage.getItem("WeatherDashboard")) || []



    //check api
    if (city.length === 0) {
        saveCity.textContent = "No city found.";

    }
    else {
        saveCity.innerHTML = ``

        //loop over citys
        for (var i = 0; i < city.length; i++) {
            var citynameEl = city[i]


            var titleEl = document.createElement("div");
            titleEl.textContent = citynameEl;
            $(titleEl).addClass("save-city col border border-bg-secondary rounded my-3 justify-content-around")

            //append to container
            saveCity.appendChild(titleEl)

        }
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
                            document.getElementById(`${i}`).innerHTML = 
                            `<div>
                            <h3>Day ${i}</h3>
                            <span><img src="https://openweathermap.org/img/wn/${daily[i].weather[0].icon}@2x.png" /></span>
                            <p>Temp: ${daily[i].temp.day}</p>
                            <p>Humidity:${daily[i].humidity}</p>
                            <p>Wind speed:${daily[i].wind_speed}</p>

                            </div>
                        `
                        }
                    })
                }
            })

    }


    displayCity()