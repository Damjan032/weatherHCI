import React from 'react';
import './App.css';

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

    return (
            <table className="table ">
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
                </tr>
                </thead>
                <tbody>
                {props.cities.map(city => (
                    <tr key={city.name}>
                        <td>
                            <DeleteButton lisener={props.lisener} name={city.name}/>
                            <img src={"https://www.countryflags.io/"+city.country+"/shiny/32.png"} alt={city}/>&nbsp;{city.name}</td>
                        <td>{Math.round(city.main.temp - 273.15)} &#176;C</td>
                        <td>{city.weather.main}</td>
                        <td>{city.wind.speed} m/s</td>
                        <td>{Math.round(city.main.temp_max - 273.15)} &#176;C</td>
                        <td>{Math.round(city.main.temp_min - 273.15)} &#176;C</td>
                        <td>{city.main.pressure} mbar</td>
                        <td>{city.main.humidity} %</td>
                    </tr>
                ))}
                </tbody>
            </table>

    );

}

export default TableInput;