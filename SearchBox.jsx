import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
  const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "d3bdc565f206ddcf857807df18a74eee";

  

  
  let getWeatherInfo = async () => {
    // Step 1: Get coordinates
    let geoResponse = await fetch(`${GEO_URL}?q=${city}&limit=1&appid=${API_KEY}`);
    let geoData = await geoResponse.json();

    if (geoData.length === 0) {
      alert("City not found!");
      return null;
    }

    let { lat, lon, country, state, name } = geoData[0];

    // Step 2: Get weather
    let weatherResponse = await fetch(`${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    let weatherData = await weatherResponse.json();

    let result = {
      country: country,
      state: state || "",
      name: name,
      temperature: weatherData.main.temp,
      tempMin: weatherData.main.temp_min,
      tempMax: weatherData.main.temp_max,
      humidity: weatherData.main.humidity,
      weather: weatherData.weather[0].description
    };

    console.log(result);
    return result;
} 
  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = async (evt) => {
    evt.preventDefault();
    let newInfo = await getWeatherInfo();
    if (newInfo) updateInfo(newInfo);
    setCity("");
    } 


  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br /><br />
        <Button variant="contained" type="submit">Search</Button>
      </form>
    </div>
  );
}
