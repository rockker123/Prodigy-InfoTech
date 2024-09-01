const apiKey = 'a1caef8f208802ed8f97a6a6c45ed951'; // Your provided OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('search-btn').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    fetchWeatherData(location);
});

function fetchWeatherData(location) {
    fetch(`${apiUrl}?q=${location}&units=metric&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                alert('Location not found');
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error:', error));
}

function displayWeatherData(data) {
    document.getElementById('location-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('weather-description').textContent = capitalizeFirstLetter(data.weather[0].description);
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('feels-like').textContent = `Feels Like: ${data.main.feels_like}°C`;
    document.getElementById('pressure').textContent = `Pressure: ${data.main.pressure} hPa`;

    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-icon').src = weatherIcon;

    // Update background based on weather conditions
    updateBackground(data.weather[0].main);
}

function updateBackground(weather) {
    switch (weather.toLowerCase()) {
        case 'clear':
            document.body.style.background = "linear-gradient(to right, #00c6ff, #0072ff)";
            break;
        case 'clouds':
            document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
            break;
        case 'rain':
            document.body.style.background = "linear-gradient(to right, #00c6ff, #0072ff)";
            break;
        case 'snow':
            document.body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
            break;
        case 'thunderstorm':
            document.body.style.background = "linear-gradient(to right, #141E30, #243B55)";
            break;
        default:
            document.body.style.background = "linear-gradient(to right, #00c6ff, #0072ff)";
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Optional: Get user's location on page load
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`${apiUrl}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => displayWeatherData(data))
                .catch(error => console.error('Error:', error));
        });
    }
});
