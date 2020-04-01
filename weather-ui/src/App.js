import React from 'react';
import './App.css';
import CityInput from "./CityInput";
import TableInput from "./TableInput";
import GraphInput from "./GraphInput";
import 'bootstrap/dist/css/bootstrap.min.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class App extends React.Component{
    constructor(props) {
        super(props);
        this.cities = [];
        this.citiesCurrent = [];
        this.cities5Days = [];
    };
    inputLisener = (cityWeather) => {
        console.log(cityWeather.data.sys);
        let pomCity = {
            name: cityWeather.data.name,
            country : cityWeather.data.sys.country,
            weather :  cityWeather.data.weather[0],
            main : cityWeather.data.main,
            wind : cityWeather.data.wind
        };
        if(this.cities.includes(pomCity.name)){
            confirmAlert({
                title: 'Already exist',
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
        this.cities.push(pomCity.name);
        this.citiesCurrent.push(pomCity);
        console.log(this.citiesCurrent);
        console.log(this.cities);
        confirmAlert({
            title: 'Success',
            message: pomCity.name + ' added on list',
            buttons: [
                {
                    label: 'OK',
                    onClick: () => {}
                }
            ]
        });
    };


    render() {
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
                            <h2>Please enter the name of the city</h2>

                        </div>
                        <CityInput toggleOverlay={this.inputLisener}/>
                        <br/>
                        <div className="row d-flex justify-content-center">
                            <a width="150px" className="btn btn-outline-secondary scrollto custom" href="#about" role="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See table&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a className="btn btn-outline-secondary scrollto" href="#graph" role="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See graph&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                        </div>

                    </div>

                </section>



                <section id="services" className="services section-bg">
                    <div className="container">

                        <div className="section-title">
                            <h2>Tabelarni prikaz</h2>
                        </div>
                        <TableInput cities={this.citiesCurrent}/>

                    </div>
                </section>



                <section id="graph" className="featured">
                    <div className="container">
                        <div className="section-title">
                            <h2>Grafikon</h2>
                            <GraphInput/>
                        </div>


                    </div>
                </section>

                <footer id="footer">

                    <div className="footer-top">

                        <div className="container">

                            <div className="row  justify-content-center">
                                <div className="col-lg-6">
                                    <h3>weather</h3>
                                    <p>Nesto pise.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </footer>


                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="back-to-top"><i className="icofont-simple-up"/></a>
            </div>
        );
    }
}

export default App;
