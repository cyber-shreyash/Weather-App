const API_KEY = "599f0e0a4eb94ee3b99120250251208";
const API_URL = "https://api.weatherapi.com/v1/current.json";

const entry = document.getElementById("entry");
const enterBtn = document.getElementById("enter");

const placeEl = document.getElementById("place");
const tempEl = document.getElementById("temperature");
const condEl = document.getElementById("condition");
const humidEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("weather-icon");

async function fetchWeather(city) {
    try {
        let response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&aqi=no`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        let data = await response.json();

        placeEl.textContent = `${data.location.name}, ${data.location.country}`;
        tempEl.textContent = `${data.current.temp_c}°C`;
        condEl.textContent = data.current.condition.text;
        humidEl.textContent = `Humidity: ${data.current.humidity}%`;
        windEl.textContent = `Wind: ${data.current.wind_kph} kph`;
        iconEl.src = `https:${data.current.condition.icon}`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        placeEl.textContent = "City not found!";
        tempEl.textContent = "";
        condEl.textContent = "";
        humidEl.textContent = "";
        windEl.textContent = "";
        iconEl.src = "";
    }
}

enterBtn.addEventListener("click", () => {
    const city = entry.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a location!");
    }
});



