import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY;

const getCountryData = (lat, long) =>
    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`)
        .then(res => res.data)


export default { getCountryData }
