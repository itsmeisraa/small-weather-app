import { useState } from "react";

function Card() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  // Function to fetch weather data
  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError(""); // clear previous errors
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();

      // Save weather data
      setWeather({
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        name: data.name,
        icon: data.weather[0].icon,
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="card">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Enter city name"
          spellCheck="false"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>
          <img src="/src/assets/search.png" alt="search" />
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="weather">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
            className="weather-icon"
          />
          <h1 className="temp">{Math.round(weather.temp)}°C</h1>
          <h2 className="city">{weather.name}</h2>
          <div className="details">
            <div className="col">
              <img src="src/assets/humidity.png" alt="humidity" />
              <div>
                <p className="humidity">{weather.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="src/assets/wind.png" alt="wind" />
              <div>
                <p className="wind">{weather.wind} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;

