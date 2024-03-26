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
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setData(null);
      alert("Failed to fetch weather data");
      console.error("Error fetching data:", error);
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
        <div className="container">
          <div className="weather-card">
            <h4>Temperature</h4>
            <p>{data.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h4>Humidity</h4>
            <p>{data.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h4>Condition</h4>
            <p>{data.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h4>Wind Speed</h4>
            <p>{data.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}
