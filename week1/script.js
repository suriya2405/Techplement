document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'b7749c5e0f764d47b60130652243006'; // Your WeatherAPI key
    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');
    
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value;
        getWeather(city, apiKey);
        getForecast(city, apiKey);
    });
});

async function getWeather(city, apiKey) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        const data = await response.json();
        
        if (!data.location) {
            alert('City not found!');
            return;
        }

        const cityName = data.location.name;
        const temperature = data.current.temp_c + '°C';
        const weather = data.current.condition.text;
        const icon = data.current.condition.icon;
        const currentTime = new Date(data.location.localtime).toLocaleTimeString();

        document.getElementById('city').textContent = `City: ${cityName}`;
        document.getElementById('temperature').textContent = `Temperature: ${temperature}`;
        document.getElementById('time').textContent = `Time: ${currentTime}`;
        document.getElementById('weather').innerHTML = `Weather: ${weather} <img id="weatherIcon" src="https:${icon}" alt="weather icon">`;
    } catch (error) {
        alert('Error fetching weather data!');
        console.error(error);
    }
}

async function getForecast(city, apiKey) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`);
        const data = await response.json();

        if (!data.forecast) {
            alert('Forecast not found!');
            return;
        }

        const forecastContainer = document.getElementById('forecast-cards');
        forecastContainer.innerHTML = ''; 

        data.forecast.forecastday.forEach(day => {
            const date = new Date(day.date).toLocaleDateString(undefined, { weekday: 'long' });
            const temperature = `${day.day.avgtemp_c}°C`;
            const weather = day.day.condition.text;
            const icon = day.day.condition.icon;

            const forecastCard = document.createElement('div');
            forecastCard.classList.add('forecast-card');

            forecastCard.innerHTML = `
                <p>${date}</p>
                <img src="https:${icon}" alt="weather icon">
                <p>${temperature}</p>
                <p>${weather}</p>
            `;

            forecastContainer.appendChild(forecastCard);
        });
    } catch (error) {
        alert('Error fetching forecast data!');
        console.error(error);
    }
}
