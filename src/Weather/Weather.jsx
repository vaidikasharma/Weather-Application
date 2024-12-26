import { useState } from "react"
import "./Weather.css"

export default function Weather() {
    const [city, setCity] = useState("");
    const [data, setData] = useState({
        city: "",
        temp: "",
        tempMin: "",
        tempMax: "",
        humidity: "",
        feelsLike: "",
        weather: ""
    })
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "48ea2cda9af395d7b2abe4b8cf4903ab";
    const getWeatherInfo = async () => {
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        if (!response.ok) {
            alert("Invalid City Name")
        }
        const jsonResponse = await response.json();


        //console .log(jsonResponse);
        const WeatherInfo = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description

        }
        setData(WeatherInfo);
        console.log(WeatherInfo);
    }
    const handlechange = (event) => {
        setCity(event.target.value);


    }
    const handlesubmit = (event) => {
        event.preventDefault();
        console.log(city);
        setCity("");
        getWeatherInfo();
    }
    return (
        <>
            <div className="main">
                <div className="searchBox">
                    <h1 style={{ color: "black", fontsize: "45px",textShadow:"3px 3px 16px black"}}>Live Weather</h1>
                    <form onSubmit={handlesubmit}>
                        <label htmlFor="city" id="head">City</label><br />
                        <input type="text" id="city" name="city" value={city} onChange={handlechange} /><br />
                        <input type="submit" value={"Get Info"} id="btn" />

                    </form>
                </div>
                <div className="banner">
                    <div className="content">
                        <h3>Get Live Info!!!</h3>
                    </div>
                </div>
                <div className="card">
                    <h2>City: {data.city.toUpperCase()}</h2>
                    <ul>
                        <li>Temp: {data.temp}</li>
                        <li>TempMin: {data.tempMin}</li>
                        <li>TempMax: {data.tempMax}</li>
                        <li>Humidity: {data.humidity}</li>
                        <li>FeelsLike: {data.feelsLike}</li>
                        <li>Weather: {data.weather}</li>
                    </ul>
                </div>
            </div>


        </>
    )


}