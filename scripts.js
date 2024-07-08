$(document).ready(function () {
    $('#welcome-message').show().animate({
        fontSize: '30px',
        opacity: 1,
        marginLeft: '50px'
    }, 2000).delay(3000).animate({
        fontSize: '20px',
        opacity: 0,
        marginLeft: '650px'
    }, 2000, function () {
        $(this).hide();
    });
});

function getWeather() {
    const location = document.getElementById("location").value;
    const apiKey = '6b1bfea7b805a8a42de73e5f57900740';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const roundedTemp = Math.round(data.main.temp);
            const weatherDescription = data.weather[0].description;
            const weatherIcon = getWeatherIcon(weatherDescription);
            const humidity = data.main.humidity;
            const windSpeed = Math.round(data.wind.speed * 3.6);

            const weatherInfo = `
                <div class="result">
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${roundedTemp}°C</p>
                    <p>Weather: ${weatherDescription}</p>
                    <div class="weather-details">
                        <div class="weather-detail">
                            <img src="icons/wind.png" alt="Wind Speed Icon" class="icon"> 
                            <span class="weather-text">Wind Speed: ${windSpeed} km/h</span>
                        </div>
                        <img src="${weatherIcon}" alt="Weather Icon" class="weather-icon">
                        <div class="weather-detail">
                            <img src="icons/humidity.png" alt="Humidity Icon" class="icon"> 
                            <span class="weather-text">Humidity: ${humidity}%</span>
                        </div>
                    </div>
                </div>`;
            document.getElementById("weather").innerHTML = weatherInfo;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            const weatherElement = document.getElementById("weather");
            weatherElement.textContent = "Error fetching weather data, location not found!";
            const errorImage = document.createElement("img");
            errorImage.src = "/icons/location.png";
            errorImage.alt = "Error image";
            errorImage.style.width = "512px";
            errorImage.style.height = "auto";
            errorImage.style.display = "block";
            errorImage.style.margin = "0 auto";
            weatherElement.appendChild(errorImage);
        });
}

function getWeatherIcon(description) {
    switch (description.toLowerCase()) {
        case 'clear sky':
            return 'icons/clear.png';
        case 'broken clouds':
        case 'overcast clouds':
        case 'few clouds':
        case 'clouds':
            return 'icons/cloudy.png';
        case 'scattered clouds':
            return 'icons/cloudy.png';
        case 'moderate rain':
        case 'light intensity drizzle rain':
        case 'light rain':
            return 'icons/rain.png';
        case 'snow':
            return 'icons/snow.png';
        case 'mist':
        case 'haze':
            return 'icons/mist.png';
        default:
            return 'icons/clear.png';
    }
}

