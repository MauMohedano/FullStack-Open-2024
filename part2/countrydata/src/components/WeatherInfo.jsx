import axios from "axios";
import Content from "./Content";

import { useState, useEffect } from "react";

const api_key = import.meta.env.VITE_API_KEY;

const WeatherInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`
      )
      .then((response) => setWeather(response.data));
  }, [country]);

  if (weather === null) {
    return <div>Loading Weather info</div>;
  } else {
    const icon = `https://openweathermap.org/img/wn/${weather.weather.map(
      (x) => x.icon
    )}@2x.png`;
    return (
      <div>
        <h3>Weather in {country.capital}</h3>
        <p>
          Temperature: <b>{weather.main.temp} F</b>
        </p>
        <p>
          
          <img src={icon} alt="weather icon" />
        </p>
        <p>
          Wind: <b> {weather.wind.speed} m/s</b>
        </p>
      </div>
    );
  }
};

export default WeatherInfo;
