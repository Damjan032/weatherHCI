import React, { useState } from 'react';
import './App.css';
import MoreInfo from "./moreInfo";

function DeleteButton(props){
    const sendRemoveSignal = () =>
        props.lisener(props.name);


        return(
            <button type="submit" className="close" onClick={() => { sendRemoveSignal() }} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        );

}

function TableInput(props) {
    // eslint-disable-next-line no-useless-constructor
    const find5nfo = (nameOfCity) =>{
        let list2 = [];

        console.log("Usao ovde");
        console.log(nameOfCity);
        let ci = {};
        console.log(props.city5Days);
        let i = 0;
        props.city5Days.map(city =>{
            if (city.name === nameOfCity)
                ci = city;
        });
        return {tableData: list2,
            fullInfo :ci};
    };

    return (
            <table className="table table-hover">
                <thead >
                <tr>
                    <th scope="col">City</th>
                    <th scope="col">Current temp</th>
                    <th scope="col">Weather</th>
                    <th scope="col">Wind</th>
                    <th scope="col">Today max</th>
                    <th scope="col">Today min</th>
                    <th scope="col">Pressure</th>
                    <th scope="col">Humidity</th>
                    <th scope="col">More</th>
                </tr>
                </thead>
                <tbody>
                {props.cities.map(city => (
                    <tr key={city.name}>
                        <td>&nbsp;&nbsp;
                            <div className="float-left">
                            <DeleteButton lisener={props.lisener} name={city.name}/>&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;<img float="left" src={"https://www.countryflags.io/"+city.country+"/shiny/32.png"} alt={city.name}/>&nbsp;&nbsp;&nbsp;{city.name},  {city.country}
                            </div>
                        </td>
                        <td>{Math.round(city.main.temp - 273.15)} &#176;C</td>
                        <td><img height="32" width="32" alt={" "} src={"http://openweathermap.org/img/wn/"+ city.weather.icon+"@2x.png"}/>  {city.weather.main}</td>
                        <td>{city.wind.speed} m/s</td>
                        <td>{Math.round(city.main.temp_max - 273.15)} &#176;C</td>
                        <td>{Math.round(city.main.temp_min - 273.15)} &#176;C</td>
                        <td>{city.main.pressure} mbar</td>
                        <td>{city.main.humidity} %</td>{console.log("NASAO SAM T" + props.city5Days.filter(city5 => city5.name ===city.name).name)}
                        <td>
                            <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target=".bd-example-modal-lg">More info</button>
                            <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <MoreInfo numberHours={props.numHou} numberDays = {props.numDays} info5Days={find5nfo(city.name)}/>
                                }/>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

    );

}

export default TableInput;