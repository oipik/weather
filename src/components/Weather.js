import { useState } from 'react';

import './weather.scss';

const Weather = () => {
    const [city, setCity] = useState('');
    const [data, setData] = useState({});

    const APIKEY = "a2385858846c79ae9bab245a3fcf10c1";
    const Kelvin = 273.15;

    async function request(e) {
        if (e.keyCode === 13) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)

            if (response.ok) {
                const data = await response.json();
                setData(data);
            } else {
                alert("Не правильно введен город, повторите снова! Ошибка №" + response.status);
            }
        }
    }

    const getDate = (date) => {
        const days = ['Monday', 'Tuesday', 'Thursday', 'Wednesday ', 'Thursday ', 'Friday', 'Saturday', 'Sunday']
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    const date = new Date();

    return (
        <div>
            <div className="wrapper">
                <div className={data.main !== undefined ? ((+data.main.temp - Kelvin < 0) ? "weather cold" : "weather") : "weather"}>
                    <div className="weather__box">
                        <input
                            className="weather__input"
                            type="text"
                            placeholder="search"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onKeyDown={(e) => request(e)} />
                    </div>
                    {
                        data.main !== undefined ? <div className="weather__content">
                            <h4 className="weather__title">{data.name}</h4>
                            <p className="weather__time">{getDate(new Date)}</p>
                            <div className="weather__temprature">{`${Math.round(+data.main.temp - Kelvin)}°C`}</div>
                            <p className="weather__cloud">{data.weather[0].main}</p>
                        </div> : null
                    }

                </div>
            </div>
        </div>

    )
}

export default Weather;