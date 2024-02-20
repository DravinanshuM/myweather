import React, { useEffect, useState, useCallback } from 'react';
import './style.css';
import Countries from './Countries';
import axios from 'axios';
import NameTyped from './NameTyped';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [errorMessage, setErrorMessage] = useState({
        err_type: "",
        err_msg: ""
    });    
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState('allahabad');
    const [country, setCountry] = useState('');
    const [fetchTime, setfetchTime] = useState(2000);


    const fetchWeatherData = useCallback(async () => {
        if(city.trim() !== "") {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
                setWeatherData(response.data);
                setLoading(false);
                setErrorMessage({err_type:"", err_msg: ""})
                console.log(response.data);
                // IN get.
                const country = response.data.sys.country;
                Countries.hasOwnProperty(country) ? ( setCountry(Countries[country])) : ( console.log("not matched") )        
            } catch (err) {
                setErrorMessage({err_type:"alert alert-danger text-center", err_msg: "please enter corrcet city or any address"});
                setWeatherData(null);
                setLoading(false);
            }
        } 
    }, [city]);

    
    const serachCity = (city) => {
        if(city && city.trim() !== "") {
            setLoading(true);
            setfetchTime(1000); 
            if(city === 'Prayagraj' || city === 'prayagraj') {
                setCity('allahabad');
            } else {
                setCity(city);
            }
        } else {
            setWeatherData(null);
            setErrorMessage({err_type:"alert alert-warning mt-4", err_msg:"Please enter any city!"});
            setLoading(false);
            setCity("");
        }  
    }
    
    useEffect(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then((response)=>{

                    let parser =new DOMParser();
                    let xmlDoc = parser.parseFromString(response.data, "text/xml");
                    let District = xmlDoc.querySelector('state_district');
                    let getText = District.textContent;
                    getText.split(' ')[0] === "Prayagraj" ? setCity('allahabad') : setCity(getText.split(' ')[0]);

                }).catch((err)=>{
                    console.log("Error :: ", err);
                })
            }, (error)=>{
                console.log('ERROR :: ', error.message);
            })
        }
    },[]);
    
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            fetchWeatherData(); 
        }, fetchTime);
        return () => {
            clearTimeout(timeOutId);
        };
    }, [fetchWeatherData, fetchTime]);
    
    return (
        <>
          <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-12">
                    <div className="mt-4 p-4">
                        <div className="input-group">
                            <input type="text" className="form-control shadow-none" id="city" aria-describedby="cityHelp" name="city" placeholder="Enter the city" onBlur={(e)=>serachCity(e.target.value)} required />
                            <button onClick={() => serachCity(city)} className='btn btn-secondary'>Search</button>
                        </div>
                    </div>
                    <div className="card custom p-4">
                        {loading && 
                            <div className="loading">
                                <div className="spinner"></div>
                            </div>
                        }
                        {weatherData? (
                            <>
                                {
                                    loading ? (<p className='text-center mt-1'>Fetching data...</p>)  : (
                                        <>
                                            <h1 className="text-center fw-bold">
                                                <NameTyped/>
                                            </h1>
                                            <div className='row mt-4 align-items-center'>
                                                <div className='col-lg-6 col-md-6 col-sm-12'>
                                                    <h2>{country && country}</h2>
                                                    <h3>
                                                        {weatherData.name}
                                                        <span className="badge badge-primary">
                                                            {weatherData && new Date(weatherData.sys.sunrise * 1000).toDateString()}
                                                        </span>
                                                    </h3>
                                                    <div className="mb-0">
                                                        {weatherData && (
                                                            <h2>
                                                                <span className="mx-2">
                                                                    {Math.round(weatherData.main.temp)} °C
                                                                </span>
                                                                <span className="mx-2 fs-4">
                                                                    {weatherData.weather[0].description.toUpperCase()}
                                                                    <b className="mx-2 fs-6 badge bg-secondary">
                                                                        {weatherData.weather[0].main}
                                                                    </b>
                                                                </span>    
                                                            </h2>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-sm-12 mt-3 mt-md-0 text-center'>
                                                    <span>
                                                        {weatherData.weather[0].icon && (
                                                            <img 
                                                                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
                                                                alt="Weather Icon" 
                                                                className="img-fluid weather-pic" 
                                                            />
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-md-4">
                                                    <div className="d-flex justify-content-between">
                                                        <div>Wind Speed</div>
                                                        <div>{weatherData && weatherData.wind.speed} Km/h</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="d-flex justify-content-between">
                                                        <div>Humidity</div>
                                                        <div>{weatherData && weatherData.main.humidity} %</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="d-flex justify-content-between">
                                                        <div>Pressure</div>
                                                        <div>{weatherData && weatherData.main.pressure} hPa</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-md-4">
                                                    <div className="d-flex justify-content-between">
                                                        <div>Sunrise Time</div>
                                                        <div>{weatherData && new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="d-flex justify-content-between">
                                                        <div>Sunset Time</div>
                                                        <div>{weatherData && new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) 
                                }
                            </>
                        ): (<div className={errorMessage.err_type}>{errorMessage.err_msg}</div>)}
                    </div>
                </div>
            </div>
          </div>
        </>
    );
};

export default Weather;
