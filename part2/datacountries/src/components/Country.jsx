import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const kelvinToCelsius = (k) => k - 273.15;

const Country = ({ country }) => {
	const [weatherData, setWeatherData] = useState(null);

	const {
		name: { common },
		languages,
		flags: { png },
		capital,
		area,
		latlng,
	} = country;

	useEffect(() => {
		weatherService.getCountryData(latlng[0], latlng[1]).then((res) => {
			setWeatherData(res);
		});
	}, [latlng]);

	return (
		<>
			<h2>{common}</h2>
			<div>Capital: {capital[0]}</div>
			<div>Area: {area}</div>
			<h3>Languages</h3>
			<ul>
				{Object.values(languages).map((lang) => (
					<li key={lang}>{lang}</li>
				))}
			</ul>
			<img src={png} />

			{weatherData === null ? null : (
				<>
					<h3>Weather in {weatherData.name}</h3>
					<div>
						Temperature: {kelvinToCelsius(weatherData.main.temp).toFixed(2)}{" "}
						Celsius
					</div>
					<img
						src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
					/>
					<div>Wind: {weatherData.wind.speed} m/s</div>
				</>
			)}
		</>
	);
};

export default Country;
