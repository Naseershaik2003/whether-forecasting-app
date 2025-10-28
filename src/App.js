import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "0105f7b69ae4178a4bca5e6d01833a69"; // Your OpenWeather API key

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || "City not found");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
      <h1>🌤️ Weather Forecast App</h1>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            width: "220px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={getWeather}
          style={{
            marginLeft: "10px",
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get Weather
        </button>
      </div>

      {/* Loading Message */}
      {loading && <p style={{ marginTop: "20px" }}>Loading weather data... 🌍</p>}

      {/* Error Message */}
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {/* Weather Data */}
      {weather && weather.main && (
        <div
          style={{
            marginTop: "30px",
            display: "inline-block",
            textAlign: "left",
            background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            padding: "20px",
            borderRadius: "10px",
            color: "#333",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>🌡️ Temperature: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
