import "./App.css";
import { useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const key = "74b07d58acf342c58ca174838242603";

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
      );
      const result = await response.json();
      if (result.error) {
        alert("Failed to fetch weather data");
      }
      setData(result);
    } catch (error) {
      setData(null);
      alert("Failed to fetch weather data");
      console.error("Error fetching data:", error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading data...</p>}
      {data && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{data.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{data.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{data.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{data.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}
