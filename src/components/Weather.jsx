import React, { useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
const Weather = () => {
  const [city, SetCity] = useState();
  const [weatherData, setWeatherData] = useState();

  const OngetSubmit = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=db3c6d81001e5d6ca40f3046150e05ce&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod == "404") {
          setWeatherData(undefined);
        } else {
          setWeatherData(finalRes);
        }
        console.log(weatherData);
      });
    SetCity("");
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          onChange={(e) => SetCity(e.target.value)}
          value={city}
          type="text"
          placeholder="Search"
        />
        <img src={search_icon} alt="" onClick={OngetSubmit} />
      </div>
      {weatherData !== undefined ? (
        <>
          <img
            src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt=""
            className="weather-icon"
          />
          <p className="temperature">
            {weatherData.main.temp}
            <h6>
              <sup>o</sup>
              <sup className="degree">C</sup>
            </h6>
          </p>

          <p className="location">{weatherData.name}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.weather.description}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="img" />
              <div>
                <p>3.6 Km/H</p>
                <span>{weatherData.wind.speed}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="Status">No Data Found</p>
      )}
    </div>
  );
};

export default Weather;
