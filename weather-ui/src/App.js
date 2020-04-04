import React, { useState } from 'react';
import './App.css';
import CityInput from "./CityInput";
import TableInput from "./TableInput";
import GraphInput from "./GraphInput";
import Settings from "./Settings";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function App(){
    let aCities = [];
    let aCitiesCurrent = [];
    let aCities5Days = [];
    let alistOfTime = [];
    const [numberOdDays, setNumberOfDays] = useState(3);
    const [listOfTime, setListOfTime] = useState(alistOfTime);
    const [parametar, setPatametar] = useState("Temperature");
    const [numberOfHours, setNumberOfHours] = useState(6);
    const [cities, setCities] = useState(aCities);
    const [citiesCurrent, setCitiesCurrent] = useState(aCitiesCurrent);
    const [cities5Days, setCities5Days] = useState(aCities5Days);

    const removeLisener = (city) => {
        let msg = "\u{026A0} Warring";
        confirmAlert({
            title: msg,
            message:"Are you sure you want to remove "+ city +"?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setCities(cities.filter((c)=>(c !== city)));
                        setCitiesCurrent(citiesCurrent.filter((c)=>(c.name !== city)));
                        setCities5Days(cities5Days.filter((c)=>(c.name !== city)));
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });

    };
    const graphDateParesrSingleCity = (city) =>{
        let polListOfTime = [];
        let emptyList = false;
        if(listOfTime.length===0){
            emptyList = true;
        }
        axios.get("https://api.openweathermap.org/data/2.5/forecast?q="+city +"&appid=6c4b3a3b02a04f0626ff97606e9453fd")
            .then(res => {
                let pomCity5Days = {
                    country:res.data.city.country,
                    name: city,
                    weather: []
                };
                let i = 0;
                // eslint-disable-next-line array-callback-return
                res.data.list.map(day =>{
                    pomCity5Days.weather.push({
                        i : i,
                        temp: day.main.temp,
                        wind : day.wind.speed,
                        time : day.dt_txt,
                        pressure : day.main.pressure,
                        humidity : day.main.humidity,
                        weather: day.weather[0]
                    });
                    i++;
                    if(emptyList)
                        polListOfTime.push(day.dt_txt.substring(8, 13));
                    }
                );
                setCities5Days([...cities5Days, pomCity5Days]);
            });
        if (emptyList)
            setListOfTime([...cities5Days, polListOfTime]);
    };

    const inputLisener = (cityWeather) => {;

        let pomCity = {
            name: cityWeather.data.name,
            country : cityWeather.data.sys.country,
            weather :  cityWeather.data.weather[0],
            main : cityWeather.data.main,
            wind : cityWeather.data.wind
        };
        graphDateParesrSingleCity(pomCity.name);
        if (pomCity.name === "Republic of Kosovo"){
            pomCity.name = "Kosovo and Metohija"
        }
        if (pomCity.country === "XK"){
            pomCity.country = "RS"
        }
        document.getElementById("cityInput").value="";
        if(cities.includes(pomCity.name)){
            confirmAlert({

                title: '\uD83D\uDEC8 Already exist',
                message: pomCity.name +' is already on list.',
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => {}
                    }
                ]
            });
            return 1;
        }

        setCities([...cities, pomCity.name]);
        setCitiesCurrent([...citiesCurrent, pomCity]);
        confirmAlert({
            title: '\u2713 Success',
            message: pomCity.name + ' added on list',
            buttons: [
                {
                    label: 'OK',
                    onClick: () => {

                    }
                }
            ]
        });
    };

    return (
            <div className="App">
                <header id="header" className="fixed-top d-flex align-items-center header-transparent">
                    <div className="container d-flex align-items-center">

                        <div className="logo mr-auto">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <h1 className="text-light"><a href=""><span>WEATHER</span></a></h1>
                        </div>
                    </div>
                </header>


                <section id="hero">
                    <div className="hero-container">
                        <h1>WEATHER STATISTIC</h1>
                        <a href="#about" className="btn-get-started scrollto">Get Started</a>
                    </div>
                </section>


                <section id="about" className="about">
                    <div className="container">
                        <div className="section-title">
                            <h2>PLEASE ENTER THE NAME OF THE CITY</h2>

                        </div>
                        <CityInput toggleOverlay={inputLisener}/>
                        <br/>
                        <div className="row d-flex justify-content-center">
                            <a width="150px" className="btn btn-outline-secondary scrollto custom" href="#services" role="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See table&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a className="btn btn-outline-secondary scrollto" href="#graph" role="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See graph&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a className="btn btn-outline-secondary scrollto"  href="#about"  data-toggle="modal" data-target="#exampleModalCenter" role="button">&nbsp;&nbsp;&nbsp;&nbsp;&#x2699; Settings&nbsp;&nbsp;&nbsp;&nbsp;</a>
                        </div>
                        <br/>


                    </div>

                </section>



                <section id="services" className="services section-bg">
                    <div className="container">

                        <div className="section-title">
                            <h3>CURRENT WEATHER</h3>
                        </div>
                        <TableInput numDays = {numberOdDays} numHou = {numberOfHours}city5Days={cities5Days}cities={citiesCurrent} lisener={removeLisener}/>

                    </div>
                </section>



                <section id="graph" className="featured">
                    <div className="container">
                        <div className="section-title">
                            <h3>WEATHER PREDICTION</h3>
                            <GraphInput timeList={listOfTime} citis5Days={cities5Days} hours={numberOfHours} days={numberOdDays} param={parametar} label={["pon"+numberOdDays,"pon","pon","pon","pon","pon","pon","pon","pon","pon","pon","pon"]}/>
                        </div>

                    </div>
                </section>

                <footer id="footer">

                    <div className="footer-top">

                        <div className="container">

                            <div className="row  justify-content-center">
                                <div className="col-lg-6">
                                    <h3>weather</h3>
                                    <p>Damjan Manojlović 2020&copy;.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </footer>


                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="back-to-top"><i className="icofont-simple-up"/></a>


                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <Settings numDays={numberOdDays} setNum={setNumberOfDays} numHours={numberOfHours} setHours={setNumberOfHours} param={parametar} setParam={setPatametar}/></div>
            </div>


    );
}

export default App;


