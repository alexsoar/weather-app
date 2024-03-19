import React, { useState } from 'react';
import './App.css';

const apiKey = '2858b7833ff2408eaa92ae2bec628ab0';
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=';

function App() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState({
    name: '',
    temp: '',
    humidity: '',
    windSpeed: '',
    weatherMain: '',
  });

  const checkWeather = async () => {
    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
      const data = await response.json();
      setWeather({
        name: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        weatherMain: data.weather[0].main,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    checkWeather();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="wrapper">
      <div className="search">
        <input
          type="text"
          placeholder="Please enter your city"
          spellCheck="false"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="weather">
        <img
          src={`images/${weather.weatherMain.toLowerCase()}.png`}
          className="weather-icon"
          alt=""
        />
        <h1 className="temperature">{weather.temp}°C</h1>
        <h2 className="city">{weather.name}</h2>
        <div className="details">
          <div className="col">
            <img src="images/humidity.png" alt="" />
            <div>
              <p className="humidity">{weather.humidity}%</p>
            </div>
          </div>
          <div className="col">
            <img src="images/wind.png" alt="" />
            <div>
              <p className="wind">{weather.windSpeed}km/h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
