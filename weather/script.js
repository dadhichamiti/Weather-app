const apiKey = "e656d5275c19b0e72f1e1b56654148fd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";


const searchBox = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const WeatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city) {


    searchBtn.disabled = true;

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    try {
        if (response.status == 401) {
            throw new Error("Invalid API key")
        } else {
            var data = await response.json();

            const cityName = data.name;
            if (!cityName) {
                throw new Error("Invalid city")
            }
            document.querySelector(".city").innerHTML = cityName;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            const imageObj = {              // making object of weather images
                Clouds: "./images/clouds.png",
                Clear: "./images/clear.png",
                Rain: "./images/rain.png",
                Drizzle: "./images/drizzle.png",
                Mist: "./images/mist.png",
                Smoke: "./images/clouds.png"
            }

            WeatherIcon.src = imageObj[data.weather[0].main];   // fetching data from api

            document.querySelector(".weather-information").style.display = "block";
            searchBtn.disabled = false;
        }
    }

    catch (err) {
        alert(err.message)
    }

}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})


